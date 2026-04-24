const { app, BrowserWindow, Menu, dialog, ipcMain, nativeImage, screen } = require('electron');
const fs = require('node:fs/promises');
const path = require('node:path');
const { TextDecoder } = require('node:util');
const XLSX = require('xlsx');

const APP_ID = 'com.shijiu.classscore';
const DATA_FILE = path.join(app.getPath('userData'), 'class-score-data.json');
const WIDGET_STATE_FILE = path.join(app.getPath('userData'), 'widget-window.json');
const SAFETY_SNAPSHOT_FILE = path.join(app.getPath('userData'), 'class-score-safety-snapshots.json');
const STEP_OPTIONS = [1, 2, 5, 10];
const MAX_SAFETY_SNAPSHOTS = 12;
const DEFAULT_PLUS_TEMPLATES = [
  { id: 'plus-speaking', name: '积极发言', value: 2 },
  { id: 'plus-homework', name: '作业优秀', value: 3 },
  { id: 'plus-teamwork', name: '小组协作', value: 2 }
];
const DEFAULT_MINUS_TEMPLATES = [
  { id: 'minus-late', name: '迟到', value: 2 },
  { id: 'minus-noise', name: '课堂喧哗', value: 1 },
  { id: 'minus-homework', name: '未交作业', value: 3 }
];
const NAME_HEADER_PATTERN = /^(name|student(?:\s*name)?|姓名|学生姓名|学生名称|名字|姓名（必填）)$/i;
const NON_NAME_HEADER_PATTERN = /^(id|no\.?|number|序号|学号|编号|班级|班别|性别|年龄|小组|分组|备注|状态|电话|手机号|家长|住址)$/i;
const TITLE_CELL_PATTERN = /(学生名单|班级名单|名单|花名册|导入名单|点名名单|小组名单)/;
const GROUP_HEADER_PATTERN = /^(group(?:\s*name)?|team|小组|组名|组别|分组|所属小组|所在小组|队伍)$/i;
const STUDENT_NO_HEADER_PATTERN = /^(student(?:\s*(?:id|no|number))?|studentid|studentno|id|no\.?|number|学号|编号|序号)$/i;
const SEAT_NO_HEADER_PATTERN = /^(seat(?:\s*(?:id|no|number))?|seatno|desk|座号|座位|座次)$/i;
const NOTE_HEADER_PATTERN = /^(note|remark|comment|memo|备注|说明)$/i;
const STUDENT_IMPORT_FIELD_KEYS = ['name', 'groupName', 'studentNo', 'seatNo', 'note'];

let mainWindow;
let widgetWindow;
let isQuitting = false;
let widgetStateWriteTimer;
let widgetDragState = null;

app.setAppUserModelId(APP_ID);

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function cloneTemplates(templates) {
  return templates.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value
  }));
}

function createDefaultBoard(name = '新面板 1') {
  return {
    id: createId('board'),
    name,
    students: [],
    groups: [],
    scoreTemplates: {
      plus: cloneTemplates(DEFAULT_PLUS_TEMPLATES),
      minus: cloneTemplates(DEFAULT_MINUS_TEMPLATES)
    },
    settings: {
      stepValue: 1
    },
    createdAt: Date.now()
  };
}

function createDefaultRootState() {
  const board = createDefaultBoard();
  return {
    version: 2,
    activeBoardId: board.id,
    boards: [board],
    appSettings: {
      countdownPresetSeconds: 300,
      quickActionsCollapsed: false
    }
  };
}

function preserveRootStatePayload(candidate) {
  return candidate && typeof candidate === 'object'
    ? candidate
    : createDefaultRootState();
}

function normalizeImportedName(value) {
  return String(value ?? '')
    .replace(/^\uFEFF/, '')
    .replace(/^["']|["']$/g, '')
    .trim();
}

function splitTextIntoRows(content) {
  const cleaned = String(content ?? '').replace(/^\uFEFF/, '').trim();
  if (!cleaned) {
    return [];
  }

  return cleaned
    .split(/\r?\n/)
    .map((row) => row.split(/[,，;；、\t]+/).map(normalizeImportedName).filter(Boolean))
    .filter((row) => row.length > 0);
}

function splitNameTokens(content) {
  return String(content ?? '')
    .replace(/^\uFEFF/, '')
    .split(/[\r\n,，;；、\t]+/)
    .map(normalizeImportedName)
    .filter(Boolean);
}

function isLikelyStudentName(value) {
  const cleaned = normalizeImportedName(value);
  if (!cleaned) {
    return false;
  }

  if (
    NAME_HEADER_PATTERN.test(cleaned) ||
    NON_NAME_HEADER_PATTERN.test(cleaned) ||
    TITLE_CELL_PATTERN.test(cleaned)
  ) {
    return false;
  }

  if (/^(男|女|未知|是|否)$/i.test(cleaned)) {
    return false;
  }

  if (/^\d+$/.test(cleaned)) {
    return false;
  }

  if (/^(第?\d+[班组]|第[一二三四五六七八九十]+[班组]|[一二三四五六七八九十]+班|[一二三四五六七八九十]+组)$/u.test(cleaned)) {
    return false;
  }

  if (/^[A-Za-z]{1,3}\d{2,}$/.test(cleaned)) {
    return false;
  }

  if (cleaned.length > 24) {
    return false;
  }

  return (
    /^[\u3400-\u9FFF·]{1,8}$/u.test(cleaned) ||
    /^[A-Za-z][A-Za-z .'-]{1,29}$/.test(cleaned) ||
    /^[\u3400-\u9FFFA-Za-z][\u3400-\u9FFFA-Za-z·()（）' .-]{1,23}$/u.test(cleaned)
  );
}

function collectUniqueStudentNames(values) {
  return [...new Set(
    (Array.isArray(values) ? values : [])
      .map(normalizeImportedName)
      .filter(Boolean)
      .filter((name) => !NAME_HEADER_PATTERN.test(name))
      .filter(isLikelyStudentName)
  )];
}

function normalizeImportedStudentField(value, maxLength = 40) {
  return normalizeImportedName(value).slice(0, maxLength);
}

function normalizeImportedStudentRecord(candidate) {
  const name = normalizeImportedStudentField(candidate?.name, 24);
  if (!name || !isLikelyStudentName(name)) {
    return null;
  }

  return {
    name,
    groupName: normalizeImportedStudentField(candidate?.groupName, 24),
    studentNo: normalizeImportedStudentField(candidate?.studentNo, 24),
    seatNo: normalizeImportedStudentField(candidate?.seatNo, 12),
    note: normalizeImportedStudentField(candidate?.note, 60)
  };
}

function mergeImportedStudentRecords(records) {
  const merged = new Map();

  (Array.isArray(records) ? records : []).forEach((record) => {
    const normalized = normalizeImportedStudentRecord(record);
    if (!normalized) {
      return;
    }

    const existing = merged.get(normalized.name);
    if (!existing) {
      merged.set(normalized.name, normalized);
      return;
    }

    STUDENT_IMPORT_FIELD_KEYS.forEach((field) => {
      if (field === 'name') {
        return;
      }

      if (!existing[field] && normalized[field]) {
        existing[field] = normalized[field];
      }
    });
  });

  return [...merged.values()];
}

function normalizeTemplateList(items, fallback) {
  const source = Array.isArray(items) ? items : fallback;
  return source
    .filter((item) => item && typeof item.name === 'string' && item.name.trim())
    .map((item) => ({
      id: typeof item.id === 'string' ? item.id : createId('template'),
      name: item.name.trim(),
      value: Math.max(1, Math.abs(Math.floor(Number(item.value) || 1)))
    }));
}

function normalizeGroups(groups) {
  const seen = new Set();
  return (Array.isArray(groups) ? groups : [])
    .filter((group) => group && typeof group.name === 'string' && group.name.trim())
    .map((group) => ({
      id: typeof group.id === 'string' ? group.id : createId('group'),
      name: group.name.trim()
    }))
    .filter((group) => {
      if (seen.has(group.id)) {
        return false;
      }

      seen.add(group.id);
      return true;
    });
}

function normalizeHistory(history) {
  return (Array.isArray(history) ? history : [])
    .filter((entry) => entry && typeof entry.itemName === 'string' && entry.itemName.trim())
    .map((entry) => ({
      id: typeof entry.id === 'string' ? entry.id : createId('entry'),
      itemName: entry.itemName.trim(),
      delta: Number.isFinite(Number(entry.delta)) ? Number(entry.delta) : 0,
      note: typeof entry.note === 'string' ? entry.note : '',
      timestamp: Number.isFinite(Number(entry.timestamp)) ? Number(entry.timestamp) : Date.now()
    }))
    .slice(0, 300);
}

function normalizeStudents(students, validGroupIds) {
  return (Array.isArray(students) ? students : [])
    .filter((student) => student && typeof student.name === 'string' && student.name.trim())
    .map((student) => ({
      id: typeof student.id === 'string' ? student.id : createId('student'),
      name: student.name.trim(),
      studentNo: normalizeImportedStudentField(student.studentNo, 24),
      seatNo: normalizeImportedStudentField(student.seatNo, 12),
      note: normalizeImportedStudentField(student.note, 60),
      groupId: typeof student.groupId === 'string' && validGroupIds.has(student.groupId) ? student.groupId : '',
      absent: Boolean(student.absent),
      score: Number.isFinite(Number(student.score)) ? Number(student.score) : 0,
      history: normalizeHistory(student.history)
    }))
    .sort((left, right) => left.name.localeCompare(right.name, 'zh-CN'));
}

function normalizeBoard(candidate, index) {
  const groups = normalizeGroups(candidate?.groups);
  const validGroupIds = new Set(groups.map((group) => group.id));

  return {
    id: typeof candidate?.id === 'string' ? candidate.id : createId('board'),
    name: typeof candidate?.name === 'string' && candidate.name.trim() ? candidate.name.trim() : `新面板 ${index + 1}`,
    students: normalizeStudents(candidate?.students, validGroupIds),
    groups,
    scoreTemplates: {
      plus: normalizeTemplateList(candidate?.scoreTemplates?.plus, DEFAULT_PLUS_TEMPLATES),
      minus: normalizeTemplateList(candidate?.scoreTemplates?.minus, DEFAULT_MINUS_TEMPLATES)
    },
    settings: {
      stepValue: STEP_OPTIONS.includes(Number(candidate?.settings?.stepValue))
        ? Number(candidate.settings.stepValue)
        : 1
    },
    createdAt: Number.isFinite(Number(candidate?.createdAt)) ? Number(candidate.createdAt) : Date.now()
  };
}

function normalizeRootState(candidate) {
  if (candidate && Array.isArray(candidate.boards)) {
    const boards = candidate.boards.map((board, index) => normalizeBoard(board, index)).filter(Boolean);
    const fallbackState = boards.length > 0 ? boards : [createDefaultBoard()];
    const activeBoardId = fallbackState.some((board) => board.id === candidate.activeBoardId)
      ? candidate.activeBoardId
      : fallbackState[0].id;

    return {
      version: 2,
      activeBoardId,
      boards: fallbackState,
      appSettings: {
        countdownPresetSeconds: Math.max(
          1,
          Math.min(24 * 60 * 60, Math.floor(Number(candidate?.appSettings?.countdownPresetSeconds) || 300))
        ),
        quickActionsCollapsed: Boolean(candidate?.appSettings?.quickActionsCollapsed)
      }
    };
  }

  if (candidate && (Array.isArray(candidate.students) || candidate.scoreTemplates || candidate.settings)) {
    const board = normalizeBoard(
      {
        id: createId('board'),
        name: '默认面板',
        students: candidate.students,
        groups: [],
        scoreTemplates: candidate.scoreTemplates,
        settings: {
          stepValue: 1
        }
      },
      0
    );

    return {
      version: 2,
      activeBoardId: board.id,
      boards: [board],
      appSettings: {
        countdownPresetSeconds: Math.max(
          1,
          Math.min(24 * 60 * 60, Math.floor(Number(candidate?.settings?.countdownPresetSeconds) || 300))
        ),
        quickActionsCollapsed: false
      }
    };
  }

  return createDefaultRootState();
}

function parseStudentNames(content) {
  return parseStudentRecords(content).map((student) => student.name);
}

function findNameHeaderPosition(rows) {
  const scanRowCount = Math.min(rows.length, 8);

  for (let rowIndex = 0; rowIndex < scanRowCount; rowIndex += 1) {
    const row = rows[rowIndex];
    for (let columnIndex = 0; columnIndex < row.length; columnIndex += 1) {
      if (NAME_HEADER_PATTERN.test(normalizeImportedName(row[columnIndex]))) {
        return { rowIndex, columnIndex };
      }
    }
  }

  return null;
}

function getStudentImportFieldByHeader(value) {
  const cleaned = normalizeImportedName(value);
  if (!cleaned) {
    return '';
  }

  if (NAME_HEADER_PATTERN.test(cleaned)) {
    return 'name';
  }

  if (GROUP_HEADER_PATTERN.test(cleaned)) {
    return 'groupName';
  }

  if (STUDENT_NO_HEADER_PATTERN.test(cleaned)) {
    return 'studentNo';
  }

  if (SEAT_NO_HEADER_PATTERN.test(cleaned)) {
    return 'seatNo';
  }

  if (NOTE_HEADER_PATTERN.test(cleaned)) {
    return 'note';
  }

  return '';
}

function findStructuredHeaderInfo(rows) {
  const scanRowCount = Math.min(rows.length, 8);
  let bestMatch = null;

  for (let rowIndex = 0; rowIndex < scanRowCount; rowIndex += 1) {
    const row = rows[rowIndex];
    const columnMap = {};
    let score = 0;

    for (let columnIndex = 0; columnIndex < row.length; columnIndex += 1) {
      const field = getStudentImportFieldByHeader(row[columnIndex]);
      if (!field || Number.isInteger(columnMap[field])) {
        continue;
      }

      columnMap[field] = columnIndex;
      score += field === 'name' ? 20 : 6;
    }

    if (!Number.isInteger(columnMap.name)) {
      continue;
    }

    if (!bestMatch || score > bestMatch.score) {
      bestMatch = {
        rowIndex,
        columnMap,
        score
      };
    }
  }

  return bestMatch;
}

function inferNameColumnIndex(rows) {
  const maxColumns = rows.reduce((max, row) => Math.max(max, row.length), 0);
  let bestColumnIndex = 0;
  let bestScore = Number.NEGATIVE_INFINITY;

  for (let columnIndex = 0; columnIndex < maxColumns; columnIndex += 1) {
    let score = 0;

    rows.slice(0, 60).forEach((row) => {
      const cell = normalizeImportedName(row[columnIndex]);
      if (!cell) {
        return;
      }

      if (NAME_HEADER_PATTERN.test(cell)) {
        score += 20;
        return;
      }

      if (NON_NAME_HEADER_PATTERN.test(cell)) {
        score -= 12;
        return;
      }

      if (TITLE_CELL_PATTERN.test(cell)) {
        score -= 8;
        return;
      }

      if (isLikelyStudentName(cell)) {
        score += 4;
        return;
      }

      if (/^\d+$/.test(cell)) {
        score -= 4;
        return;
      }

      if (cell.length > 24) {
        score -= 2;
        return;
      }

      score -= 1;
    });

    if (score > bestScore) {
      bestScore = score;
      bestColumnIndex = columnIndex;
    }
  }

  return bestColumnIndex;
}

function normalizeImportedRows(rows) {
  return (Array.isArray(rows) ? rows : [])
    .map((row) => (Array.isArray(row) ? row : [row]))
    .map((row) => row.map((cell) => normalizeImportedName(cell)))
    .filter((row) => row.some(Boolean));
}

function parseStudentRecords(content) {
  const rows = splitTextIntoRows(content);
  if (rows.length === 0) {
    return [];
  }

  if (rows.length === 1 && rows[0].length <= 1) {
    return mergeImportedStudentRecords(
      collectUniqueStudentNames(splitNameTokens(content)).map((name) => ({ name }))
    );
  }

  return parseStudentRecordsFromRows(rows);
}

function parseStudentRecordsFromRows(rows) {
  const normalizedRows = normalizeImportedRows(rows);

  if (normalizedRows.length === 0) {
    return [];
  }

  if (normalizedRows.length === 1 && normalizedRows[0].filter(Boolean).length > 1) {
    return mergeImportedStudentRecords(
      collectUniqueStudentNames(normalizedRows[0]).map((name) => ({ name }))
    );
  }

  const structuredHeaderInfo = findStructuredHeaderInfo(normalizedRows);
  if (structuredHeaderInfo && Object.keys(structuredHeaderInfo.columnMap).length > 1) {
    const structuredRecords = mergeImportedStudentRecords(
      normalizedRows.slice(structuredHeaderInfo.rowIndex + 1).flatMap((row) => {
        const names = collectUniqueStudentNames(splitNameTokens(row[structuredHeaderInfo.columnMap.name] || ''));
        if (names.length === 0) {
          return [];
        }

        const studentNo = Number.isInteger(structuredHeaderInfo.columnMap.studentNo)
          ? row[structuredHeaderInfo.columnMap.studentNo]
          : '';
        const seatNo = Number.isInteger(structuredHeaderInfo.columnMap.seatNo)
          ? row[structuredHeaderInfo.columnMap.seatNo]
          : '';
        const groupName = Number.isInteger(structuredHeaderInfo.columnMap.groupName)
          ? row[structuredHeaderInfo.columnMap.groupName]
          : '';
        const note = Number.isInteger(structuredHeaderInfo.columnMap.note)
          ? row[structuredHeaderInfo.columnMap.note]
          : '';

        return names.map((name) => ({
          name,
          studentNo,
          seatNo,
          groupName,
          note
        }));
      })
    );

    if (structuredRecords.length > 0) {
      return structuredRecords;
    }
  }

  const headerPosition = structuredHeaderInfo
    ? { rowIndex: structuredHeaderInfo.rowIndex, columnIndex: structuredHeaderInfo.columnMap.name }
    : findNameHeaderPosition(normalizedRows);
  const targetColumnIndex = headerPosition?.columnIndex ?? inferNameColumnIndex(normalizedRows);
  const dataRows = headerPosition ? normalizedRows.slice(headerPosition.rowIndex + 1) : normalizedRows;

  const names = collectUniqueStudentNames(
    dataRows.flatMap((row) => {
      const columnValue = normalizeImportedName(row[targetColumnIndex]);
      if (columnValue) {
        return splitNameTokens(columnValue);
      }

      if (row.length === 1) {
        return splitNameTokens(row[0]);
      }

      return [];
    })
  );

  if (names.length > 0) {
    return mergeImportedStudentRecords(names.map((name) => ({ name })));
  }

  return mergeImportedStudentRecords(
    collectUniqueStudentNames(
      normalizedRows.flatMap((row) => {
        const cells = row.filter(Boolean);
        return cells.length > 1 && cells.every(isLikelyStudentName) ? cells : [];
      })
    ).map((name) => ({ name }))
  );
}

function parseStudentNamesFromRows(rows) {
  return parseStudentRecordsFromRows(rows).map((student) => student.name);
}

function decodeTextWithFallback(buffer) {
  const decoderEntries = [
    { encoding: 'utf-8', score: 3 },
    { encoding: 'utf-16le', score: 2 },
    { encoding: 'gb18030', score: 4 }
  ];
  const textCandidates = [];

  decoderEntries.forEach((entry) => {
    try {
      const decoded = new TextDecoder(entry.encoding).decode(buffer);
      const students = parseStudentRecords(decoded);
      const names = students.map((student) => student.name);
      const penalty = decoded.includes('�') ? 2 : 0;
      textCandidates.push({
        encoding: entry.encoding,
        content: decoded,
        students,
        names,
        score: names.length * 10 + entry.score - penalty
      });
    } catch (error) {
      // Ignore unsupported decoders.
    }
  });

  if (textCandidates.length === 0) {
    const fallback = buffer.toString('utf8');
    const students = parseStudentRecords(fallback);
    return {
      encoding: 'utf-8',
      content: fallback,
      students,
      names: students.map((student) => student.name)
    };
  }

  textCandidates.sort((left, right) => right.score - left.score);
  return textCandidates[0];
}

async function importStudentNamesFromFile(filePath) {
  const extension = path.extname(filePath).toLowerCase();

  if (extension === '.csv') {
    const buffer = await fs.readFile(filePath);
    const decoded = decodeTextWithFallback(buffer);
    return {
      names: decoded.names,
      students: decoded.students,
      sourceType: 'csv',
      sheetName: '',
      encoding: decoded.encoding
    };
  }

  if (['.xlsx', '.xls', '.xlsm'].includes(extension)) {
    try {
      const workbook = XLSX.readFile(filePath, {
        dense: true,
        raw: false,
        codepage: 936
      });
      const bestSheet = workbook.SheetNames
        .map((sheetName) => {
          const sheet = workbook.Sheets[sheetName];
          const rows = XLSX.utils.sheet_to_json(sheet, {
            header: 1,
            blankrows: false,
            defval: ''
          });
          const students = parseStudentRecordsFromRows(rows);
          return {
            sheetName,
            students,
            names: students.map((student) => student.name)
          };
        })
        .sort((left, right) => right.names.length - left.names.length)[0];

      if (bestSheet) {
        return {
          names: bestSheet.names,
          students: bestSheet.students,
          sourceType: extension.replace('.', ''),
          sheetName: bestSheet.sheetName
        };
      }
    } catch (error) {
      // Fall back to text decoding for broken spreadsheet exports.
    }
  }

  const buffer = await fs.readFile(filePath);
  const decoded = decodeTextWithFallback(buffer);
  return {
    names: decoded.names,
    students: decoded.students,
    sourceType: extension.replace('.', '') || 'txt',
    sheetName: '',
    encoding: decoded.encoding
  };
}

async function readJsonFile(filePath) {
  const raw = await fs.readFile(filePath, 'utf8');
  return JSON.parse(raw);
}

async function readState() {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    return preserveRootStatePayload(JSON.parse(raw));
  } catch (error) {
    return createDefaultRootState();
  }
}

async function writeState(nextState) {
  const merged = preserveRootStatePayload(nextState);
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, `${JSON.stringify(merged, null, 2)}\n`, 'utf8');
  return merged;
}

function normalizeSafetySnapshots(candidate) {
  const snapshots = Array.isArray(candidate?.snapshots) ? candidate.snapshots : [];

  return snapshots
    .filter((snapshot) => snapshot && typeof snapshot === 'object')
    .map((snapshot) => ({
      id: typeof snapshot.id === 'string' ? snapshot.id : createId('safety'),
      label: typeof snapshot.label === 'string' && snapshot.label.trim()
        ? snapshot.label.trim()
        : '未命名保护点',
      createdAt: Number.isFinite(Number(snapshot.createdAt)) ? Number(snapshot.createdAt) : Date.now(),
      payload: preserveRootStatePayload(snapshot.payload)
    }))
    .sort((left, right) => right.createdAt - left.createdAt)
    .slice(0, MAX_SAFETY_SNAPSHOTS);
}

async function readSafetySnapshots() {
  try {
    const raw = await fs.readFile(SAFETY_SNAPSHOT_FILE, 'utf8');
    return normalizeSafetySnapshots(JSON.parse(raw));
  } catch (error) {
    return [];
  }
}

async function writeSafetySnapshots(snapshots) {
  const normalized = normalizeSafetySnapshots({ snapshots });
  await fs.mkdir(path.dirname(SAFETY_SNAPSHOT_FILE), { recursive: true });
  await fs.writeFile(
    SAFETY_SNAPSHOT_FILE,
    `${JSON.stringify({ version: 1, snapshots: normalized }, null, 2)}\n`,
    'utf8'
  );
  return normalized;
}

async function appendSafetySnapshot(payload, label) {
  const currentSnapshots = await readSafetySnapshots();
  const snapshot = {
    id: createId('safety'),
    label: typeof label === 'string' && label.trim() ? label.trim() : '手动保护点',
    createdAt: Date.now(),
    payload: preserveRootStatePayload(payload)
  };

  const snapshots = await writeSafetySnapshots([snapshot, ...currentSnapshots]);
  return {
    snapshot,
    snapshots
  };
}

function createAppIcon(size = 256) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
      <defs>
        <linearGradient id="board" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#57a8ff" />
          <stop offset="100%" stop-color="#2d7fe9" />
        </linearGradient>
      </defs>
      <rect width="256" height="256" rx="56" fill="url(#board)" />
      <rect x="18" y="18" width="220" height="220" rx="42" fill="none" stroke="#fdfefe" stroke-width="10" opacity="0.96" />
      <path d="M72 82h112c15 0 28 13 28 28v56c0 15-13 28-28 28H72c-15 0-28-13-28-28v-56c0-15 13-28 28-28z" fill="#ffffff" opacity="0.98" />
      <path d="M84 114h82" stroke="#5a9df5" stroke-width="14" stroke-linecap="round" />
      <path d="M84 146h56" stroke="#7bb4fb" stroke-width="14" stroke-linecap="round" />
      <circle cx="184" cy="146" r="18" fill="#ff8b7d" />
    </svg>
  `.trim();

  return nativeImage
    .createFromDataURL(`data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`)
    .resize({ width: size, height: size });
}

function getWindowIcon() {
  return createAppIcon(256);
}

function beginWidgetDrag(candidate = {}) {
  if (!widgetWindow || widgetWindow.isDestroyed()) {
    return;
  }

  const screenX = Number(candidate.screenX);
  const screenY = Number(candidate.screenY);
  if (!Number.isFinite(screenX) || !Number.isFinite(screenY)) {
    return;
  }

  const bounds = widgetWindow.getBounds();
  widgetDragState = {
    pointerStartX: screenX,
    pointerStartY: screenY,
    windowStartX: bounds.x,
    windowStartY: bounds.y
  };
}

function updateWidgetDrag(candidate = {}) {
  if (!widgetWindow || widgetWindow.isDestroyed() || !widgetDragState) {
    return;
  }

  const screenX = Number(candidate.screenX);
  const screenY = Number(candidate.screenY);
  if (!Number.isFinite(screenX) || !Number.isFinite(screenY)) {
    return;
  }

  const nextBounds = clampWidgetBounds({
    ...widgetWindow.getBounds(),
    x: widgetDragState.windowStartX + Math.round(screenX - widgetDragState.pointerStartX),
    y: widgetDragState.windowStartY + Math.round(screenY - widgetDragState.pointerStartY)
  });
  widgetWindow.setBounds(nextBounds);
}

function endWidgetDrag() {
  widgetDragState = null;
}

function getDefaultWidgetBounds() {
  const { workArea } = screen.getPrimaryDisplay();
  const width = 148;
  const height = 176;

  return {
    width,
    height,
    x: workArea.x + workArea.width - width - 24,
    y: workArea.y + workArea.height - height - 28
  };
}

function clampWidgetBounds(candidate) {
  const fallback = getDefaultWidgetBounds();
  const width = Number.isFinite(Number(candidate?.width)) ? Number(candidate.width) : fallback.width;
  const height = Number.isFinite(Number(candidate?.height)) ? Number(candidate.height) : fallback.height;
  const display = screen.getDisplayNearestPoint({
    x: Number.isFinite(Number(candidate?.x)) ? Number(candidate.x) : fallback.x,
    y: Number.isFinite(Number(candidate?.y)) ? Number(candidate.y) : fallback.y
  });
  const { workArea } = display;

  return {
    width,
    height,
    x: Math.min(Math.max(Number.isFinite(Number(candidate?.x)) ? Number(candidate.x) : fallback.x, workArea.x), workArea.x + workArea.width - width),
    y: Math.min(Math.max(Number.isFinite(Number(candidate?.y)) ? Number(candidate.y) : fallback.y, workArea.y), workArea.y + workArea.height - height)
  };
}

async function readWidgetBounds() {
  try {
    const raw = await fs.readFile(WIDGET_STATE_FILE, 'utf8');
    return clampWidgetBounds(JSON.parse(raw));
  } catch (error) {
    return getDefaultWidgetBounds();
  }
}

function queueSaveWidgetBounds() {
  if (!widgetWindow || widgetWindow.isDestroyed()) {
    return;
  }

  clearTimeout(widgetStateWriteTimer);
  widgetStateWriteTimer = setTimeout(async () => {
    const bounds = clampWidgetBounds(widgetWindow.getBounds());
    await fs.mkdir(path.dirname(WIDGET_STATE_FILE), { recursive: true });
    await fs.writeFile(WIDGET_STATE_FILE, `${JSON.stringify(bounds, null, 2)}\n`, 'utf8');
  }, 180);
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1560,
    height: 960,
    minWidth: 1260,
    minHeight: 820,
    show: false,
    backgroundColor: '#cdefff',
    title: '班级加减分助手',
    icon: getWindowIcon(),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      backgroundThrottling: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'src', 'index.html'));

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('close', (event) => {
    if (!isQuitting) {
      event.preventDefault();
      mainWindow.hide();
    }
  });

  mainWindow.webContents.on('context-menu', (_event, params) => {
    const template = [];

    if (params.isEditable) {
      template.push(
        { label: '撤销', role: 'undo' },
        { label: '恢复', role: 'redo' },
        { type: 'separator' },
        { label: '剪切', role: 'cut' },
        { label: '复制', role: 'copy' },
        { label: '粘贴', role: 'paste' },
        { label: '全选', role: 'selectAll' },
        { type: 'separator' }
      );
    } else if (params.selectionText?.trim()) {
      template.push(
        { label: '复制', role: 'copy' },
        { type: 'separator' }
      );
    }

    template.push(
      {
        label: '刷新页面',
        click: () => {
          if (mainWindow && !mainWindow.isDestroyed()) {
            mainWindow.webContents.reload();
          }
        }
      },
      {
        label: '强制刷新',
        click: () => {
          if (mainWindow && !mainWindow.isDestroyed()) {
            mainWindow.webContents.reloadIgnoringCache();
          }
        }
      }
    );

    Menu.buildFromTemplate(template).popup({
      window: mainWindow,
      x: params.x,
      y: params.y
    });
  });
}

function createApplicationMenu() {
  const menu = Menu.buildFromTemplate([
    {
      label: '应用',
      submenu: [
        {
          label: '显示主窗口',
          click: () => toggleMainWindow(true)
        },
        {
          label: '隐藏主窗口',
          click: () => {
            if (mainWindow && !mainWindow.isDestroyed()) {
              mainWindow.hide();
            }
          }
        },
        { type: 'separator' },
        {
          label: '退出',
          click: () => {
            isQuitting = true;
            app.quit();
          }
        }
      ]
    },
    {
      label: '编辑',
      submenu: [
        { label: '撤销', role: 'undo' },
        { label: '恢复', role: 'redo' },
        { type: 'separator' },
        { label: '剪切', role: 'cut' },
        { label: '复制', role: 'copy' },
        { label: '粘贴', role: 'paste' },
        { label: '全选', role: 'selectAll' }
      ]
    },
    {
      label: '查看',
      submenu: [
        { label: '刷新', role: 'reload' },
        { label: '强制刷新', role: 'forceReload' },
        { type: 'separator' },
        { label: '实际大小', role: 'resetZoom' },
        { label: '放大', role: 'zoomIn' },
        { label: '缩小', role: 'zoomOut' },
        { type: 'separator' },
        { label: '切换全屏', role: 'togglefullscreen' }
      ]
    },
    {
      label: '窗口',
      submenu: [
        { label: '最小化', role: 'minimize' },
        { label: '关闭窗口', role: 'close' }
      ]
    }
  ]);

  Menu.setApplicationMenu(menu);
}

async function createWidgetWindow() {
  const bounds = await readWidgetBounds();

  widgetWindow = new BrowserWindow({
    width: bounds.width,
    height: bounds.height,
    x: bounds.x,
    y: bounds.y,
    show: false,
    frame: false,
    transparent: true,
    resizable: false,
    maximizable: false,
    minimizable: false,
    fullscreenable: false,
    skipTaskbar: true,
    hasShadow: false,
    alwaysOnTop: true,
    title: '班级加减分悬浮窗',
    icon: getWindowIcon(),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      backgroundThrottling: false
    }
  });

  widgetWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  widgetWindow.loadFile(path.join(__dirname, 'src', 'widget.html'));
  widgetWindow.once('ready-to-show', () => {
    widgetWindow.showInactive();
  });
  widgetWindow.on('move', () => {
    queueSaveWidgetBounds();
  });
}

function toggleMainWindow(forceShow = false) {
  if (!mainWindow) {
    return;
  }

  if (forceShow || !mainWindow.isVisible()) {
    mainWindow.show();
    mainWindow.focus();
    return;
  }

  mainWindow.hide();
}

async function saveTextThroughDialog(options) {
  const result = await dialog.showSaveDialog(mainWindow, {
    title: options.title,
    defaultPath: options.defaultPath,
    filters: options.filters
  });

  if (result.canceled || !result.filePath) {
    return { canceled: true };
  }

  await fs.writeFile(result.filePath, options.content, 'utf8');
  return {
    canceled: false,
    filePath: result.filePath
  };
}

async function saveBufferThroughDialog(options) {
  const result = await dialog.showSaveDialog(mainWindow, {
    title: options.title,
    defaultPath: options.defaultPath,
    filters: options.filters
  });

  if (result.canceled || !result.filePath) {
    return { canceled: true };
  }

  await fs.writeFile(result.filePath, options.buffer);
  return {
    canceled: false,
    filePath: result.filePath
  };
}

function isWorksheetRowEmpty(row) {
  return !Array.isArray(row) || row.every((cell) => cell == null || String(cell).trim() === '');
}

function getWorksheetTextWidth(value) {
  const text = value == null ? '' : String(value);
  return [...text].reduce((width, char) => width + (char.codePointAt(0) > 0xff ? 2 : 1), 0);
}

function buildWorksheetColumnWidths(rows) {
  const maxColumns = rows.reduce(
    (max, row) => Math.max(max, Array.isArray(row) ? row.length : 0),
    0
  );

  return Array.from({ length: maxColumns }, (_value, columnIndex) => {
    const maxWidth = rows.reduce((widest, row) => {
      if (!Array.isArray(row)) {
        return widest;
      }

      return Math.max(widest, getWorksheetTextWidth(row[columnIndex]));
    }, 0);

    return {
      wch: Math.min(Math.max(maxWidth + 2, 10), 28)
    };
  });
}

function findWorksheetHeaderRowIndex(rows) {
  return rows.findIndex((row) =>
    Array.isArray(row) &&
    row.filter((cell) => cell != null && String(cell).trim() !== '').length >= 3
  );
}

function applyWorksheetPresentation(worksheet, rows) {
  const normalizedRows = Array.isArray(rows) ? rows : [];
  const maxColumns = normalizedRows.reduce(
    (max, row) => Math.max(max, Array.isArray(row) ? row.length : 0),
    0
  );
  const lastDataRowIndex = normalizedRows.reduce(
    (lastIndex, row, rowIndex) => (isWorksheetRowEmpty(row) ? lastIndex : rowIndex),
    -1
  );

  if (maxColumns > 0) {
    worksheet['!cols'] = buildWorksheetColumnWidths(normalizedRows);
  }

  const headerRowIndex = findWorksheetHeaderRowIndex(normalizedRows);
  if (headerRowIndex >= 0 && lastDataRowIndex >= headerRowIndex && maxColumns > 0) {
    worksheet['!autofilter'] = {
      ref: XLSX.utils.encode_range({
        s: { r: headerRowIndex, c: 0 },
        e: { r: lastDataRowIndex, c: maxColumns - 1 }
      })
    };
  }
}

function registerIpc() {
  ipcMain.handle('state:load', async () => readState());
  ipcMain.handle('state:save', async (_event, nextState) => writeState(nextState));
  ipcMain.handle('safety:list', async () => readSafetySnapshots());
  ipcMain.handle('safety:create-snapshot', async (_event, payload) => {
    const result = await appendSafetySnapshot(payload?.state, payload?.label);
    return result.snapshots;
  });

  ipcMain.handle('students:import', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
      title: '导入学生名单',
      properties: ['openFile'],
      filters: [
        { name: '文本与表格文件', extensions: ['txt', 'csv', 'xlsx', 'xls'] },
        { name: '所有文件', extensions: ['*'] }
      ]
    });

    if (result.canceled || result.filePaths.length === 0) {
      return { canceled: true, names: [], students: [] };
    }

    const filePath = result.filePaths[0];
    try {
      const imported = await importStudentNamesFromFile(filePath);
      return {
        canceled: false,
        names: imported.names,
        students: imported.students || [],
        filePath,
        sourceType: imported.sourceType,
        sheetName: imported.sheetName || '',
        encoding: imported.encoding || '',
        error: ''
      };
    } catch (error) {
      return {
        canceled: false,
        names: [],
        students: [],
        filePath,
        sourceType: '',
        sheetName: '',
        encoding: '',
        error: '读取名单文件失败，请检查文件格式是否正确。'
      };
    }
  });

  ipcMain.handle('backup:import', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
      title: '导入备份文件',
      properties: ['openFile'],
      filters: [
        { name: '备份文件', extensions: ['json'] },
        { name: '所有文件', extensions: ['*'] }
      ]
    });

    if (result.canceled || result.filePaths.length === 0) {
      return { canceled: true };
    }

    const filePath = result.filePaths[0];
    const payload = preserveRootStatePayload(await readJsonFile(filePath));
    return {
      canceled: false,
      filePath,
      payload
    };
  });

  ipcMain.handle('backup:export', async (_event, payload) => {
    const normalized = preserveRootStatePayload(payload);
    return saveTextThroughDialog({
      title: '导出备份文件',
      defaultPath: `班级加减分助手备份-${new Date().toISOString().slice(0, 10)}.json`,
      filters: [{ name: '备份文件', extensions: ['json'] }],
      content: `${JSON.stringify(normalized, null, 2)}\n`
    });
  });

  ipcMain.handle('summary:export', async (_event, payload) => {
    return saveTextThroughDialog({
      title: '导出 Excel 汇总',
      defaultPath: payload?.defaultPath || `班级汇总-${new Date().toISOString().slice(0, 10)}.csv`,
      filters: [{ name: 'CSV 文件', extensions: ['csv'] }],
      content: typeof payload?.content === 'string' ? payload.content : ''
    });
  });

  ipcMain.handle('summary:export-xlsx', async (_event, payload) => {
    const workbook = XLSX.utils.book_new();
    const sheets = Array.isArray(payload?.sheets) ? payload.sheets : [];

    sheets.forEach((sheet, index) => {
      const rows = Array.isArray(sheet?.rows) ? sheet.rows : [];
      const worksheet = XLSX.utils.aoa_to_sheet(rows);
      applyWorksheetPresentation(worksheet, rows);
      XLSX.utils.book_append_sheet(workbook, worksheet, sheet?.name || `工作表${index + 1}`);
    });

    const buffer = XLSX.write(workbook, {
      type: 'buffer',
      bookType: 'xlsx',
      compression: true
    });

    return saveBufferThroughDialog({
      title: '导出 Excel 汇总',
      defaultPath: payload?.defaultPath || `班级汇总-${new Date().toISOString().slice(0, 10)}.xlsx`,
      filters: [{ name: 'Excel 工作簿', extensions: ['xlsx'] }],
      buffer
    });
  });

  ipcMain.on('widget:update', (_event, payload) => {
    if (widgetWindow && !widgetWindow.isDestroyed()) {
      widgetWindow.webContents.send('widget:state', payload);
    }
  });

  ipcMain.on('widget:toggle-main', () => {
    toggleMainWindow();
  });

  ipcMain.on('widget:drag-start', (_event, payload) => {
    beginWidgetDrag(payload);
  });

  ipcMain.on('widget:drag-move', (_event, payload) => {
    updateWidgetDrag(payload);
  });

  ipcMain.on('widget:drag-end', () => {
    endWidgetDrag();
  });

  ipcMain.on('main:show', () => {
    toggleMainWindow(true);
  });

  ipcMain.on('widget:open-menu', () => {
    const menu = Menu.buildFromTemplate([
      {
        label: mainWindow?.isVisible() ? '隐藏主窗口' : '显示主窗口',
        click: () => toggleMainWindow()
      },
      {
        label: '固定显示主窗口',
        click: () => toggleMainWindow(true)
      },
      { type: 'separator' },
      {
        label: '退出',
        click: () => {
          isQuitting = true;
          app.quit();
        }
      }
    ]);

    menu.popup({ window: widgetWindow });
  });
}

app.whenReady().then(async () => {
  registerIpc();
  createMainWindow();
  createApplicationMenu();
  await createWidgetWindow();

  app.on('activate', () => {
    toggleMainWindow(true);
  });
});

app.on('before-quit', () => {
  isQuitting = true;
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
