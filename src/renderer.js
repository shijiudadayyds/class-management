const STEP_OPTIONS = [1, 2, 5, 10];
const GROUP_FILTER_ALL = '__all__';
const GROUP_FILTER_UNGROUPED = '__ungrouped__';
const GROUP_CREATE_OPTION = '__create_group__';
const GROUP_COLOR_PALETTE = [
  '#2f7df6',
  '#0f9d7a',
  '#ef8f23',
  '#8c62ff',
  '#e05a5a',
  '#10a3c8',
  '#7a9d28',
  '#d96c1d'
];
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

const PET_LEVEL_STEP = 60;
const SCORE_LIMIT = 999;
const PET_EGG_HATCH_DURATION_MS = 7 * 24 * 60 * 60 * 1000;
const PET_EGG_ACCELERATION_HOUR_MS = 60 * 60 * 1000;
const SHOP_ITEM_EFFECT_TYPES = ['pet-egg', 'snack', 'revive', 'collectible'];
const DEFAULT_SHOP_ITEMS = [
  {
    id: 'shop-pet-egg',
    name: '星愿宠物蛋',
    cost: 100,
    icon: '🥚',
    effectType: 'pet-egg',
    growthGain: 0,
    description: '开启宠物家园的入场券，兑换后可随机孵化一只精美宠物。',
    enabled: true
  },
  {
    id: 'shop-cloud-cookie',
    name: '云朵曲奇',
    cost: 18,
    icon: '🍪',
    effectType: 'snack',
    growthGain: 16,
    description: '松软小零食，适合日常喂养，成长值 +16。',
    enabled: true
  },
  {
    id: 'shop-berry-pudding',
    name: '莓果布丁',
    cost: 32,
    icon: '🍮',
    effectType: 'snack',
    growthGain: 30,
    description: '香甜莓果口味，让宠物更开心，成长值 +30。',
    enabled: true
  },
  {
    id: 'shop-rainbow-feast',
    name: '彩虹盛宴',
    cost: 48,
    icon: '🧁',
    effectType: 'snack',
    growthGain: 46,
    description: '节日限定能量餐，成长值 +46。',
    enabled: true
  },
  {
    id: 'shop-revive-coin',
    name: '复活币',
    cost: 10,
    icon: '🪙',
    effectType: 'revive',
    growthGain: 0,
    description: '宠物倒下后可立即复活并恢复全部状态。',
    enabled: true
  },
  {
    id: 'shop-satin-ribbon',
    name: '缎带徽章',
    cost: 24,
    icon: '🎀',
    effectType: 'collectible',
    growthGain: 0,
    description: '宠物背包收藏道具，可用于后续装扮系统。',
    enabled: true
  }
];
const PET_SPECIES = [
  {
    id: 'cloud-corgi',
    name: '云朵柯基',
    rarity: '常见',
    weight: 30,
    accent: '#ffb066',
    accentSoft: '#fff0dc',
    accentStrong: '#e37a2f',
    glow: '#ffd8ad',
    description: '奶油色的小短腿，总喜欢追着风和云跑。'
  },
  {
    id: 'star-bunny',
    name: '星糖兔',
    rarity: '稀有',
    weight: 18,
    accent: '#ff9dcf',
    accentSoft: '#ffe7f4',
    accentStrong: '#d75f9d',
    glow: '#ffd3ea',
    description: '耳尖会闪着星光，最喜欢甜甜的零食。'
  },
  {
    id: 'mint-dragon',
    name: '薄荷小龙',
    rarity: '超稀有',
    weight: 10,
    accent: '#5ec9a8',
    accentSoft: '#dcfff4',
    accentStrong: '#258e73',
    glow: '#b7f4df',
    description: '会在开心时轻轻扇动小翅膀，散发薄荷光晕。'
  },
  {
    id: 'moon-cat',
    name: '月光猫',
    rarity: '稀有',
    weight: 16,
    accent: '#8c7cff',
    accentSoft: '#ece9ff',
    accentStrong: '#5645c8',
    glow: '#d7d1ff',
    description: '安静又粘人，尾巴像一弯发亮的小月牙。'
  },
  {
    id: 'peach-panda',
    name: '蜜桃熊猫',
    rarity: '常见',
    weight: 26,
    accent: '#ff8f9a',
    accentSoft: '#ffe7ea',
    accentStrong: '#d45f6b',
    glow: '#ffd0d6',
    description: '脸颊总是粉粉的，吃到喜欢的零食会抱着打滚。'
  }
];

const EXTRA_PET_SPECIES = [
  {
    id: 'azure-qilin',
    name: '玄冰麒麟',
    rarity: '神话',
    weight: 4,
    accent: '#6fd8ff',
    accentSoft: '#dff8ff',
    accentStrong: '#1f91cc',
    glow: '#bceeff',
    description: '上古瑞兽，踏雪而行，鳞甲间带着冷冽星辉。'
  },
  {
    id: 'sun-phoenix',
    name: '焰羽凤凰',
    rarity: '传说',
    weight: 6,
    accent: '#ff8c5a',
    accentSoft: '#ffe9dd',
    accentStrong: '#d95a25',
    glow: '#ffd1b9',
    description: '羽翼像燃烧的日轮，重生之火从不轻易熄灭。'
  },
  {
    id: 'void-basilisk',
    name: '幽界蛇皇',
    rarity: '传说',
    weight: 5,
    accent: '#7d68ff',
    accentSoft: '#ece7ff',
    accentStrong: '#4c39bd',
    glow: '#d4ccff',
    description: '来自深渊裂隙的古老异兽，目光冰冷而危险。'
  },
  {
    id: 'ender-sprite',
    name: '末影灵',
    rarity: '史诗',
    weight: 10,
    accent: '#7f61ff',
    accentSoft: '#f0ebff',
    accentStrong: '#5c3dd4',
    glow: '#dbd1ff',
    description: '灵感借鉴方块世界的末影生物，会在阴影中瞬移。'
  },
  {
    id: 'slime-cub',
    name: '史莱啵啵',
    rarity: '常见',
    weight: 22,
    accent: '#63d878',
    accentSoft: '#e4ffe9',
    accentStrong: '#2aa447',
    glow: '#cbf8d2',
    description: '借鉴方块世界史莱姆的软弹宠物，跳起来像果冻。'
  },
  {
    id: 'warden-cub',
    name: '远古监守幼兽',
    rarity: '神话',
    weight: 3,
    accent: '#2fc7c9',
    accentSoft: '#ddffff',
    accentStrong: '#0a7f84',
    glow: '#b8f4f4',
    description: '灵感借鉴深暗之地的古老守卫，低鸣时地面都会震动。'
  }
];
const ALL_PET_SPECIES = [...PET_SPECIES, ...EXTRA_PET_SPECIES];
const PET_RARITY_PROFILES = {
  常见: { factor: 1, critRate: 0.08, dodgeRate: 0.04 },
  稀有: { factor: 1.08, critRate: 0.1, dodgeRate: 0.05 },
  史诗: { factor: 1.18, critRate: 0.12, dodgeRate: 0.06 },
  传说: { factor: 1.3, critRate: 0.14, dodgeRate: 0.07 },
  神话: { factor: 1.46, critRate: 0.16, dodgeRate: 0.08 }
};
const PET_SKILLS = [
  { id: 'skill-comet-bark', name: '彗尾狂吠', manaCost: 16, minDamage: 22, maxDamage: 34, learnCost: 20, unlockLevel: 2, description: '用高速突进撕开前排防线。' },
  { id: 'skill-cloud-guard', name: '云垫护身', manaCost: 14, minDamage: 12, maxDamage: 20, learnCost: 18, unlockLevel: 2, description: '柔软云团吸收冲击并反击。', restoreHpRatio: 0.08 },
  { id: 'skill-starlight-kick', name: '星糖飞踢', manaCost: 18, minDamage: 24, maxDamage: 36, learnCost: 24, unlockLevel: 3, description: '跃起后释放带星光的连续踢击。' },
  { id: 'skill-dream-heal', name: '梦境糖雾', manaCost: 20, minDamage: 10, maxDamage: 18, learnCost: 26, unlockLevel: 4, description: '温柔的糖雾同时造成伤害并恢复自身。', restoreHpRatio: 0.16 },
  { id: 'skill-mint-breath', name: '薄荷吐息', manaCost: 22, minDamage: 28, maxDamage: 42, learnCost: 30, unlockLevel: 3, description: '吐出冰凉龙息，命中后压低对手节奏。', manaBurn: 10 },
  { id: 'skill-dragon-scale', name: '龙鳞硬化', manaCost: 18, minDamage: 18, maxDamage: 26, learnCost: 28, unlockLevel: 4, description: '硬化鳞片后反冲敌人。', defenseBuff: 3 },
  { id: 'skill-moon-scratch', name: '月弧裂爪', manaCost: 18, minDamage: 24, maxDamage: 35, learnCost: 24, unlockLevel: 2, description: '像月牙一样划开空气的高速斩击。' },
  { id: 'skill-shadow-blink', name: '影跃突袭', manaCost: 22, minDamage: 26, maxDamage: 40, learnCost: 34, unlockLevel: 4, description: '短距闪现后从背后发起袭击。', critBoost: 0.08 },
  { id: 'skill-peach-hug', name: '蜜桃抱击', manaCost: 15, minDamage: 20, maxDamage: 32, learnCost: 18, unlockLevel: 2, description: '抱住对手翻滚造成持续挤压。' },
  { id: 'skill-bamboo-shield', name: '竹影护盾', manaCost: 17, minDamage: 16, maxDamage: 24, learnCost: 22, unlockLevel: 3, description: '以竹叶形成护盾，减少下一次受到的伤害。', defenseBuff: 4 },
  { id: 'skill-qilin-frost', name: '麒麟寒潮', manaCost: 28, minDamage: 38, maxDamage: 56, learnCost: 46, unlockLevel: 5, description: '上古寒流席卷战场，冻结周围空气。', manaBurn: 18 },
  { id: 'skill-phoenix-flare', name: '曜羽焚天', manaCost: 30, minDamage: 42, maxDamage: 60, learnCost: 48, unlockLevel: 5, description: '挥洒火羽造成高额爆发，并回复自身生命。', restoreHpRatio: 0.14 },
  { id: 'skill-void-gaze', name: '虚空凝视', manaCost: 26, minDamage: 36, maxDamage: 52, learnCost: 44, unlockLevel: 5, description: '深渊凝视撕裂对手心神，暴击率更高。', critBoost: 0.12 },
  { id: 'skill-ender-shift', name: '末影迁跃', manaCost: 24, minDamage: 30, maxDamage: 46, learnCost: 36, unlockLevel: 4, description: '闪现后重击，同时有更高概率躲避反击。', dodgeBoost: 0.1 },
  { id: 'skill-slime-bounce', name: '弹弹冲击', manaCost: 12, minDamage: 18, maxDamage: 28, learnCost: 14, unlockLevel: 2, description: '高弹跳撞击，适合低门槛对战。', restoreMana: 6 },
  { id: 'skill-warden-sonic', name: '深渊音爆', manaCost: 34, minDamage: 46, maxDamage: 68, learnCost: 58, unlockLevel: 6, description: '借鉴远古守卫生物的声爆核心，造成毁灭性打击。', manaBurn: 20 }
];
const PET_SPECIES_BATTLE_PROFILES = {
  'cloud-corgi': { baseHp: 96, baseMana: 62, baseAttack: 18, baseDefense: 12, hpGrowth: 14, manaGrowth: 8, attackGrowth: 3, defenseGrowth: 2, skillPool: ['skill-comet-bark', 'skill-cloud-guard'] },
  'star-bunny': { baseHp: 84, baseMana: 74, baseAttack: 17, baseDefense: 10, hpGrowth: 12, manaGrowth: 10, attackGrowth: 3, defenseGrowth: 2, skillPool: ['skill-starlight-kick', 'skill-dream-heal'] },
  'mint-dragon': { baseHp: 102, baseMana: 80, baseAttack: 21, baseDefense: 13, hpGrowth: 15, manaGrowth: 10, attackGrowth: 4, defenseGrowth: 2, skillPool: ['skill-mint-breath', 'skill-dragon-scale'] },
  'moon-cat': { baseHp: 88, baseMana: 76, baseAttack: 19, baseDefense: 10, hpGrowth: 12, manaGrowth: 10, attackGrowth: 4, defenseGrowth: 2, skillPool: ['skill-moon-scratch', 'skill-shadow-blink'] },
  'peach-panda': { baseHp: 100, baseMana: 64, baseAttack: 18, baseDefense: 14, hpGrowth: 14, manaGrowth: 8, attackGrowth: 3, defenseGrowth: 3, skillPool: ['skill-peach-hug', 'skill-bamboo-shield'] },
  'azure-qilin': { baseHp: 126, baseMana: 92, baseAttack: 24, baseDefense: 18, hpGrowth: 18, manaGrowth: 12, attackGrowth: 5, defenseGrowth: 4, skillPool: ['skill-qilin-frost', 'skill-cloud-guard'] },
  'sun-phoenix': { baseHp: 112, baseMana: 96, baseAttack: 25, baseDefense: 15, hpGrowth: 16, manaGrowth: 12, attackGrowth: 5, defenseGrowth: 3, skillPool: ['skill-phoenix-flare', 'skill-starlight-kick'] },
  'void-basilisk': { baseHp: 118, baseMana: 90, baseAttack: 26, baseDefense: 16, hpGrowth: 17, manaGrowth: 11, attackGrowth: 5, defenseGrowth: 3, skillPool: ['skill-void-gaze', 'skill-shadow-blink'] },
  'ender-sprite': { baseHp: 94, baseMana: 88, baseAttack: 22, baseDefense: 12, hpGrowth: 13, manaGrowth: 12, attackGrowth: 4, defenseGrowth: 2, skillPool: ['skill-ender-shift', 'skill-moon-scratch'] },
  'slime-cub': { baseHp: 90, baseMana: 54, baseAttack: 16, baseDefense: 10, hpGrowth: 13, manaGrowth: 7, attackGrowth: 3, defenseGrowth: 2, skillPool: ['skill-slime-bounce', 'skill-peach-hug'] },
  'warden-cub': { baseHp: 136, baseMana: 104, baseAttack: 28, baseDefense: 20, hpGrowth: 19, manaGrowth: 13, attackGrowth: 5, defenseGrowth: 4, skillPool: ['skill-warden-sonic', 'skill-dragon-scale'] }
};
const PET_ARENA_OPPONENTS = [
  { id: 'arena-slime', name: '训练史莱姆王', speciesId: 'slime-cub', levelOffset: 0, rewardGrowth: 14, rewardCoins: 0, description: '适合新手热身的软弹对手。' },
  { id: 'arena-ender', name: '末影试炼使', speciesId: 'ender-sprite', levelOffset: 1, rewardGrowth: 20, rewardCoins: 0, description: '速度很快，适合检验技能蓝耗。' },
  { id: 'arena-mythic', name: '上古神兽幻影', speciesId: 'azure-qilin', levelOffset: 2, rewardGrowth: 28, rewardCoins: 0, description: '高血量高防御，适合高等级挑战。' }
];

const PET_INTERACTION_ACTIONS = {
  pet: {
    label: '抚摸',
    description: '提升亲密度，让宠物放松一点。',
    cost: 3,
    growthGain: 2,
    bondGain: 8,
    hpGain: 10,
    manaGain: 6
  },
  play: {
    label: '玩耍',
    description: '更快乐，也能小幅增加成长。',
    cost: 5,
    growthGain: 6,
    bondGain: 10,
    hpGain: -4,
    manaGain: -8
  },
  train: {
    label: '训练',
    description: '加快成长，但会消耗体力和蓝量。',
    cost: 8,
    growthGain: 12,
    bondGain: 4,
    hpGain: -12,
    manaGain: -16
  },
  rest: {
    label: '休息',
    description: '快速恢复体力与蓝量，顺便陪伴。',
    cost: 4,
    growthGain: 3,
    bondGain: 5,
    hpGain: 34,
    manaGain: 28
  }
};

const GENERATED_PET_LIBRARY = buildGeneratedPetLibrary();
ALL_PET_SPECIES.push(...GENERATED_PET_LIBRARY.species);
PET_SKILLS.push(...GENERATED_PET_LIBRARY.skills);
Object.assign(PET_SPECIES_BATTLE_PROFILES, GENERATED_PET_LIBRARY.battleProfiles);
PET_ARENA_OPPONENTS.push(...GENERATED_PET_LIBRARY.arenaOpponents);
PET_ARENA_OPPONENTS.forEach((opponent, index) => {
  if (!Number.isFinite(Number(opponent.entryCost))) {
    opponent.entryCost = [6, 12, 20, 10, 14, 18][index] || (8 + index * 2);
  }
});

const ui = {};
const MAX_HISTORY = 40;
const MAX_PREVIEW_NAMES = 10;
const MAX_RANDOM_HISTORY_PREVIEW = 6;
const safetyState = {
  snapshots: []
};
const rankingState = {
  includeAbsent: false
};

let appState = createDefaultRootState();
let selectedStudentId = '';
let activeGroupFilter = GROUP_FILTER_ALL;
let checkedStudentIds = new Set();
let randomPickState = null;
let tickTimer = null;
let audioContext = null;
let presentationModeActive = false;
let petBattleState = null;

const stopwatch = {
  running: false,
  elapsedMs: 0,
  startedAt: 0
};

const countdown = {
  running: false,
  totalMs: 300000,
  remainingMs: 300000,
  endsAt: 0
};

const appRuntime = window.ClassScoreAppRuntime.createRuntime({
  maxHistory: MAX_HISTORY,
  saveDelayMs: 220,
  buildSerializableState,
  buildSnapshotPayload(serializeStateCallback) {
    return {
      appState: serializeStateCallback(),
      selectedStudentId,
      activeGroupFilter,
      checkedStudentIds: [...checkedStudentIds],
      randomPickState
    };
  },
  restoreSnapshotPayload(snapshot) {
    appState = normalizeRootState(snapshot.appState);
    selectedStudentId = typeof snapshot.selectedStudentId === 'string' ? snapshot.selectedStudentId : '';
    activeGroupFilter = typeof snapshot.activeGroupFilter === 'string' ? snapshot.activeGroupFilter : GROUP_FILTER_ALL;
    checkedStudentIds = new Set(Array.isArray(snapshot.checkedStudentIds) ? snapshot.checkedStudentIds : []);
    randomPickState = snapshot.randomPickState || null;
    applyCountdownPreset(appState.appSettings.countdownPresetSeconds, { silent: true });
    syncSelectionForActiveBoard({ preferFirstStudent: true });
  },
  beforeCommit() {
    sanitizeAllBoards();
    syncSelectionForActiveBoard();
  },
  renderAll,
  showToast,
  saveState(payload) {
    return window.classScore.saveState(payload);
  },
  buildWidgetPayload,
  updateWidgetState(payload) {
    window.classScore.updateWidgetState(payload);
  }
});
const historyState = appRuntime.historyState;
const uiRuntime = window.ClassScoreUiRuntime.createRuntime({
  getUi() {
    return ui;
  }
});

document.addEventListener('DOMContentLoaded', init);

function createId(prefix) {
  if (window.crypto?.randomUUID) {
    return `${prefix}-${window.crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function cloneTemplates(templates) {
  return templates.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value
  }));
}

function cloneShopItems(items) {
  return items.map((item) => ({
    id: item.id,
    name: item.name,
    cost: item.cost,
    icon: item.icon,
    effectType: item.effectType,
    growthGain: item.growthGain,
    description: item.description,
    enabled: item.enabled !== false
  }));
}

function createEmptyInventory() {
  return {};
}

function createDefaultPetCollection() {
  return {
    pets: [],
    activePetId: '',
    incubatingEggs: []
  };
}

function getPetSpecies(speciesId) {
  return ALL_PET_SPECIES.find((species) => species.id === speciesId) || ALL_PET_SPECIES[0];
}

function clampScore(value) {
  return Math.max(-SCORE_LIMIT, Math.min(SCORE_LIMIT, Math.round(Number(value) || 0)));
}

function normalizeEggIncubator(egg) {
  const startedAt = Number.isFinite(Number(egg?.startedAt)) ? Number(egg.startedAt) : Date.now();
  const speciesId = typeof egg?.speciesId === 'string' && egg.speciesId ? egg.speciesId : pickRandomPetSpecies().id;
  const readyAt = Number.isFinite(Number(egg?.readyAt))
    ? Number(egg.readyAt)
    : startedAt + PET_EGG_HATCH_DURATION_MS;

  return {
    id: typeof egg?.id === 'string' ? egg.id : createId('egg'),
    itemId: typeof egg?.itemId === 'string' && egg.itemId ? egg.itemId : 'shop-pet-egg',
    speciesId,
    startedAt,
    readyAt: Math.max(startedAt, readyAt)
  };
}

function getIncubatingEggs(student) {
  return Array.isArray(student?.petCollection?.incubatingEggs) ? student.petCollection.incubatingEggs : [];
}

function getEggRemainingMs(egg) {
  return Math.max(0, Math.floor(Number(egg?.readyAt) || 0) - Date.now());
}

function isEggReadyToHatch(egg) {
  return getEggRemainingMs(egg) <= 0;
}

function buildDefaultPetName(speciesId) {
  return getPetSpecies(speciesId)?.name || '宠物伙伴';
}

function createDefaultBoard(name = '新面板 1') {
  return {
    id: createId('board'),
    name,
    students: [],
    groups: [],
    shopItems: cloneShopItems(DEFAULT_SHOP_ITEMS),
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
      name: group.name.trim(),
      leaderId: typeof group.leaderId === 'string' ? group.leaderId : ''
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

function normalizeStudentTextField(value, maxLength = 40) {
  return String(value ?? '').trim().slice(0, maxLength);
}

function normalizeInventory(inventory) {
  const source = inventory && typeof inventory === 'object' ? inventory : {};
  return Object.entries(source).reduce((nextInventory, [itemId, count]) => {
    if (typeof itemId !== 'string' || !itemId.trim()) {
      return nextInventory;
    }

    const normalizedCount = Math.max(0, Math.floor(Number(count) || 0));
    if (normalizedCount > 0) {
      nextInventory[itemId] = normalizedCount;
    }
    return nextInventory;
  }, {});
}

function normalizePet(pet) {
  const species = getPetSpecies(pet?.speciesId);
  const validSkillIds = new Set(getPetSkillPool(species.id).map((skill) => skill.id));
  return {
    id: typeof pet?.id === 'string' ? pet.id : createId('pet'),
    speciesId: species.id,
    name: typeof pet?.name === 'string' && pet.name.trim() ? pet.name.trim() : buildDefaultPetName(species.id),
    growth: Math.max(0, Math.floor(Number(pet?.growth) || 0)),
    feedCount: Math.max(0, Math.floor(Number(pet?.feedCount) || 0)),
    bond: Math.max(0, Math.floor(Number(pet?.bond) || 0)),
    wins: Math.max(0, Math.floor(Number(pet?.wins) || 0)),
    losses: Math.max(0, Math.floor(Number(pet?.losses) || 0)),
    currentHp: Math.max(0, Math.floor(Number(pet?.currentHp) || 0)),
    currentMana: Math.max(0, Math.floor(Number(pet?.currentMana) || 0)),
    learnedSkillIds: [...new Set(
      (Array.isArray(pet?.learnedSkillIds) ? pet.learnedSkillIds : [])
        .filter((skillId) => typeof skillId === 'string' && validSkillIds.has(skillId))
    )],
    defenseBuff: Math.max(0, Math.floor(Number(pet?.defenseBuff) || 0)),
    dodgeBuff: Math.max(0, Number(pet?.dodgeBuff) || 0),
    vitalsInitialized: Boolean(pet?.vitalsInitialized),
    hatchedAt: Number.isFinite(Number(pet?.hatchedAt)) ? Number(pet.hatchedAt) : Date.now()
  };
}

function normalizeShopItems(items, fallback) {
  const source = Array.isArray(items) && items.length > 0 ? items : fallback;
  const normalized = source
    .filter((item) => item && typeof item.name === 'string' && item.name.trim())
    .map((item) => {
      const effectType = SHOP_ITEM_EFFECT_TYPES.includes(item.effectType) ? item.effectType : 'collectible';
      return {
        id: typeof item.id === 'string' ? item.id : createId('shop-item'),
        name: item.name.trim(),
        cost: Math.max(1, Math.floor(Number(item.cost) || 1)),
        icon: typeof item.icon === 'string' && item.icon.trim() ? item.icon.trim() : '🎁',
        effectType,
        growthGain: effectType === 'snack' ? Math.max(0, Math.floor(Number(item.growthGain) || 0)) : 0,
        description: typeof item.description === 'string' ? item.description.trim() : '',
        enabled: item.enabled !== false
      };
    });

  if (!normalized.some((item) => item.effectType === 'pet-egg')) {
    return cloneShopItems(DEFAULT_SHOP_ITEMS);
  }

  return normalized;
}

function normalizeStudents(students, validGroupIds) {
  return (Array.isArray(students) ? students : [])
    .filter((student) => student && typeof student.name === 'string' && student.name.trim())
    .map((student) => ({
      id: typeof student.id === 'string' ? student.id : createId('student'),
      name: student.name.trim(),
      studentNo: normalizeStudentTextField(student.studentNo, 24),
      seatNo: normalizeStudentTextField(student.seatNo, 12),
      note: normalizeStudentTextField(student.note, 60),
      groupId: typeof student.groupId === 'string' && validGroupIds.has(student.groupId) ? student.groupId : '',
      absent: Boolean(student.absent),
      score: clampScore(student.score),
      history: normalizeHistory(student.history),
      inventory: normalizeInventory(student.inventory),
      petCollection: normalizePetCollection(student.petCollection)
    }))
    .sort((left, right) => left.name.localeCompare(right.name, 'zh-CN'));
}

function normalizeBoard(candidate, index) {
  const groups = normalizeGroups(candidate?.groups);
  const validGroupIds = new Set(groups.map((group) => group.id));
  const students = normalizeStudents(candidate?.students, validGroupIds);
  const studentMap = new Map(students.map((student) => [student.id, student]));

  return {
    id: typeof candidate?.id === 'string' ? candidate.id : createId('board'),
    name: typeof candidate?.name === 'string' && candidate.name.trim() ? candidate.name.trim() : `新面板 ${index + 1}`,
    students,
    shopItems: normalizeShopItems(candidate?.shopItems, DEFAULT_SHOP_ITEMS),
    groups: groups.map((group) => {
      const leader = studentMap.get(group.leaderId);
      return {
        ...group,
        leaderId: leader && leader.groupId === group.id ? leader.id : ''
      };
    }),
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
    const fallbackBoards = boards.length > 0 ? boards : [createDefaultBoard()];
    const activeBoardId = fallbackBoards.some((board) => board.id === candidate.activeBoardId)
      ? candidate.activeBoardId
      : fallbackBoards[0].id;

    return {
      version: 2,
      activeBoardId,
      boards: fallbackBoards,
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

async function refreshSafetySnapshots() {
  try {
    safetyState.snapshots = await window.classScore.listSafetySnapshots();
  } catch (error) {
    safetyState.snapshots = [];
  }

  if (ui.safetyMeta) {
    renderHeader();
  }
}

async function createProtectionPoint(label, state = serializeState()) {
  try {
    safetyState.snapshots = await window.classScore.createSafetySnapshot({
      label,
      state
    });
    renderHeader();
    return true;
  } catch (error) {
    showToast('保护点创建失败，本次操作未能自动备份。');
    return false;
  }
}

function summarizeRootState(state) {
  const boards = Array.isArray(state?.boards) ? state.boards : [];
  return {
    boardCount: boards.length,
    studentCount: boards.reduce((sum, board) => sum + (Array.isArray(board.students) ? board.students.length : 0), 0),
    groupCount: boards.reduce((sum, board) => sum + (Array.isArray(board.groups) ? board.groups.length : 0), 0)
  };
}

function hashString(value) {
  return [...String(value || '')].reduce((hash, char) => ((hash * 33) + char.codePointAt(0)) | 0, 0);
}

function hexToRgba(hex, alpha) {
  const normalized = hex.replace('#', '');
  const expanded = normalized.length === 3
    ? normalized.split('').map((char) => `${char}${char}`).join('')
    : normalized;

  const red = Number.parseInt(expanded.slice(0, 2), 16);
  const green = Number.parseInt(expanded.slice(2, 4), 16);
  const blue = Number.parseInt(expanded.slice(4, 6), 16);

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function hslToHex(hue, saturation, lightness) {
  const s = Math.max(0, Math.min(100, saturation)) / 100;
  const l = Math.max(0, Math.min(100, lightness)) / 100;
  const c = (1 - Math.abs((2 * l) - 1)) * s;
  const h = (((hue % 360) + 360) % 360) / 60;
  const x = c * (1 - Math.abs((h % 2) - 1));
  let red = 0;
  let green = 0;
  let blue = 0;

  if (h >= 0 && h < 1) {
    red = c;
    green = x;
  } else if (h < 2) {
    red = x;
    green = c;
  } else if (h < 3) {
    green = c;
    blue = x;
  } else if (h < 4) {
    green = x;
    blue = c;
  } else if (h < 5) {
    red = x;
    blue = c;
  } else {
    red = c;
    blue = x;
  }

  const match = l - (c / 2);
  const toHex = (value) => Math.round((value + match) * 255).toString(16).padStart(2, '0');
  return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
}

function getGeneratedRarityDisplay(tier, index) {
  const labels = {
    common: '常见',
    rare: '稀有',
    epic: '史诗',
    legendary: '传说',
    mythic: '神话'
  };
  return `${labels[tier] || labels.common}·${String(index + 1).padStart(3, '0')}`;
}

function buildGeneratedPetLibrary() {
  const families = [
    { slug: 'foxling', name: '狐灵', silhouette: 'fox', hueShift: 8, weight: 15, baseHp: 82, baseMana: 86, baseAttack: 20, baseDefense: 8, hpGrowth: 12, manaGrowth: 11, attackGrowth: 4, defenseGrowth: 2 },
    { slug: 'lynx', name: '山猞', silhouette: 'cat', hueShift: 22, weight: 13, baseHp: 88, baseMana: 80, baseAttack: 21, baseDefense: 10, hpGrowth: 13, manaGrowth: 9, attackGrowth: 4, defenseGrowth: 2 },
    { slug: 'stag', name: '角鹿', silhouette: 'deer', hueShift: 36, weight: 11, baseHp: 102, baseMana: 78, baseAttack: 18, baseDefense: 13, hpGrowth: 14, manaGrowth: 8, attackGrowth: 3, defenseGrowth: 3 },
    { slug: 'wolf', name: '霜狼', silhouette: 'wolf', hueShift: 52, weight: 12, baseHp: 94, baseMana: 76, baseAttack: 22, baseDefense: 11, hpGrowth: 13, manaGrowth: 8, attackGrowth: 4, defenseGrowth: 2 },
    { slug: 'lioncore', name: '狮魄', silhouette: 'lion', hueShift: 68, weight: 9, baseHp: 108, baseMana: 70, baseAttack: 24, baseDefense: 13, hpGrowth: 15, manaGrowth: 7, attackGrowth: 5, defenseGrowth: 3 },
    { slug: 'shellback', name: '壳甲灵', silhouette: 'turtle', hueShift: 96, weight: 8, baseHp: 126, baseMana: 64, baseAttack: 16, baseDefense: 18, hpGrowth: 16, manaGrowth: 7, attackGrowth: 3, defenseGrowth: 4 },
    { slug: 'drakeling', name: '幼龙', silhouette: 'dragon', hueShift: 128, weight: 7, baseHp: 110, baseMana: 88, baseAttack: 24, baseDefense: 13, hpGrowth: 16, manaGrowth: 10, attackGrowth: 5, defenseGrowth: 3 },
    { slug: 'crane', name: '云鹤', silhouette: 'bird', hueShift: 154, weight: 10, baseHp: 84, baseMana: 96, baseAttack: 20, baseDefense: 9, hpGrowth: 11, manaGrowth: 12, attackGrowth: 4, defenseGrowth: 2 },
    { slug: 'serpent', name: '灵蛇', silhouette: 'serpent', hueShift: 188, weight: 9, baseHp: 92, baseMana: 90, baseAttack: 23, baseDefense: 10, hpGrowth: 12, manaGrowth: 11, attackGrowth: 4, defenseGrowth: 2 },
    { slug: 'slimeheart', name: '凝胶灵', silhouette: 'slime', hueShift: 214, weight: 18, baseHp: 90, baseMana: 74, baseAttack: 17, baseDefense: 10, hpGrowth: 13, manaGrowth: 8, attackGrowth: 3, defenseGrowth: 2 },
    { slug: 'grifflet', name: '狮鹫', silhouette: 'griffin', hueShift: 244, weight: 6, baseHp: 104, baseMana: 84, baseAttack: 25, baseDefense: 12, hpGrowth: 15, manaGrowth: 9, attackGrowth: 5, defenseGrowth: 3 },
    { slug: 'salamander', name: '灵鲵', silhouette: 'axolotl', hueShift: 278, weight: 14, baseHp: 86, baseMana: 94, baseAttack: 19, baseDefense: 9, hpGrowth: 12, manaGrowth: 12, attackGrowth: 4, defenseGrowth: 2 }
  ];
  const elements = [
    { slug: 'ember', prefix: '赤焰', hue: 12, attackMod: 5, manaMod: -2, defenseMod: -1, hpMod: 4, fx: '烈焰', boost: { critBoost: 0.06 } },
    { slug: 'frost', prefix: '霜岚', hue: 196, attackMod: 2, manaMod: 2, defenseMod: 3, hpMod: 6, fx: '霜潮', boost: { defenseBuff: 3 } },
    { slug: 'storm', prefix: '雷曜', hue: 46, attackMod: 4, manaMod: 1, defenseMod: 0, hpMod: 2, fx: '雷链', boost: { manaBurn: 10 } },
    { slug: 'tide', prefix: '潮汐', hue: 208, attackMod: 1, manaMod: 4, defenseMod: 2, hpMod: 5, fx: '潮音', boost: { restoreMana: 10 } },
    { slug: 'dawn', prefix: '曙辉', hue: 32, attackMod: 3, manaMod: 2, defenseMod: 2, hpMod: 4, fx: '晨光', boost: { restoreHpRatio: 0.12 } },
    { slug: 'dusk', prefix: '暮影', hue: 276, attackMod: 4, manaMod: 2, defenseMod: 0, hpMod: 3, fx: '暗幕', boost: { dodgeBoost: 0.08 } },
    { slug: 'moss', prefix: '苔森', hue: 134, attackMod: 0, manaMod: 1, defenseMod: 4, hpMod: 8, fx: '森脉', boost: { defenseBuff: 4, restoreHpRatio: 0.08 } },
    { slug: 'astral', prefix: '星穹', hue: 316, attackMod: 5, manaMod: 4, defenseMod: 1, hpMod: 1, fx: '星弧', boost: { critBoost: 0.08, restoreMana: 8 } }
  ];
  const rarityTiers = ['common', 'rare', 'epic', 'legendary', 'mythic'];
  const species = [];
  const skills = [];
  const battleProfiles = {};
  const arenaOpponents = [];

  families.forEach((family, familyIndex) => {
    elements.forEach((element, elementIndex) => {
      const index = (familyIndex * elements.length) + elementIndex;
      const tier = rarityTiers[(familyIndex + (elementIndex * 2) + index) % rarityTiers.length];
      const id = `${element.slug}-${family.slug}`;
      const name = `${element.prefix}${family.name}`;
      const hue = (element.hue + family.hueShift + (index * 9)) % 360;
      const accent = hslToHex(hue, 72, 60 - (index % 4));
      const accentSoft = hslToHex((hue + 18) % 360, 88, 92 - (index % 3));
      const accentStrong = hslToHex((hue + 334) % 360, 74, 38 + (index % 5));
      const glow = hexToRgba(accent, 0.28);
      const rarity = getGeneratedRarityDisplay(tier, index + 12);
      const skillAlphaId = `skill-${id}-alpha`;
      const skillOmegaId = `skill-${id}-omega`;
      const attackSeed = family.baseAttack + element.attackMod;
      const manaSeed = family.baseMana + element.manaMod * 4;
      const defenseSeed = family.baseDefense + element.defenseMod;
      const hpSeed = family.baseHp + element.hpMod;

      species.push({
        id,
        name,
        rarity,
        rarityTier: tier,
        weight: Math.max(2, family.weight - Math.floor(index / 12)),
        accent,
        accentSoft,
        accentStrong,
        glow,
        description: `${name}栖息于${element.fx}领域，擅长以${family.name}的节奏发起连击与防守。`,
        model: {
          silhouette: family.silhouette,
          pattern: ['stripe', 'star', 'crest', 'rune', 'wave', 'orb'][index % 6],
          earStyle: ['point', 'round', 'leaf', 'fin'][index % 4],
          tailStyle: ['curl', 'fan', 'spike', 'cloud'][index % 4],
          ornament: ['orb', 'leaf', 'crown', 'flame', 'crystal', 'ring'][index % 6],
          wingStyle: ['none', 'small', 'feather', 'void'][index % 4],
          eyeTone: hslToHex((hue + 160) % 360, 78, 78),
          accent2: hslToHex((hue + 46) % 360, 70, 70)
        }
      });

      skills.push({
        id: skillAlphaId,
        name: `${name}·裂袭`,
        manaCost: 14 + ((index * 3) % 15),
        minDamage: 18 + attackSeed + (index % 4),
        maxDamage: 26 + attackSeed + (index % 7) + Math.max(4, family.attackGrowth * 2),
        learnCost: 16 + ((index * 5) % 32),
        unlockLevel: 2 + (index % 4),
        description: `${name}凝聚${element.fx}之力发动突进打击。`,
        ...element.boost
      });
      skills.push({
        id: skillOmegaId,
        name: `${name}·守幕`,
        manaCost: 12 + ((index * 7) % 14),
        minDamage: 14 + Math.max(2, Math.floor(attackSeed * 0.7)) + (index % 5),
        maxDamage: 22 + attackSeed + (index % 6),
        learnCost: 18 + ((index * 6) % 36),
        unlockLevel: 3 + (index % 4),
        description: `${name}展开专属护场并反击对手。`,
        defenseBuff: Math.max(2, defenseSeed % 5 + 2),
        restoreHpRatio: 0.06 + ((index % 3) * 0.03),
        restoreMana: 4 + (index % 7)
      });

      battleProfiles[id] = {
        baseHp: hpSeed + index,
        baseMana: manaSeed + Math.floor(index / 2),
        baseAttack: attackSeed + (index % 5) + Math.floor(index / 12),
        baseDefense: defenseSeed + (index % 6) + Math.floor(index / 16),
        hpGrowth: family.hpGrowth + (elementIndex % 3),
        manaGrowth: family.manaGrowth + (familyIndex % 3),
        attackGrowth: family.attackGrowth + (element.attackMod > 3 ? 1 : 0),
        defenseGrowth: family.defenseGrowth + (element.defenseMod > 2 ? 1 : 0),
        skillPool: [skillAlphaId, skillOmegaId]
      };

      if (arenaOpponents.length < 6 && index % 15 === 0) {
        arenaOpponents.push({
          id: `arena-${id}`,
          name: `${name}试炼体`,
          speciesId: id,
          levelOffset: 1 + (arenaOpponents.length % 3),
          rewardGrowth: 18 + (arenaOpponents.length * 6),
          rewardCoins: 0,
          entryCost: 10 + (arenaOpponents.length * 3),
          description: `${name}投影构成的训练目标，适合测试新技能。`
        });
      }
    });
  });

  return {
    species,
    skills,
    battleProfiles,
    arenaOpponents
  };
}

function getGroupById(board, groupId) {
  if (!board || !groupId) {
    return null;
  }

  return board.groups.find((group) => group.id === groupId) || null;
}

function getGroupVisual(board, groupId) {
  const group = getGroupById(board, groupId);
  if (!group) {
    return null;
  }

  const color = GROUP_COLOR_PALETTE[Math.abs(hashString(group.name || group.id)) % GROUP_COLOR_PALETTE.length];
  return {
    color,
    soft: hexToRgba(color, 0.14),
    border: hexToRgba(color, 0.32),
    glow: hexToRgba(color, 0.18)
  };
}

function getGroupStyleAttribute(board, groupId) {
  const visual = getGroupVisual(board, groupId);
  if (!visual) {
    return '';
  }

  return `style="--group-color:${visual.color};--group-color-soft:${visual.soft};--group-color-border:${visual.border};--group-color-glow:${visual.glow};"`;
}

function sanitizeBoardGroups(board) {
  if (!board) {
    return;
  }

  const validGroupIds = new Set(board.groups.map((group) => group.id));
  const studentMap = new Map(board.students.map((student) => [student.id, student]));

  board.students.forEach((student) => {
    if (!validGroupIds.has(student.groupId)) {
      student.groupId = '';
    }
  });

  board.groups = board.groups.map((group) => {
    const leader = studentMap.get(group.leaderId);
    return {
      ...group,
      leaderId: leader && leader.groupId === group.id ? leader.id : ''
    };
  });
}

function sanitizeBoardSystems(board) {
  if (!board) {
    return;
  }

  board.shopItems = normalizeShopItems(board.shopItems, DEFAULT_SHOP_ITEMS);
  board.students.forEach((student) => {
    student.inventory = normalizeInventory(student.inventory);
    student.petCollection = normalizePetCollection(student.petCollection);
    syncStudentPetCollection(student);
  });
}

function sanitizeAllBoards() {
  appState.boards.forEach((board) => {
    sanitizeBoardGroups(board);
    sanitizeBoardSystems(board);
  });
}

function getAttendanceLabel(student) {
  return student?.absent ? '缺勤' : '到场';
}

function getRankingModeLabel() {
  return rankingState.includeAbsent ? '全部学生' : '仅到场';
}

function getRankingCountLabel(count) {
  return rankingState.includeAbsent ? `${count} 人` : `${count} 名到场`;
}

function normalizeImportedStudentDraft(candidate) {
  const name = normalizeStudentTextField(candidate?.name, 24);
  if (!name) {
    return null;
  }

  return {
    name,
    studentNo: normalizeStudentTextField(candidate?.studentNo, 24),
    seatNo: normalizeStudentTextField(candidate?.seatNo, 12),
    groupName: normalizeStudentTextField(candidate?.groupName, 24),
    note: normalizeStudentTextField(candidate?.note, 60)
  };
}

function mergeStudentDrafts(students) {
  const merged = new Map();

  (Array.isArray(students) ? students : []).forEach((student) => {
    const normalized = normalizeImportedStudentDraft(
      typeof student === 'string' ? { name: student } : student
    );
    if (!normalized) {
      return;
    }

    const existing = merged.get(normalized.name);
    if (!existing) {
      merged.set(normalized.name, normalized);
      return;
    }

    ['studentNo', 'seatNo', 'groupName', 'note'].forEach((field) => {
      if (!existing[field] && normalized[field]) {
        existing[field] = normalized[field];
      }
    });
  });

  return [...merged.values()];
}

function createStudentDraftsFromNames(names) {
  return mergeStudentDrafts((Array.isArray(names) ? names : []).map((name) => ({ name })));
}

function extractStudentDraftsFromText(text) {
  return createStudentDraftsFromNames(extractNamesFromText(text));
}

function buildStudentDraftMeta(student) {
  const tags = [];
  if (student.groupName) {
    tags.push(`小组：${student.groupName}`);
  }
  if (student.studentNo) {
    tags.push(`学号：${student.studentNo}`);
  }
  if (student.seatNo) {
    tags.push(`座号：${student.seatNo}`);
  }
  if (student.note) {
    tags.push(`备注：${student.note}`);
  }
  return tags.join(' · ');
}

function buildStudentDraftSupplement(board, existingStudent, draft) {
  if (!existingStudent || !draft) {
    return null;
  }

  const supplement = {
    name: draft.name
  };

  if (!normalizeStudentTextField(existingStudent.studentNo, 24) && draft.studentNo) {
    supplement.studentNo = draft.studentNo;
  }
  if (!normalizeStudentTextField(existingStudent.seatNo, 12) && draft.seatNo) {
    supplement.seatNo = draft.seatNo;
  }
  if (!normalizeStudentTextField(existingStudent.note, 60) && draft.note) {
    supplement.note = draft.note;
  }

  const hasValidGroup = existingStudent.groupId && getGroupById(board, existingStudent.groupId);
  if (!hasValidGroup && draft.groupName) {
    supplement.groupName = draft.groupName;
  }

  return buildStudentDraftMeta(supplement) ? supplement : null;
}

function analyzeStudentBatch(board, students) {
  const normalizedStudents = mergeStudentDrafts(students);
  const existingStudentsByName = new Map((board?.students || []).map((student) => [student.name, student]));
  const freshStudents = [];
  const duplicateStudents = [];
  const supplementStudents = [];
  const skippedDuplicateStudents = [];

  normalizedStudents.forEach((student) => {
    const existingStudent = existingStudentsByName.get(student.name);
    if (!existingStudent) {
      freshStudents.push(student);
      return;
    }

    duplicateStudents.push(student);
    const supplement = buildStudentDraftSupplement(board, existingStudent, student);
    if (supplement) {
      supplementStudents.push(supplement);
      return;
    }

    skippedDuplicateStudents.push(student);
  });

  return {
    normalizedStudents,
    freshStudents,
    duplicateStudents,
    supplementStudents,
    skippedDuplicateStudents,
    freshNames: freshStudents.map((student) => student.name),
    duplicateNames: duplicateStudents.map((student) => student.name),
    supplementNames: supplementStudents.map((student) => student.name)
  };
}

function buildPreviewTagRow(items) {
  const tags = (Array.isArray(items) ? items : [])
    .filter(Boolean)
    .map((item) => `<span class="preview-tag">${escapeHtml(item)}</span>`)
    .join('');

  return tags ? `<div class="preview-tag-row">${tags}</div>` : '';
}

function buildPreviewNameList(names, options = {}) {
  const title = options.title || '涉及对象';
  const items = Array.isArray(names) ? names.filter(Boolean) : [];
  if (items.length === 0) {
    return '';
  }

  const visibleNames = items.slice(0, options.limit || MAX_PREVIEW_NAMES);
  const hiddenCount = Math.max(0, items.length - visibleNames.length);

  return `
    <div class="preview-summary">
      <strong>${escapeHtml(title)}</strong>
      <ul class="preview-list">
        ${visibleNames.map((name, index) => `
          <li>
            <span>${escapeHtml(name)}</span>
            <span class="preview-meta">#${index + 1}</span>
          </li>
        `).join('')}
      </ul>
      ${hiddenCount > 0 ? `<p class="modal-help">还有 ${hiddenCount} 项未展开显示。</p>` : ''}
    </div>
  `;
}

function buildPreviewStudentList(students, options = {}) {
  const title = options.title || '涉及对象';
  const items = mergeStudentDrafts(students);
  if (items.length === 0) {
    return '';
  }

  const visibleStudents = items.slice(0, options.limit || MAX_PREVIEW_NAMES);
  const hiddenCount = Math.max(0, items.length - visibleStudents.length);

  return `
    <div class="preview-summary">
      <strong>${escapeHtml(title)}</strong>
      <ul class="preview-list">
        ${visibleStudents.map((student, index) => `
          <li>
            <span>${escapeHtml(student.name)}</span>
            <span class="preview-meta">${escapeHtml(buildStudentDraftMeta(student) || `#${index + 1}`)}</span>
          </li>
        `).join('')}
      </ul>
      ${hiddenCount > 0 ? `<p class="modal-help">还有 ${hiddenCount} 项未展开显示。</p>` : ''}
    </div>
  `;
}

function openActionPreviewModal(config) {
  const sections = [
    config.tags?.length ? buildPreviewTagRow(config.tags) : '',
    ...(Array.isArray(config.summaryBlocks) ? config.summaryBlocks : []).map((block) => `
      <div class="preview-summary">
        <strong>${escapeHtml(block.title || '操作摘要')}</strong>
        <div>${block.html || ''}</div>
      </div>
    `),
    config.nameListHtml || '',
    config.warningText ? `<div class="modal-danger-note">${escapeHtml(config.warningText)}</div>` : ''
  ].filter(Boolean);

  openModal({
    title: config.title || '确认操作',
    submitText: config.submitText || '继续执行',
    submitClassName: config.submitClassName || 'mini-action mini-action-red',
    cancelText: config.cancelText || '返回修改',
    html: sections.join(''),
    onSubmit: async () => {
      const result = await config.onConfirm?.();
      return result !== false;
    }
  });
}

function resetRuntimeToolsFromState() {
  stopwatch.running = false;
  stopwatch.elapsedMs = 0;
  stopwatch.startedAt = 0;
  applyCountdownPreset(appState.appSettings.countdownPresetSeconds, { silent: true });
}

function buildSafetySnapshotCards() {
  return safetyState.snapshots.map((snapshot) => {
    const summary = summarizeRootState(snapshot.payload);
    return `
      <button class="group-card" type="button" data-action="restore-safety-snapshot" data-safety-id="${snapshot.id}">
        <div class="group-card-main">
          <strong>${escapeHtml(snapshot.label)}</strong>
          <small>${formatExportTime(snapshot.createdAt)} · ${summary.boardCount} 个面板 · ${summary.studentCount} 名学生</small>
        </div>
        <span class="group-score">${summary.groupCount} 组</span>
      </button>
    `;
  }).join('');
}

function openSafetyRestoreModal() {
  if (safetyState.snapshots.length === 0) {
    showToast('当前还没有可恢复的保护点。');
    return;
  }

  openModal({
    title: '恢复保护点',
    hideSubmit: true,
    cancelText: '关闭',
    html: `
      <div class="modal-danger-note">恢复前会自动为当前状态再创建一个保护点，避免误恢复后找不回现在的数据。</div>
      <div class="group-list">${buildSafetySnapshotCards()}</div>
    `,
    onOpen: (body) => {
      const buttons = [...body.querySelectorAll('[data-action="restore-safety-snapshot"]')];
      const handleClick = (event) => {
        const snapshotId = event.currentTarget.dataset.safetyId;
        const snapshot = safetyState.snapshots.find((item) => item.id === snapshotId);
        if (!snapshot) {
          return;
        }

        const summary = summarizeRootState(snapshot.payload);
        openActionPreviewModal({
          title: '确认恢复保护点',
          submitText: '恢复到这个保护点',
          submitClassName: 'mini-action mini-action-orange',
          tags: [
            `${summary.boardCount} 个面板`,
            `${summary.studentCount} 名学生`,
            `${summary.groupCount} 个小组`
          ],
          summaryBlocks: [
            {
              title: snapshot.label,
              html: `<p class="preview-empty">创建时间：${escapeHtml(formatExportTime(snapshot.createdAt))}</p>`
            }
          ],
          warningText: '恢复后将覆盖当前课堂数据，但系统会先自动生成一个新的保护点。',
          onConfirm: async () => {
            await createProtectionPoint(`恢复前自动保护 · ${getActiveBoard()?.name || '当前课堂'}`);
            appState = normalizeRootState(snapshot.payload);
            checkedStudentIds.clear();
            randomPickState = null;
            selectedStudentId = '';
            activeGroupFilter = GROUP_FILTER_ALL;
            resetRuntimeToolsFromState();
            syncSelectionForActiveBoard({ preferFirstStudent: true, resetGroupFilter: true });
            commitState(`已恢复到保护点“${snapshot.label}”。`);
          }
        });
      };

      buttons.forEach((button) => button.addEventListener('click', handleClick));
      return () => {
        buttons.forEach((button) => button.removeEventListener('click', handleClick));
      };
    }
  });
}

function getRandomCandidateContext(board) {
  let scopedStudents = checkedStudentIds.size > 0
    ? board.students.filter((student) => checkedStudentIds.has(student.id))
    : [];
  let scopeLabel = '已勾选学生';

  if (scopedStudents.length === 0 && activeGroupFilter !== GROUP_FILTER_ALL) {
    scopedStudents = activeGroupFilter === GROUP_FILTER_UNGROUPED
      ? board.students.filter((student) => !student.groupId)
      : board.students.filter((student) => student.groupId === activeGroupFilter);
    scopeLabel = activeGroupFilter === GROUP_FILTER_UNGROUPED
      ? '未分组学生'
      : getGroupName(board, activeGroupFilter);
  }

  if (scopedStudents.length === 0) {
    scopedStudents = [...board.students];
    scopeLabel = '当前面板全部学生';
  }

  const absentStudents = scopedStudents.filter((student) => student.absent);
  const students = scopedStudents.filter((student) => !student.absent);

  return {
    students,
    totalStudents: scopedStudents,
    scopeLabel,
    scopeKey: `${board.id}::${students.map((student) => student.id).join('|')}`,
    absentCount: absentStudents.length
  };
}

function normalizeRandomPickState(board, candidate = randomPickState) {
  if (!board || !candidate || candidate.boardId !== board.id) {
    return null;
  }

  const validStudentIds = new Set(board.students.map((student) => student.id));
  const candidateIds = Array.isArray(candidate.candidateIds)
    ? candidate.candidateIds.filter((id) => validStudentIds.has(id))
    : [];

  if (candidateIds.length === 0) {
    return null;
  }

  const candidateSet = new Set(candidateIds);
  const history = (Array.isArray(candidate.history) ? candidate.history : [])
    .filter((entry) => entry && typeof entry.studentId === 'string' && candidateSet.has(entry.studentId))
    .map((entry) => ({
      studentId: entry.studentId,
      timestamp: Number.isFinite(Number(entry.timestamp)) ? Number(entry.timestamp) : Date.now()
    }));
  const remainingIds = (Array.isArray(candidate.remainingIds) ? candidate.remainingIds : candidateIds)
    .filter((id) => candidateSet.has(id));
  const studentId = typeof candidate.studentId === 'string' && candidateSet.has(candidate.studentId)
    ? candidate.studentId
    : (history[0]?.studentId || '');

  return {
    boardId: board.id,
    scopeKey: typeof candidate.scopeKey === 'string' ? candidate.scopeKey : `${board.id}::${candidateIds.join('|')}`,
    scopeLabel: typeof candidate.scopeLabel === 'string' && candidate.scopeLabel.trim()
      ? candidate.scopeLabel.trim()
      : '当前面板全部学生',
    candidateIds,
    remainingIds,
    history,
    studentId,
    timestamp: Number.isFinite(Number(candidate.timestamp)) ? Number(candidate.timestamp) : (history[0]?.timestamp || 0),
    roundStartedAt: Number.isFinite(Number(candidate.roundStartedAt)) ? Number(candidate.roundStartedAt) : Date.now()
  };
}

function createRandomRoundState(board, context) {
  const candidateIds = context.students.map((student) => student.id);
  return {
    boardId: board.id,
    scopeKey: context.scopeKey,
    scopeLabel: context.scopeLabel,
    candidateIds,
    remainingIds: [...candidateIds],
    history: [],
    studentId: '',
    timestamp: 0,
    roundStartedAt: Date.now()
  };
}

function syncRandomPickScope() {
  const board = getActiveBoard();
  if (!board || !randomPickState) {
    return;
  }

  const normalized = normalizeRandomPickState(board);
  if (!normalized) {
    randomPickState = null;
    return;
  }

  const context = getRandomCandidateContext(board);
  if (normalized.scopeKey !== context.scopeKey) {
    randomPickState = null;
    return;
  }

  randomPickState = {
    ...normalized,
    scopeLabel: context.scopeLabel
  };
}

function ensureRandomRoundState(board, options = {}) {
  const context = getRandomCandidateContext(board);
  if (context.students.length === 0) {
    return {
      context,
      state: null
    };
  }

  const normalized = normalizeRandomPickState(board);
  if (options.reset || !normalized || normalized.scopeKey !== context.scopeKey) {
    randomPickState = createRandomRoundState(board, context);
    return {
      context,
      state: randomPickState
    };
  }

  randomPickState = {
    ...normalized,
    scopeLabel: context.scopeLabel,
    scopeKey: context.scopeKey
  };

  return {
    context,
    state: randomPickState
  };
}

function getRandomHistoryEntries(board, state = normalizeRandomPickState(board)) {
  if (!board || !state) {
    return [];
  }

  return state.history
    .map((entry) => {
      const student = board.students.find((item) => item.id === entry.studentId);
      return student
        ? {
            ...entry,
            student
          }
        : null;
    })
    .filter(Boolean);
}

function resetRandomPickRound(options = {}) {
  const board = getActiveBoard();
  if (!board || board.students.length === 0) {
    showToast('当前面板还没有学生。');
    return;
  }

  const { context, state } = ensureRandomRoundState(board, { reset: true });
  if (!state) {
    showToast(context.absentCount > 0 ? '当前范围内学生都已标记缺勤。' : '当前范围内没有可抽取的学生。');
    return;
  }

  renderAll();
  syncWidgetState();
  if (!options.silent) {
    showToast(`已重置 ${context.scopeLabel} 的随机点名轮次。`);
  }
}

function openRandomHistoryModal() {
  const board = getActiveBoard();
  const state = normalizeRandomPickState(board);
  const historyEntries = getRandomHistoryEntries(board, state);

  if (!state || historyEntries.length === 0) {
    showToast('当前还没有本轮抽取记录。');
    return;
  }

  openModal({
    title: '本轮随机点名记录',
    hideSubmit: true,
    cancelText: '关闭',
    html: `
      ${buildPreviewTagRow([state.scopeLabel, `${historyEntries.length} 人已抽`, `${state.remainingIds.length} 人未抽`, getRandomCandidateContext(board).absentCount > 0 ? `已排除缺勤 ${getRandomCandidateContext(board).absentCount} 人` : ''])}
      <div class="preview-summary">
        <strong>已抽名单</strong>
        <ul class="preview-list">
          ${historyEntries.map((entry, index) => `
            <li>
              <span>${escapeHtml(entry.student.name)}</span>
              <span class="preview-meta">第 ${historyEntries.length - index} 次 · ${formatTimestamp(entry.timestamp)}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `
  });
}

async function init() {
  cacheElements();
  bindEvents();

  const loadedState = await window.classScore.loadState();
  appState = normalizeRootState(loadedState);
  await refreshSafetySnapshots();
  applyCountdownPreset(appState.appSettings.countdownPresetSeconds, { silent: true });
  syncSelectionForActiveBoard({ preferFirstStudent: true, resetGroupFilter: true });
  startTicker();
  appRuntime.setLastCommittedSnapshot(createSnapshot());
  renderAll();
  syncWidgetState();
}

function cacheElements() {
  Object.assign(ui, {
    boardTitle: document.getElementById('boardTitle'),
    boardSelect: document.getElementById('boardSelect'),
    studentSummaryPill: document.getElementById('studentSummaryPill'),
    stepSummaryPill: document.getElementById('stepSummaryPill'),
    stepValueButtonMeta: document.getElementById('stepValueButtonMeta'),
    actionPanel: document.getElementById('actionPanel'),
    actionPanelContent: document.getElementById('actionPanelContent'),
    toggleActionPanelBtn: document.getElementById('toggleActionPanelBtn'),
    undoBtn: document.getElementById('undoBtn'),
    redoBtn: document.getElementById('redoBtn'),
    safetyRestoreBtn: document.getElementById('safetyRestoreBtn'),
    undoMeta: document.getElementById('undoMeta'),
    redoMeta: document.getElementById('redoMeta'),
    safetyMeta: document.getElementById('safetyMeta'),
    presentationModeBtn: document.getElementById('presentationModeBtn'),
    createBoardBtn: document.getElementById('createBoardBtn'),
    deleteBoardBtn: document.getElementById('deleteBoardBtn'),
    randomPickBtn: document.getElementById('randomPickBtn'),
    importBackupBtn: document.getElementById('importBackupBtn'),
    exportBackupBtn: document.getElementById('exportBackupBtn'),
    stepValueBtn: document.getElementById('stepValueBtn'),
    ruleReasonBtn: document.getElementById('ruleReasonBtn'),
    clearBoardBtn: document.getElementById('clearBoardBtn'),
    resetBoardScoresBtn: document.getElementById('resetBoardScoresBtn'),
    deleteStudentsBtn: document.getElementById('deleteStudentsBtn'),
    groupBonusBtn: document.getElementById('groupBonusBtn'),
    groupedBaseBonusBtn: document.getElementById('groupedBaseBonusBtn'),
    exportSummaryBtn: document.getElementById('exportSummaryBtn'),
    groupRankingBtn: document.getElementById('groupRankingBtn'),
    studentRankingBtn: document.getElementById('studentRankingBtn'),
    batchGroupingBtn: document.getElementById('batchGroupingBtn'),
    batchScoringBtn: document.getElementById('batchScoringBtn'),
    batchAddBtn: document.getElementById('batchAddBtn'),
    addStudentQuickBtn: document.getElementById('addStudentQuickBtn'),
    petHomeBtn: document.getElementById('petHomeBtn'),
    petShopBtn: document.getElementById('petShopBtn'),
    shopBtn: document.getElementById('shopBtn'),
    manageGroupsBtn: document.getElementById('manageGroupsBtn'),
    groupCountBadge: document.getElementById('groupCountBadge'),
    groupList: document.getElementById('groupList'),
    groupHint: document.getElementById('groupHint'),
    checkedCountBadge: document.getElementById('checkedCountBadge'),
    studentSearchInput: document.getElementById('studentSearchInput'),
    clearStudentChecksBtn: document.getElementById('clearStudentChecksBtn'),
    studentList: document.getElementById('studentList'),
    focusRuleBtn: document.getElementById('focusRuleBtn'),
    selectedStudentCard: document.getElementById('selectedStudentCard'),
    plusTemplateList: document.getElementById('plusTemplateList'),
    minusTemplateList: document.getElementById('minusTemplateList'),
    quickAdjustForm: document.getElementById('quickAdjustForm'),
    quickAdjustType: document.getElementById('quickAdjustType'),
    quickAdjustLabel: document.getElementById('quickAdjustLabel'),
    quickAdjustValue: document.getElementById('quickAdjustValue'),
    quickAdjustNote: document.getElementById('quickAdjustNote'),
    reasonSuggestions: document.getElementById('reasonSuggestions'),
    clearHistoryBtn: document.getElementById('clearHistoryBtn'),
    historyList: document.getElementById('historyList'),
    overviewGrid: document.getElementById('overviewGrid'),
    stopwatchDisplay: document.getElementById('stopwatchDisplay'),
    stopwatchToggleBtn: document.getElementById('stopwatchToggleBtn'),
    stopwatchResetBtn: document.getElementById('stopwatchResetBtn'),
    countdownBox: document.getElementById('countdownBox'),
    countdownDisplay: document.getElementById('countdownDisplay'),
    countdownToggleBtn: document.getElementById('countdownToggleBtn'),
    countdownResetBtn: document.getElementById('countdownResetBtn'),
    countdownPresetForm: document.getElementById('countdownPresetForm'),
    countdownMinutes: document.getElementById('countdownMinutes'),
    countdownSeconds: document.getElementById('countdownSeconds'),
    countdownPresetButtons: Array.from(document.querySelectorAll('[data-countdown-preset]')),
    randomResultCard: document.getElementById('randomResultCard'),
    widgetPreviewGlyph: document.getElementById('widgetPreviewGlyph'),
    widgetPreviewText: document.getElementById('widgetPreviewText'),
    rankingFilterBtn: document.getElementById('rankingFilterBtn'),
    groupRankingList: document.getElementById('groupRankingList'),
    studentRankingList: document.getElementById('studentRankingList'),
    modalDialog: document.getElementById('modalDialog'),
    modalForm: document.getElementById('modalForm'),
    modalTitle: document.getElementById('modalTitle'),
    modalBody: document.getElementById('modalBody'),
    modalCloseBtn: document.getElementById('modalCloseBtn'),
    modalCancelBtn: document.getElementById('modalCancelBtn'),
    modalSubmitBtn: document.getElementById('modalSubmitBtn'),
    presentationOverlay: document.getElementById('presentationOverlay'),
    presentationBoardTitle: document.getElementById('presentationBoardTitle'),
    presentationRefreshBtn: document.getElementById('presentationRefreshBtn'),
    presentationExitBtn: document.getElementById('presentationExitBtn'),
    presentationTimeDisplay: document.getElementById('presentationTimeDisplay'),
    presentationModeLabel: document.getElementById('presentationModeLabel'),
    presentationRandomCard: document.getElementById('presentationRandomCard'),
    presentationRandomName: document.getElementById('presentationRandomName'),
    presentationRandomMeta: document.getElementById('presentationRandomMeta'),
    presentationGroupRanking: document.getElementById('presentationGroupRanking'),
    presentationStudentRanking: document.getElementById('presentationStudentRanking'),
    toastStack: document.getElementById('toastStack')
  });
}

function bindEvents() {
  ui.boardSelect.addEventListener('change', () => {
    appState.activeBoardId = ui.boardSelect.value;
    syncSelectionForActiveBoard({ preferFirstStudent: true, resetGroupFilter: true });
    appRuntime.setLastCommittedSnapshot(createSnapshot());
    renderAll();
    syncWidgetState();
    scheduleSave();
  });

  ui.undoBtn.addEventListener('click', undoLastAction);
  ui.redoBtn.addEventListener('click', redoLastAction);
  ui.toggleActionPanelBtn.addEventListener('click', toggleActionPanel);
  ui.safetyRestoreBtn.addEventListener('click', openSafetyRestoreModal);
  ui.presentationModeBtn.addEventListener('click', enterPresentationMode);
  ui.createBoardBtn.addEventListener('click', openCreateBoardModal);
  ui.deleteBoardBtn.addEventListener('click', deleteCurrentBoard);
  ui.randomPickBtn.addEventListener('click', randomPickStudent);
  ui.importBackupBtn.addEventListener('click', importBackup);
  ui.exportBackupBtn.addEventListener('click', exportBackup);
  ui.stepValueBtn.addEventListener('click', cycleStepValue);
  ui.ruleReasonBtn.addEventListener('click', openRulesModal);
  ui.focusRuleBtn.addEventListener('click', openRulesModal);
  ui.clearBoardBtn.addEventListener('click', clearCurrentBoard);
  ui.resetBoardScoresBtn.addEventListener('click', resetCurrentBoardScores);
  ui.deleteStudentsBtn.addEventListener('click', deleteSelectedStudents);
  ui.groupBonusBtn.addEventListener('click', openGroupBonusModal);
  ui.groupedBaseBonusBtn.addEventListener('click', openGroupedBaseBonusModal);
  ui.exportSummaryBtn.addEventListener('click', exportSummary);
  ui.groupRankingBtn.addEventListener('click', openGroupRankingModal);
  ui.studentRankingBtn.addEventListener('click', openStudentRankingModal);
  ui.rankingFilterBtn.addEventListener('click', toggleRankingFilter);
  ui.batchGroupingBtn.addEventListener('click', openBatchGroupingModal);
  ui.batchScoringBtn.addEventListener('click', openBatchScoringModal);
  ui.batchAddBtn.addEventListener('click', openBatchAddModal);
  ui.addStudentQuickBtn.addEventListener('click', openAddStudentModal);
  ui.petHomeBtn.addEventListener('click', openPetHomeModal);
  ui.petShopBtn.addEventListener('click', openPetShopModal);
  ui.shopBtn.addEventListener('click', openShopModal);
  ui.manageGroupsBtn.addEventListener('click', openManageGroupsModal);

  ui.groupList.addEventListener('click', handleGroupListClick);
  ui.studentSearchInput.addEventListener('input', () => {
    renderStudents();
  });
  ui.clearStudentChecksBtn.addEventListener('click', () => {
    checkedStudentIds.clear();
    renderAll();
    syncWidgetState();
  });
  ui.studentList.addEventListener('click', handleStudentListClick);
  ui.studentList.addEventListener('change', handleStudentListChange);
  ui.selectedStudentCard.addEventListener('click', handleSelectedStudentCardClick);
  ui.selectedStudentCard.addEventListener('change', handleSelectedStudentCardChange);
  ui.randomResultCard.addEventListener('click', handleRandomCardClick);
  ui.plusTemplateList.addEventListener('click', (event) => handleTemplateClick(event, 'plus'));
  ui.minusTemplateList.addEventListener('click', (event) => handleTemplateClick(event, 'minus'));

  ui.quickAdjustForm.addEventListener('submit', (event) => {
    event.preventDefault();
    applyQuickAdjust();
  });
  ui.quickAdjustForm.addEventListener('click', handleQuickAdjustFormClick);

  ui.clearHistoryBtn.addEventListener('click', clearCurrentStudentHistory);

  ui.stopwatchToggleBtn.addEventListener('click', () => {
    if (stopwatch.running) {
      pauseStopwatch();
      showToast('计时器已暂停。');
      return;
    }

    startStopwatch();
    showToast('计时器已开始。');
  });

  ui.stopwatchResetBtn.addEventListener('click', () => {
    resetStopwatch();
    showToast('计时器已复位。');
  });

  ui.countdownToggleBtn.addEventListener('click', () => {
    if (countdown.running) {
      pauseCountdown();
      showToast('倒计时已暂停。');
      return;
    }

    if (countdown.remainingMs <= 0) {
      countdown.remainingMs = countdown.totalMs;
    }

    startCountdown();
    showToast('倒计时已开始。');
  });

  ui.countdownResetBtn.addEventListener('click', () => {
    resetCountdown();
    showToast('倒计时已复位。');
  });

  ui.countdownPresetButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const totalSeconds = Math.max(1, Math.floor(Number(button.dataset.countdownPreset) || 0));
      applyCountdownPreset(totalSeconds);
      showToast(`倒计时已设为 ${formatCountdown(totalSeconds * 1000)}。`);
    });
  });

  ui.countdownPresetForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const minutes = Math.max(0, Math.floor(Number(ui.countdownMinutes.value) || 0));
    const seconds = Math.max(0, Math.min(59, Math.floor(Number(ui.countdownSeconds.value) || 0)));
    const totalSeconds = minutes * 60 + seconds;

    if (totalSeconds <= 0) {
      showToast('倒计时至少需要 1 秒。');
      return;
    }

    applyCountdownPreset(totalSeconds);
    showToast(`倒计时已设为 ${formatCountdown(totalSeconds * 1000)}。`);
  });

  ui.modalCloseBtn.addEventListener('click', closeModal);
  ui.modalCancelBtn.addEventListener('click', closeModal);
  ui.modalForm.addEventListener('submit', handleModalSubmit);
  ui.modalDialog.addEventListener('close', cleanupModal);
  ui.presentationRefreshBtn.addEventListener('click', () => {
    renderPresentation();
  });
  ui.presentationExitBtn.addEventListener('click', exitPresentationMode);
  ui.presentationRandomCard.addEventListener('click', handlePresentationRandomCardActivate);
  ui.presentationRandomCard.addEventListener('keydown', handlePresentationRandomCardKeyDown);

  document.addEventListener('keydown', handleGlobalKeyDown);
  document.addEventListener('fullscreenchange', syncPresentationModeState);
}

function getActiveBoard() {
  return appState.boards.find((board) => board.id === appState.activeBoardId) ?? appState.boards[0] ?? null;
}

function syncSelectionForActiveBoard(options = {}) {
  const board = getActiveBoard();
  if (!board) {
    selectedStudentId = '';
    checkedStudentIds.clear();
    activeGroupFilter = GROUP_FILTER_ALL;
    return;
  }

  const studentIds = new Set(board.students.map((student) => student.id));
  checkedStudentIds = new Set([...checkedStudentIds].filter((id) => studentIds.has(id)));

  if (!studentIds.has(selectedStudentId)) {
    selectedStudentId = options.preferFirstStudent ? (board.students[0]?.id || '') : '';
  }

  const validGroupFilters = new Set(board.groups.map((group) => group.id));
  if (
    options.resetGroupFilter ||
    (activeGroupFilter !== GROUP_FILTER_ALL &&
      activeGroupFilter !== GROUP_FILTER_UNGROUPED &&
      !validGroupFilters.has(activeGroupFilter))
  ) {
    activeGroupFilter = GROUP_FILTER_ALL;
  }

  if (randomPickState?.boardId !== board.id) {
    randomPickState = null;
  }
}

function renderAll() {
  syncRandomPickScope();
  renderHeader();
  renderGroups();
  renderStudents();
  renderSelectedStudentCard();
  renderTemplateList('plus');
  renderTemplateList('minus');
  renderHistory();
  renderOverview();
  renderRankings();
  renderRandomCard();
  renderTimers();
  renderReasonSuggestions();
  renderPresentation();
}

function renderHeader() {
  const board = getActiveBoard();
  if (!board) {
    return;
  }

  ui.boardTitle.textContent = board.name;
  ui.boardSelect.innerHTML = appState.boards
    .map((item) => `<option value="${item.id}" ${item.id === board.id ? 'selected' : ''}>${escapeHtml(item.name)}</option>`)
    .join('');

  ui.studentSummaryPill.textContent = `${board.students.length} 名学生`;
  ui.stepSummaryPill.textContent = `步进 ${board.settings.stepValue} 分`;
  ui.stepValueButtonMeta.textContent = `当前 ${board.settings.stepValue} 分`;
  ui.groupCountBadge.textContent = `${board.groups.length} 组`;
  ui.manageGroupsBtn.disabled = false;
  ui.checkedCountBadge.textContent = `已勾选 ${checkedStudentIds.size} 人`;
  ui.rankingFilterBtn.textContent = getRankingModeLabel();
  ui.actionPanel.classList.toggle('collapsed', Boolean(appState.appSettings.quickActionsCollapsed));
  ui.actionPanelContent.hidden = Boolean(appState.appSettings.quickActionsCollapsed);
  ui.toggleActionPanelBtn.textContent = appState.appSettings.quickActionsCollapsed ? '显示功能面板' : '隐藏功能面板';
  ui.toggleActionPanelBtn.setAttribute('aria-expanded', appState.appSettings.quickActionsCollapsed ? 'false' : 'true');
  ui.quickAdjustValue.value = String(board.settings.stepValue);
  ui.undoBtn.disabled = historyState.undo.length === 0;
  ui.redoBtn.disabled = historyState.redo.length === 0;
  ui.safetyRestoreBtn.disabled = safetyState.snapshots.length === 0;
  ui.undoMeta.textContent = `${historyState.undo.length} 步`;
  ui.redoMeta.textContent = `${historyState.redo.length} 步`;
  ui.safetyMeta.textContent = `${safetyState.snapshots.length} 条`;
  ui.safetyRestoreBtn.title = safetyState.snapshots.length > 0
    ? `最近保护点：${safetyState.snapshots[0].label} · ${formatExportTime(safetyState.snapshots[0].createdAt)}`
    : '当前还没有可恢复的保护点';
  const presentationText = ui.presentationModeBtn.querySelector('.action-text');
  if (presentationText) {
    presentationText.textContent = presentationModeActive ? '退出大屏' : '大屏展示';
  }
}

function renderGroups() {
  const board = getActiveBoard();
  if (!board) {
    return;
  }

  const groupSummaries = getGroupRanking(board);
  const ungroupedCount = board.students.filter((student) => !student.groupId).length;
  const cards = [
    {
      id: GROUP_FILTER_ALL,
      name: '全部学生',
      count: board.students.length,
      total: board.students.reduce((sum, student) => sum + student.score, 0)
    }
  ];

  if (ungroupedCount > 0 || board.groups.length === 0) {
    cards.push({
      id: GROUP_FILTER_UNGROUPED,
      name: '未分组',
      count: ungroupedCount,
      total: board.students.filter((student) => !student.groupId).reduce((sum, student) => sum + student.score, 0)
    });
  }

  cards.push(...groupSummaries.map((group) => ({
    id: group.id,
    name: group.name,
    count: group.count,
    total: group.total
  })));

  ui.groupList.innerHTML = cards
    .map((group) => {
      const groupStyle = getGroupStyleAttribute(board, group.id);
      const leaderName = group.id === GROUP_FILTER_ALL || group.id === GROUP_FILTER_UNGROUPED
        ? ''
        : (getGroupLeader(board, group.id)?.name || '未设组长');

      return `
      <button class="group-card ${group.id === activeGroupFilter ? 'active' : ''} ${group.id && group.id !== GROUP_FILTER_ALL && group.id !== GROUP_FILTER_UNGROUPED ? 'group-card-colored' : ''}" type="button" data-group-filter="${group.id}" ${groupStyle}>
        <div class="group-card-main">
          <strong>${escapeHtml(group.name)}</strong>
          <small>${group.count} 人${leaderName ? ` · 组长 ${escapeHtml(leaderName)}` : ''}</small>
        </div>
        <span class="group-score ${scoreTone(group.total)}">${formatSignedScore(group.total)}</span>
      </button>
    `;
    })
    .join('');

  ui.groupHint.textContent = board.groups.length > 0
    ? `当前已创建 ${board.groups.length} 个小组，点击卡片可筛选学生，使用“管理小组”可新建、重命名、设置组长或移动成员。`
    : '当前面板还没有小组，请通过“批量分组”或“管理小组”来创建。';
}

function renderStudents() {
  const board = getActiveBoard();
  if (!board) {
    return;
  }

  const keyword = ui.studentSearchInput.value.trim();
  const students = getVisibleStudents(board, keyword);

  if (board.students.length === 0) {
    ui.studentList.innerHTML = '<div class="empty-state">当前面板还没有学生，请通过“批量添加”或“添加学生”来创建。</div>';
    return;
  }

  if (students.length === 0) {
    ui.studentList.innerHTML = '<div class="empty-state">没有符合当前筛选条件的学生。</div>';
    return;
  }

  ui.studentList.innerHTML = students
    .map((student) => {
      const latest = student.history[0];
      const checked = checkedStudentIds.has(student.id);
      const groupName = getGroupName(board, student.groupId);
      const isLeader = isGroupLeader(board, student);
      const groupStyle = getGroupStyleAttribute(board, student.groupId);
      const studentMeta = [
        student.studentNo ? `学号 ${student.studentNo}` : '',
        student.seatNo ? `座号 ${student.seatNo}` : '',
        latest ? `最近：${latest.itemName}` : '还没有加减分记录'
      ].filter(Boolean).join(' · ');

      return `
        <article class="student-item ${checked ? 'checked' : ''} ${student.id === selectedStudentId ? 'selected' : ''} ${student.absent ? 'absent' : ''} ${student.groupId ? 'has-group' : ''} ${isLeader ? 'group-leader' : ''}" data-student-id="${student.id}" ${groupStyle}>
          <label class="student-check">
            <input type="checkbox" data-action="toggle-check" data-student-id="${student.id}" ${checked ? 'checked' : ''} />
          </label>
          <button class="student-select" type="button" data-action="select-student" data-student-id="${student.id}">
            <div class="student-main">
              <span class="student-name ${student.groupId ? 'group-colored' : ''} ${isLeader ? 'leader-name' : ''}">${escapeHtml(student.name)}</span>
              <span class="student-meta">${escapeHtml(studentMeta)}</span>
              <div class="student-tag-row">
                <span class="student-group-tag ${student.groupId ? 'group-tag-colored' : ''}">${escapeHtml(groupName)}</span>
                ${isLeader ? '<span class="student-group-tag leader-tag">组长</span>' : ''}
                ${student.absent ? '<span class="student-group-tag absent-tag">缺勤</span>' : ''}
              </div>
            </div>
            <span class="student-score ${scoreTone(student.score)}">${formatSignedScore(student.score)}</span>
          </button>
        </article>
      `;
    })
    .join('');
}

function renderTemplateList(kind) {
  const board = getActiveBoard();
  const host = kind === 'plus' ? ui.plusTemplateList : ui.minusTemplateList;
  const templates = board?.scoreTemplates?.[kind] || [];

  if (templates.length === 0) {
    host.innerHTML = `<div class="empty-state">还没有${kind === 'plus' ? '加分' : '减分'}规则，请点击“规则原因”添加。</div>`;
    return;
  }

  host.innerHTML = templates
    .map((template) => `
      <button class="template-button" type="button" data-action="apply-template" data-kind="${kind}" data-template-id="${template.id}">
        <span class="template-title">${escapeHtml(template.name)}</span>
        <span class="template-value">${kind === 'plus' ? '+' : '-'}${template.value}</span>
      </button>
    `)
    .join('');
}

function renderHistory() {
  const student = getSelectedStudent();
  if (!student) {
    ui.historyList.innerHTML = '<div class="empty-state">选中学生后，这里会显示他的加减分记录。</div>';
    return;
  }

  if (student.history.length === 0) {
    ui.historyList.innerHTML = `<div class="empty-state">${escapeHtml(student.name)} 还没有任何记录。</div>`;
    return;
  }

  ui.historyList.innerHTML = student.history
    .slice(0, 14)
    .map((entry) => `
      <article class="history-item">
        <div class="history-mark ${entry.delta >= 0 ? 'plus' : 'minus'}">${entry.delta >= 0 ? '+' : '-'}</div>
        <div>
          <span class="history-title">${escapeHtml(entry.itemName)}</span>
          <span class="history-meta">${entry.note ? escapeHtml(entry.note) : '无备注'} · ${formatTimestamp(entry.timestamp)}</span>
        </div>
        <span class="history-delta ${entry.delta >= 0 ? 'plus' : 'minus'}">${formatSignedScore(entry.delta)}</span>
      </article>
    `)
    .join('');
}

function renderOverview() {
  const board = getActiveBoard();
  if (!board) {
    return;
  }

  const students = board.students;
  const totalScore = students.reduce((sum, student) => sum + student.score, 0);
  const average = students.length > 0 ? (totalScore / students.length).toFixed(1) : '0.0';
  const groupedCount = students.filter((student) => student.groupId).length;
  const topStudent = buildStudentRanking(board, { includeAbsent: rankingState.includeAbsent })[0]?.name || '暂无';
  const topGroup = getGroupRanking(board, { includeAbsent: rankingState.includeAbsent })[0]?.name || '暂无';

  ui.overviewGrid.innerHTML = [
    { value: students.length, label: '学生人数' },
    { value: board.groups.length, label: '小组数量' },
    { value: checkedStudentIds.size, label: '已勾选人数' },
    { value: groupedCount, label: '已分组人数' },
    { value: average, label: '平均得分' },
    { value: topStudent, label: '当前学生第一名' },
    { value: topGroup, label: '当前小组第一名' },
    { value: formatSignedScore(totalScore), label: '面板总分' }
  ]
    .map((item) => `
      <article class="overview-item">
        <strong>${escapeHtml(String(item.value))}</strong>
        <span>${escapeHtml(item.label)}</span>
      </article>
    `)
    .join('');
}

function renderRankings() {
  const board = getActiveBoard();
  if (!board) {
    return;
  }

  const rankingOptions = { includeAbsent: rankingState.includeAbsent };
  const groupRanking = getGroupRanking(board, rankingOptions);
  const studentRanking = buildStudentRanking(board, rankingOptions);

  ui.groupRankingList.innerHTML = groupRanking.length > 0
    ? groupRanking.slice(0, 5).map((group, index) => renderRankingItem(index + 1, group.name, getRankingCountLabel(group.count), formatSignedScore(group.total))).join('')
    : `<div class="empty-state">${rankingState.includeAbsent ? '当前还没有小组排行榜。' : '当前到场学生还不足以生成小组排行榜。'}</div>`;

  ui.studentRankingList.innerHTML = studentRanking.length > 0
    ? studentRanking.slice(0, 5).map((student, index) => renderRankingItem(index + 1, student.name, student.groupName, formatSignedScore(student.score))).join('')
    : `<div class="empty-state">${rankingState.includeAbsent ? '当前还没有学生排行榜。' : '当前到场学生还不足以生成学生排行榜。'}</div>`;
}

function renderRankingItem(index, name, meta, value) {
  return `
    <article class="ranking-item">
      <span class="ranking-index">${index}</span>
      <div>
        <span class="ranking-name">${escapeHtml(name)}</span>
        <span class="ranking-meta">${escapeHtml(meta)}</span>
      </div>
      <span class="student-score ${scoreTone(Number(value))}">${escapeHtml(value)}</span>
    </article>
  `;
}

function renderRandomCard() {
  syncRandomPickScope();
  const board = getActiveBoard();
  const state = normalizeRandomPickState(board);
  const currentContext = board ? getRandomCandidateContext(board) : null;
  const student = state?.studentId
    ? board.students.find((item) => item.id === state.studentId)
    : null;
  const historyEntries = getRandomHistoryEntries(board, state);
  const previewEntries = historyEntries.slice(0, MAX_RANDOM_HISTORY_PREVIEW);
  const currentScope = currentContext?.scopeLabel || '当前面板全部学生';

  if (!student && !state) {
    ui.randomResultCard.innerHTML = `
      <div>点击上方“随机点名”后，这里会显示抽中的学生。</div>
      <div class="random-meta-row">
        <span class="preview-tag">${escapeHtml(currentScope)}</span>
        ${currentContext?.absentCount ? `<span class="preview-tag">已排除缺勤 ${currentContext.absentCount} 人</span>` : ''}
      </div>
      <div class="random-actions">
        <button class="mini-action" type="button" data-action="reset-random-round">重置本轮</button>
      </div>
    `;
    return;
  }

  ui.randomResultCard.innerHTML = `
    <div class="random-title-row">
      <strong>当前随机结果</strong>
      <span class="preview-tag">${escapeHtml(state?.scopeLabel || currentScope)}</span>
    </div>
    <span class="random-name">${student ? escapeHtml(student.name) : '准备开始'}</span>
    <span class="history-meta">
      ${student
        ? `所属小组：${escapeHtml(getGroupName(board, student.groupId))} · 抽取时间：${formatTimestamp(state.timestamp)}`
        : '当前还没有抽中记录。'}
    </span>
    <div class="random-meta-row">
      <span class="preview-tag">本轮已抽 ${historyEntries.length} 人</span>
      <span class="preview-tag">本轮剩余 ${state?.remainingIds.length || 0} 人</span>
      ${currentContext?.absentCount ? `<span class="preview-tag">已排除缺勤 ${currentContext.absentCount} 人</span>` : ''}
    </div>
    ${previewEntries.length > 0 ? `
      <div class="random-history-strip">
        ${previewEntries.map((entry) => `<span class="random-history-chip">${escapeHtml(entry.student.name)}</span>`).join('')}
      </div>
    ` : ''}
    <div class="random-actions">
      <button class="mini-action" type="button" data-action="show-random-history" ${historyEntries.length === 0 ? 'disabled' : ''}>查看本轮记录</button>
      <button class="mini-action" type="button" data-action="reset-random-round">重置本轮</button>
    </div>
  `;
}

function renderTimers() {
  const stopwatchMs = currentStopwatchMs();
  const countdownMs = currentCountdownMs();
  const countdownPresetSeconds = Math.floor(countdown.totalMs / 1000);
  const countdownFinished = !countdown.running && countdownMs === 0;

  ui.stopwatchDisplay.textContent = formatStopwatch(stopwatchMs);
  ui.stopwatchToggleBtn.textContent = stopwatch.running ? '暂停' : '开始';
  ui.countdownDisplay.textContent = formatCountdown(countdownMs);
  ui.countdownToggleBtn.textContent = countdown.running ? '暂停' : '开始';
  ui.countdownBox.classList.toggle('is-finished', countdownFinished);
  ui.countdownPresetButtons.forEach((button) => {
    const isActive = Number(button.dataset.countdownPreset) === countdownPresetSeconds;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });

  const board = getActiveBoard();
  ui.widgetPreviewGlyph.textContent = board?.name?.slice(0, 1) || '班';
  ui.widgetPreviewText.textContent = countdown.running
    ? `倒计时 ${formatCountdown(countdownMs)}`
    : countdownFinished
      ? '倒计时已结束'
    : stopwatch.running
      ? `计时 ${formatStopwatch(stopwatchMs)}`
      : `${board?.students.length || 0} 人待命`;
}

function renderPresentation() {
  syncRandomPickScope();
  const board = getActiveBoard();
  const rankingOptions = { includeAbsent: rankingState.includeAbsent };
  const studentRanking = board ? buildStudentRanking(board, rankingOptions).slice(0, 8) : [];
  const groupRanking = board ? getGroupRanking(board, rankingOptions).slice(0, 8) : [];
  const pickedStudent = randomPickState && board?.id === randomPickState.boardId
    ? board.students.find((student) => student.id === randomPickState.studentId)
    : null;
  const overlayActive = presentationModeActive || Boolean(document.fullscreenElement);

  ui.presentationOverlay.classList.toggle('active', overlayActive);
  ui.presentationOverlay.setAttribute('aria-hidden', overlayActive ? 'false' : 'true');
  ui.presentationBoardTitle.textContent = board?.name || '当前面板';
  ui.presentationTimeDisplay.textContent = countdown.running
    ? formatCountdown(currentCountdownMs())
    : formatStopwatch(currentStopwatchMs());
  ui.presentationModeLabel.textContent = countdown.running
    ? '课堂倒计时'
    : stopwatch.running
      ? '课堂计时中'
      : `共 ${board?.students.length || 0} 名学生`;
  ui.presentationRandomName.textContent = pickedStudent?.name || '准备开始';
  ui.presentationRandomMeta.textContent = pickedStudent
    ? `所属小组：${getGroupName(board, pickedStudent.groupId)} · 当前总分：${formatSignedScore(pickedStudent.score)} · 本轮剩余 ${normalizeRandomPickState(board)?.remainingIds.length || 0} 人`
    : '点击这张卡片可直接随机点名。';
  ui.presentationGroupRanking.innerHTML = groupRanking.length > 0
    ? groupRanking.map((group, index) => renderPresentationRankingItem(index + 1, group.name, getRankingCountLabel(group.count), formatSignedScore(group.total))).join('')
    : `<div class="empty-state">${rankingState.includeAbsent ? '当前没有小组排行榜。' : '当前到场学生还不足以生成小组排行榜。'}</div>`;
  ui.presentationStudentRanking.innerHTML = studentRanking.length > 0
    ? studentRanking.map((student, index) => renderPresentationRankingItem(index + 1, student.name, student.groupName, formatSignedScore(student.score))).join('')
    : `<div class="empty-state">${rankingState.includeAbsent ? '当前没有学生排行榜。' : '当前到场学生还不足以生成学生排行榜。'}</div>`;
}

function renderPresentationRankingItem(index, name, meta, score) {
  return `
    <article class="presentation-ranking-item">
      <span class="presentation-ranking-index">${index}</span>
      <div>
        <strong>${escapeHtml(name)}</strong>
        <small>${escapeHtml(meta)}</small>
      </div>
      <span class="presentation-ranking-score">${escapeHtml(score)}</span>
    </article>
  `;
}

function renderReasonSuggestions() {
  const board = getActiveBoard();
  if (!board) {
    ui.reasonSuggestions.innerHTML = '';
    return;
  }

  const options = [...board.scoreTemplates.plus, ...board.scoreTemplates.minus]
    .map((item) => item.name)
    .filter((value, index, list) => value && list.indexOf(value) === index)
    .map((name) => `<option value="${escapeHtml(name)}"></option>`)
    .join('');

  ui.reasonSuggestions.innerHTML = options;
}

function getGroupName(board, groupId) {
  if (!groupId) {
    return '未分组';
  }

  return getGroupById(board, groupId)?.name || '未分组';
}

function getGroupLeader(board, groupId) {
  const group = getGroupById(board, groupId);
  if (!group?.leaderId) {
    return null;
  }

  return board.students.find((student) => student.id === group.leaderId) || null;
}

function isGroupLeader(board, student) {
  if (!board || !student?.groupId) {
    return false;
  }

  return getGroupById(board, student.groupId)?.leaderId === student.id;
}

function compareStudentsForDisplay(board, left, right) {
  if (activeGroupFilter === GROUP_FILTER_ALL) {
    const leftKey = left.groupId ? `0-${getGroupName(board, left.groupId)}` : '1-未分组';
    const rightKey = right.groupId ? `0-${getGroupName(board, right.groupId)}` : '1-未分组';
    if (leftKey !== rightKey) {
      return leftKey.localeCompare(rightKey, 'zh-CN');
    }
  }

  const leftLeader = isGroupLeader(board, left) ? 1 : 0;
  const rightLeader = isGroupLeader(board, right) ? 1 : 0;
  if (leftLeader !== rightLeader) {
    return rightLeader - leftLeader;
  }

  return left.name.localeCompare(right.name, 'zh-CN');
}

function getOrderedGroupMembers(board, groupId) {
  return getGroupMembers(board, groupId).sort((left, right) => compareStudentsForDisplay(board, left, right));
}

function getSelectedStudent() {
  const board = getActiveBoard();
  return board?.students.find((student) => student.id === selectedStudentId) || null;
}

function getStudentInventoryCount(student, itemId) {
  return Math.max(0, Math.floor(Number(student?.inventory?.[itemId]) || 0));
}

function updateStudentInventory(student, itemId, delta) {
  if (!student || !itemId || !Number.isFinite(Number(delta)) || Number(delta) === 0) {
    return getStudentInventoryCount(student, itemId);
  }

  const nextCount = Math.max(0, getStudentInventoryCount(student, itemId) + Math.floor(Number(delta)));
  if (!student.inventory || typeof student.inventory !== 'object') {
    student.inventory = createEmptyInventory();
  }

  if (nextCount === 0) {
    delete student.inventory[itemId];
  } else {
    student.inventory[itemId] = nextCount;
  }
  return nextCount;
}

function getStudentPets(student) {
  return Array.isArray(student?.petCollection?.pets) ? student.petCollection.pets : [];
}

function getActivePet(student) {
  const pets = getStudentPets(student);
  if (pets.length === 0) {
    return null;
  }

  return pets.find((pet) => pet.id === student.petCollection.activePetId) || pets[0];
}

function setActivePet(student, petId) {
  if (!student?.petCollection) {
    student.petCollection = createDefaultPetCollection();
  }

  if (getStudentPets(student).some((pet) => pet.id === petId)) {
    student.petCollection.activePetId = petId;
  }
}

function getShopItems(board) {
  return [...(board?.shopItems || [])].sort((left, right) => {
    const leftRank = left.effectType === 'pet-egg' ? 0 : left.effectType === 'snack' ? 1 : left.effectType === 'revive' ? 2 : 3;
    const rightRank = right.effectType === 'pet-egg' ? 0 : right.effectType === 'snack' ? 1 : right.effectType === 'revive' ? 2 : 3;
    return leftRank - rightRank || left.cost - right.cost || left.name.localeCompare(right.name, 'zh-CN');
  });
}

function getPetEggShopItem(board) {
  return getShopItems(board).find((item) => item.effectType === 'pet-egg') || null;
}

function getBackpackItems(board, student) {
  return getShopItems(board)
    .map((item) => ({
      ...item,
      count: getStudentInventoryCount(student, item.id)
    }))
    .filter((item) => item.count > 0);
}

function getStudentEggCount(board, student) {
  return getBackpackItems(board, student)
    .filter((item) => item.effectType === 'pet-egg')
    .reduce((sum, item) => sum + item.count, 0);
}

function getFeedableItems(board, student) {
  return getBackpackItems(board, student).filter((item) => item.effectType === 'snack');
}

function getPetLevel(pet) {
  return Math.floor((Math.max(0, Number(pet?.growth) || 0)) / PET_LEVEL_STEP) + 1;
}

function getPetStage(level) {
  if (level >= 8) {
    return '闪耀伙伴';
  }
  if (level >= 5) {
    return '活力伙伴';
  }
  if (level >= 3) {
    return '成长伙伴';
  }
  return '幼年伙伴';
}

function getPetProgress(pet) {
  const growth = Math.max(0, Number(pet?.growth) || 0);
  const progress = growth % PET_LEVEL_STEP;
  return {
    level: getPetLevel(pet),
    current: progress,
    total: PET_LEVEL_STEP,
    ratio: Math.min(1, progress / PET_LEVEL_STEP),
    remaining: PET_LEVEL_STEP - progress
  };
}

function getPetSkill(skillId) {
  return PET_SKILLS.find((skill) => skill.id === skillId) || null;
}

function getSpeciesBattleProfile(speciesId) {
  return PET_SPECIES_BATTLE_PROFILES[speciesId] || PET_SPECIES_BATTLE_PROFILES['cloud-corgi'];
}

function getPetSkillPool(pet) {
  const speciesId = typeof pet === 'string' ? pet : pet?.speciesId;
  return (getSpeciesBattleProfile(speciesId).skillPool || [])
    .map((skillId) => getPetSkill(skillId))
    .filter(Boolean);
}

function getPetDerivedStats(pet) {
  const species = getPetSpecies(pet?.speciesId);
  const rarityProfile = getPetRarityProfile(species.rarity);
  const battleProfile = getSpeciesBattleProfile(species.id);
  const level = getPetLevel(pet);
  const levelOffset = Math.max(0, level - 1);

  const maxHp = Math.round((battleProfile.baseHp + battleProfile.hpGrowth * levelOffset) * rarityProfile.factor);
  const maxMana = Math.round((battleProfile.baseMana + battleProfile.manaGrowth * levelOffset) * rarityProfile.factor);
  const attack = Math.round((battleProfile.baseAttack + battleProfile.attackGrowth * levelOffset) * rarityProfile.factor);
  const defense = Math.round((battleProfile.baseDefense + battleProfile.defenseGrowth * levelOffset) * rarityProfile.factor);

  return {
    species,
    level,
    maxHp,
    maxMana,
    attackMin: Math.max(4, Math.round(attack * 0.82)),
    attackMax: Math.max(6, Math.round(attack * 1.18)),
    defense: defense + Math.max(0, Math.floor(Number(pet?.defenseBuff) || 0)),
    critRate: Math.min(0.45, rarityProfile.critRate + Math.min(0.08, (Number(pet?.bond) || 0) / 1500)),
    dodgeRate: Math.min(0.28, rarityProfile.dodgeRate + Math.min(0.08, Number(pet?.dodgeBuff) || 0))
  };
}

function syncPetVitals(pet, options = {}) {
  if (!pet) {
    return;
  }

  const stats = getPetDerivedStats(pet);
  const previousMaxHp = Math.max(1, Number(options.previousMaxHp) || stats.maxHp);
  const previousMaxMana = Math.max(1, Number(options.previousMaxMana) || stats.maxMana);

  if (options.fill || !pet.vitalsInitialized) {
    pet.currentHp = stats.maxHp;
    pet.currentMana = stats.maxMana;
    pet.vitalsInitialized = true;
    return;
  }

  if (options.revive) {
    pet.currentHp = stats.maxHp;
    pet.currentMana = stats.maxMana;
    pet.defenseBuff = 0;
    pet.dodgeBuff = 0;
    pet.vitalsInitialized = true;
    return;
  }

  if (!Number.isFinite(Number(pet.currentHp))) {
    pet.currentHp = stats.maxHp;
  }

  if (!Number.isFinite(Number(pet.currentMana))) {
    pet.currentMana = stats.maxMana;
  }

  if (options.preserveRatio) {
    pet.currentHp = Math.round((Math.max(0, Number(pet.currentHp) || previousMaxHp) / previousMaxHp) * stats.maxHp);
    pet.currentMana = Math.round((Math.max(0, Number(pet.currentMana) || previousMaxMana) / previousMaxMana) * stats.maxMana);
  }

  pet.currentHp = Math.min(stats.maxHp, Math.max(0, Math.floor(Number(pet.currentHp) || 0)));
  pet.currentMana = Math.min(stats.maxMana, Math.max(0, Math.floor(Number(pet.currentMana) || 0)));
  pet.vitalsInitialized = true;
}

function syncStudentPetCollection(student, options = {}) {
  getStudentPets(student).forEach((pet) => {
    syncPetVitals(pet, options);
  });
}

function isPetDead(pet) {
  return Math.max(0, Number(pet?.currentHp) || 0) <= 0;
}

function adjustPetVitals(pet, deltaHp, deltaMana = 0) {
  const stats = getPetDerivedStats(pet);
  pet.currentHp = Math.min(stats.maxHp, Math.max(0, Math.floor((Number(pet.currentHp) || 0) + deltaHp)));
  pet.currentMana = Math.min(stats.maxMana, Math.max(0, Math.floor((Number(pet.currentMana) || 0) + deltaMana)));
}

function grantPetGrowth(pet, growthGain) {
  if (!pet || growthGain <= 0) {
    return { leveledUp: false, level: getPetLevel(pet) };
  }

  const previousStats = getPetDerivedStats(pet);
  const previousLevel = previousStats.level;
  pet.growth += growthGain;
  syncPetVitals(pet, { previousMaxHp: previousStats.maxHp, previousMaxMana: previousStats.maxMana, preserveRatio: true });
  const nextLevel = getPetLevel(pet);
  if (nextLevel > previousLevel) {
    pet.currentHp = getPetDerivedStats(pet).maxHp;
    pet.currentMana = getPetDerivedStats(pet).maxMana;
  }

  return {
    leveledUp: nextLevel > previousLevel,
    level: nextLevel
  };
}

function getPetSkillStates(pet, student) {
  const petLevel = getPetLevel(pet);
  const learnedSkillIds = new Set(Array.isArray(pet?.learnedSkillIds) ? pet.learnedSkillIds : []);
  const score = Number(student?.score) || 0;
  return getPetSkillPool(pet).map((skill) => ({
    ...skill,
    learned: learnedSkillIds.has(skill.id),
    unlocked: petLevel >= skill.unlockLevel,
    affordable: score >= skill.learnCost
  }));
}

function getPetLearnedSkills(pet) {
  return getPetSkillStates(pet).filter((skill) => skill.learned && skill.unlocked);
}

function getReviveItems(board, student) {
  return getBackpackItems(board, student).filter((item) => item.effectType === 'revive');
}

function reviveActivePet(itemId = '') {
  const board = getActiveBoard();
  const student = getSelectedStudent();
  const pet = getActivePet(student);
  const reviveItems = getReviveItems(board, student);
  const item = (itemId ? reviveItems.find((entry) => entry.id === itemId) : reviveItems[0]) || null;
  if (!board || !student || !pet) {
    showToast('请先选中学生与宠物。');
    return;
  }

  if (!isPetDead(pet)) {
    showToast('宠物当前无需复活。');
    return;
  }

  if (!item || getStudentInventoryCount(student, item.id) <= 0) {
    showToast('背包里没有可用的复活币。');
    return;
  }

  updateStudentInventory(student, item.id, -1);
  syncPetVitals(pet, { revive: true });
  commitState(`${activePetName(student)} 已使用${item.name}复活，状态已回满。`);
  reopenPetHomeLater();
}

function rollPetValue(min, max) {
  const lower = Math.min(min, max);
  const upper = Math.max(min, max);
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

function appendPetBattleLog(session, text, tone = 'neutral') {
  if (!session) {
    return;
  }

  session.log.push({
    id: createId('battle-log'),
    text,
    tone
  });

  if (session.log.length > 14) {
    session.log = session.log.slice(-14);
  }
}

function createBattlePetSnapshot(pet) {
  const snapshot = normalizePet({
    ...pet,
    learnedSkillIds: Array.isArray(pet?.learnedSkillIds) ? [...pet.learnedSkillIds] : []
  });
  snapshot.vitalsInitialized = true;
  syncPetVitals(snapshot);
  return snapshot;
}

function createPetBattleLobby(board, student, pet) {
  return {
    boardId: board.id,
    studentId: student.id,
    petId: pet.id,
    status: 'lobby',
    opponentId: '',
    opponentTemplate: null,
    playerPet: createBattlePetSnapshot(pet),
    opponentPet: null,
    log: [],
    result: null,
    persisted: false
  };
}

function ensurePetBattleState(board, student, pet) {
  if (
    !petBattleState
    || petBattleState.boardId !== board.id
    || petBattleState.studentId !== student.id
    || petBattleState.petId !== pet.id
    || petBattleState.status !== 'active'
  ) {
    petBattleState = createPetBattleLobby(board, student, pet);
  }

  return petBattleState;
}

function getPetBattleStateForRender(board, student, pet) {
  if (
    !petBattleState
    || petBattleState.boardId !== board.id
    || petBattleState.studentId !== student.id
    || petBattleState.petId !== pet.id
  ) {
    petBattleState = createPetBattleLobby(board, student, pet);
  }

  return petBattleState;
}

function getArenaOpponentTemplate(opponentId) {
  return PET_ARENA_OPPONENTS.find((template) => template.id === opponentId) || null;
}

function createArenaPetFromTemplate(template, playerPet) {
  const level = Math.max(1, Math.min(12, getPetLevel(playerPet) + Math.floor(Number(template?.levelOffset) || 0)));
  const arenaPet = normalizePet({
    id: createId('arena-pet'),
    speciesId: template?.speciesId,
    name: template?.name || getPetSpecies(template?.speciesId).name,
    growth: Math.max(0, level - 1) * PET_LEVEL_STEP,
    bond: level * 5,
    learnedSkillIds: getPetSkillPool(template?.speciesId).map((skill) => skill.id),
    defenseBuff: 0,
    dodgeBuff: 0,
    vitalsInitialized: false,
    hatchedAt: Date.now()
  });
  syncPetVitals(arenaPet, { fill: true });
  return arenaPet;
}

function renderQuickScoreButtons(actionName = 'quick-score-delta') {
  return [1, 2, 5, 10, -1, -2, -5, -10]
    .map((delta) => `
      <button
        class="quick-score-pill ${delta > 0 ? 'is-plus' : 'is-minus'}"
        type="button"
        data-action="${actionName}"
        data-delta="${delta}"
      >
        ${formatSignedScore(delta)}
      </button>
    `)
    .join('');
}

function getScoreActionTargets(board, fallbackStudent = getSelectedStudent()) {
  const checkedStudents = getCheckedStudents(board);
  if (checkedStudents.length > 0) {
    return checkedStudents;
  }
  return fallbackStudent ? [fallbackStudent] : [];
}

function applyDirectScoreDelta(delta, label = '', note = '') {
  const board = getActiveBoard();
  const student = getSelectedStudent();
  if (!board) {
    showToast('当前没有可操作的面板。');
    return;
  }

  const normalizedDelta = Math.round(Number(delta) || 0);
  if (!normalizedDelta) {
    return;
  }

  const targets = getScoreActionTargets(board, student);
  if (targets.length === 0) {
    showToast('请先选择一名学生。');
    return;
  }

  const itemName = label.trim() || (normalizedDelta > 0 ? '快速加分' : '快速扣分');
  applyDeltaToStudents(targets, itemName, normalizedDelta, note);
  commitState(
    targets.length > 1
      ? `已为 ${targets.length} 名学生${normalizedDelta > 0 ? '加' : '扣'} ${Math.abs(normalizedDelta)} 分。`
      : `${targets[0].name} 已${normalizedDelta > 0 ? '加' : '扣'} ${Math.abs(normalizedDelta)} 分。`
  );
}

function isPetShopEffectType(effectType) {
  return effectType === 'pet-egg' || effectType === 'snack' || effectType === 'revive';
}

function getPetShopItems(board) {
  return getShopItems(board).filter((item) => isPetShopEffectType(item.effectType));
}

function getScoreShopItems(board) {
  return getShopItems(board).filter((item) => !isPetShopEffectType(item.effectType));
}

function reopenPetShopLater() {
  window.setTimeout(() => {
    if (getSelectedStudent()) {
      openPetShopModal();
    }
  }, 0);
}

function purchaseShopItem(itemId) {
  const board = getActiveBoard();
  const student = getSelectedStudent();
  const item = getScoreShopItems(board).find((shopItem) => shopItem.id === itemId);
  if (!board || !student || !item) {
    showToast('当前学生或商品不存在。');
    return;
  }
  if (item.enabled === false) {
    showToast('该商品当前已下架。');
    return;
  }
  if (student.score < item.cost) {
    showToast('积分不足，无法兑换。');
    return;
  }

  changeStudentScore(student, -item.cost, `积分兑换：${item.name}`, '积分商城');
  updateStudentInventory(student, item.id, 1);
  commitState(`${student.name} 已在积分商城兑换 ${item.name}。`);
  reopenShopLater();
}

function purchasePetShopItem(itemId) {
  const board = getActiveBoard();
  const student = getSelectedStudent();
  const item = getPetShopItems(board).find((shopItem) => shopItem.id === itemId);
  if (!board || !student || !item) {
    showToast('当前学生或宠物商品不存在。');
    return;
  }
  if (item.enabled === false) {
    showToast('该商品当前已下架。');
    return;
  }
  if (student.score < item.cost) {
    showToast('积分不足，无法兑换。');
    return;
  }

  changeStudentScore(student, -item.cost, `宠物兑换：${item.name}`, '宠物商城');
  if (item.effectType === 'pet-egg') {
    if (!student.petCollection || typeof student.petCollection !== 'object') {
      student.petCollection = createDefaultPetCollection();
    }
    student.petCollection.incubatingEggs.push(createIncubatingEgg(item.id));
    commitState(`${student.name} 已兑换 ${item.name}，并直接放入孵化仓。`);
    reopenPetHomeLater();
    return;
  }

  updateStudentInventory(student, item.id, 1);
  commitState(`${student.name} 已在宠物商城兑换 ${item.name}。`);
  reopenPetShopLater();
}

function openShopModal() {
  const board = getActiveBoard();
  const student = getSelectedStudent();
  if (!board || !student) {
    showToast('请先选中学生，再打开积分商城。');
    return;
  }

  openModal({
    title: '积分商城',
    hideSubmit: true,
    cancelText: '关闭',
    html: renderShopModal(board, student),
    onOpen: (body) => {
      const handleClick = (event) => {
        const actionNode = event.target.closest('[data-action]');
        const action = actionNode?.dataset.action;
        const itemId = actionNode?.dataset.itemId || '';
        if (!action) {
          return;
        }

        if (action === 'buy-shop-item') {
          purchaseShopItem(itemId);
          return;
        }
        if (action === 'edit-shop-rules') {
          openShopEditorModal();
          return;
        }
        if (action === 'open-pet-shop') {
          openPetShopModal();
        }
      };

      body.addEventListener('click', handleClick);
      return () => {
        body.removeEventListener('click', handleClick);
      };
    }
  });
}

function renderPetShopModal(board, student) {
  const petItems = getPetShopItems(board);
  const eggItems = petItems.filter((item) => item.effectType === 'pet-egg');
  const supplyItems = petItems.filter((item) => item.effectType !== 'pet-egg');
  const incubatingEggs = getIncubatingEggs(student);
  const pets = getStudentPets(student);

  return `
    <div class="pet-modal-toolbar">
      <button class="mini-action mini-action-green" type="button" data-action="open-pet-home">宠物家园</button>
      <button class="mini-action" type="button" data-action="open-score-shop">积分商城</button>
      <button class="mini-action" type="button" data-action="edit-shop-rules">编辑商城规则</button>
    </div>
    <section class="pet-student-summary">
      <div>
        <p class="card-kicker">宠物商城</p>
        <h3>${escapeHtml(student.name)}</h3>
        <p class="modal-help">宠物蛋会在购买后直接放入孵化仓；零食和复活币会进入宠物背包。</p>
      </div>
      <div class="shop-score-pill ${scoreTone(student.score)}">${formatSignedScore(student.score)}</div>
    </section>
    <section class="modal-panel">
      <h3>孵化与成长</h3>
      <div class="preview-tag-row">
        <span class="preview-tag">宠物 ${pets.length} 只</span>
        <span class="preview-tag">孵化仓 ${incubatingEggs.length} 枚</span>
        <span class="preview-tag">零食 ${getFeedableItems(board, student).reduce((sum, item) => sum + item.count, 0)} 份</span>
        <span class="preview-tag">复活币 ${getReviveItems(board, student).reduce((sum, item) => sum + item.count, 0)} 枚</span>
      </div>
    </section>
    <section class="modal-panel">
      <h3>宠物蛋</h3>
      ${eggItems.length > 0 ? `
        <div class="shop-grid">
          ${eggItems.map((item) => {
            const canBuy = item.enabled !== false && student.score >= item.cost;
            return `
              <article class="shop-card ${item.enabled === false ? 'is-disabled' : ''}">
                <div class="shop-card-top">
                  <span class="shop-card-icon">${escapeHtml(item.icon || getDefaultShopIcon(item.effectType))}</span>
                  <div>
                    <strong>${escapeHtml(item.name)}</strong>
                    <small>${escapeHtml(getShopEffectTypeLabel(item.effectType))} · 默认孵化 7 天</small>
                  </div>
                </div>
                <p class="modal-help">${escapeHtml(item.description || '购买后直接进入孵化仓，可用积分继续加速。')}</p>
                <div class="shop-card-bottom">
                  <div class="preview-tag-row">
                    <span class="preview-tag">需要 ${item.cost} 积分</span>
                    <span class="preview-tag">购买后直接孵化</span>
                  </div>
                  <button class="mini-action ${canBuy ? 'mini-action-orange' : ''}" type="button" data-action="buy-pet-shop-item" data-item-id="${item.id}" ${canBuy ? '' : 'disabled'}>
                    ${item.enabled === false ? '已下架' : student.score < item.cost ? '积分不足' : '兑换并入仓'}
                  </button>
                </div>
              </article>
            `;
          }).join('')}
        </div>
      ` : '<div class="empty-state">当前没有上架宠物蛋商品。</div>'}
    </section>
    <section class="modal-panel">
      <h3>零食与复活</h3>
      ${supplyItems.length > 0 ? `
        <div class="shop-grid">
          ${supplyItems.map((item) => {
            const ownedCount = getStudentInventoryCount(student, item.id);
            const canBuy = item.enabled !== false && student.score >= item.cost;
            return `
              <article class="shop-card ${item.enabled === false ? 'is-disabled' : ''}">
                <div class="shop-card-top">
                  <span class="shop-card-icon">${escapeHtml(item.icon || getDefaultShopIcon(item.effectType))}</span>
                  <div>
                    <strong>${escapeHtml(item.name)}</strong>
                    <small>${escapeHtml(getShopEffectTypeLabel(item.effectType))}${item.effectType === 'snack' ? ` · 成长 +${item.growthGain}` : ''}</small>
                  </div>
                </div>
                <p class="modal-help">${escapeHtml(item.description || '兑换后进入宠物背包。')}</p>
                <div class="shop-card-bottom">
                  <div class="preview-tag-row">
                    <span class="preview-tag">需要 ${item.cost} 积分</span>
                    <span class="preview-tag">已拥有 ${ownedCount}</span>
                  </div>
                  <button class="mini-action ${canBuy ? 'mini-action-orange' : ''}" type="button" data-action="buy-pet-shop-item" data-item-id="${item.id}" ${canBuy ? '' : 'disabled'}>
                    ${item.enabled === false ? '已下架' : student.score < item.cost ? '积分不足' : '兑换到背包'}
                  </button>
                </div>
              </article>
            `;
          }).join('')}
        </div>
      ` : '<div class="empty-state">当前没有上架宠物补给商品。</div>'}
    </section>
  `;
}

function openPetShopModal() {
  const board = getActiveBoard();
  const student = getSelectedStudent();
  if (!board || !student) {
    showToast('请先选中学生，再打开宠物商城。');
    return;
  }

  openModal({
    title: '宠物商城',
    hideSubmit: true,
    cancelText: '关闭',
    html: renderPetShopModal(board, student),
    onOpen: (body) => {
      const handleClick = (event) => {
        const actionNode = event.target.closest('[data-action]');
        const action = actionNode?.dataset.action;
        const itemId = actionNode?.dataset.itemId || '';
        if (!action) {
          return;
        }

        if (action === 'buy-pet-shop-item') {
          purchasePetShopItem(itemId);
          return;
        }
        if (action === 'open-pet-home') {
          openPetHomeModal();
          return;
        }
        if (action === 'open-score-shop') {
          openShopModal();
          return;
        }
        if (action === 'edit-shop-rules') {
          openShopEditorModal();
        }
      };

      body.addEventListener('click', handleClick);
      return () => {
        body.removeEventListener('click', handleClick);
      };
    }
  });
}

function renderIncubatingEggCards(student) {
  return getIncubatingEggs(student).map((egg) => {
    const species = getPetSpecies(egg.speciesId);
    const remainingMs = getEggRemainingMs(egg);
    const ready = remainingMs <= 0;
    const remainingHours = Math.max(1, Math.ceil(remainingMs / PET_EGG_ACCELERATION_HOUR_MS));
    const maxAffordableHours = Math.min(remainingHours, Math.max(0, student.score));
    const quickHours = [...new Set([1, 6, 24].filter((value) => value < remainingHours))];
    return `
      <article class="shop-card" ${getPetThemeStyleAttribute(species.id)}>
        <div class="shop-card-top">
          <span class="shop-card-icon">🥚</span>
          <div>
            <strong>${escapeHtml(species.name)}</strong>
            <small>${ready ? '已完成孵化' : `剩余 ${formatDurationCompact(remainingMs)}`}</small>
          </div>
        </div>
        <p class="modal-help">${ready ? '可以立即破壳领取宠物。' : `默认孵化 7 天，可用积分按 1 分 = 1 小时加速。当前稀有标签：${escapeHtml(species.rarity)}`}</p>
        <div class="preview-tag-row">
          <span class="preview-tag">${escapeHtml(species.rarity)}</span>
          <span class="preview-tag">学生积分 ${formatSignedScore(getSelectedStudent()?.score || 0)}</span>
        </div>
        <div class="timer-actions">
          ${ready
            ? `<button class="mini-action mini-action-green" type="button" data-action="claim-ready-egg" data-egg-id="${egg.id}">立即破壳</button>`
            : `${quickHours.map((hours) => `<button class="mini-action" type="button" data-action="accelerate-egg" data-egg-id="${egg.id}" data-hours="${hours}">加速 ${hours} 小时</button>`).join('')}
               <button class="mini-action mini-action-orange" type="button" data-action="accelerate-egg-max" data-egg-id="${egg.id}" data-hours="${maxAffordableHours}" ${maxAffordableHours > 0 ? '' : 'disabled'}>${maxAffordableHours <= 0 ? '积分不足' : maxAffordableHours >= remainingHours ? '直接完成' : `加速 ${maxAffordableHours} 小时`}</button>`}
        </div>
      </article>
    `;
  }).join('');
}

function pickArenaBattleAction(pet) {
  const skills = getPetLearnedSkills(pet).filter((skill) => pet.currentMana >= skill.manaCost);
  if (skills.length > 0 && Math.random() < 0.58) {
    return {
      type: 'skill',
      skill: skills[Math.floor(Math.random() * skills.length)]
    };
  }

  return {
    type: 'normal',
    skill: null
  };
}

function resolvePetBattleMove(attacker, defender, action) {
  const attackerStats = getPetDerivedStats(attacker);
  const defenderStats = getPetDerivedStats(defender);
  const skill = action?.type === 'skill' ? action.skill : null;
  if (skill && attacker.currentMana < skill.manaCost) {
    return {
      ok: false,
      log: `${attacker.name} 蓝量不足，无法释放 ${skill.name}。`
    };
  }

  if (skill) {
    adjustPetVitals(attacker, 0, -skill.manaCost);
  }

  const actionLabel = skill ? `${attacker.name} 释放了 ${skill.name}` : `${attacker.name} 发动普通攻击`;
  if (Math.random() < Math.min(0.45, defenderStats.dodgeRate)) {
    return {
      ok: true,
      damage: 0,
      crit: false,
      dodged: true,
      log: `${actionLabel}，但被 ${defender.name} 闪避了。`
    };
  }

  const baseMin = skill ? skill.minDamage + Math.round(attackerStats.attackMin * 0.35) : attackerStats.attackMin;
  const baseMax = skill ? skill.maxDamage + Math.round(attackerStats.attackMax * 0.4) : attackerStats.attackMax;
  let damage = Math.max(1, rollPetValue(baseMin, baseMax) - Math.round(defenderStats.defense * 0.45));
  const crit = Math.random() < Math.min(0.6, attackerStats.critRate + Math.max(0, skill?.critBoost || 0));
  if (crit) {
    damage *= 2;
  }

  adjustPetVitals(defender, -damage, -(skill?.manaBurn || 0));

  let heal = 0;
  let restoreMana = 0;
  if (skill?.restoreHpRatio) {
    heal = Math.max(1, Math.round(attackerStats.maxHp * skill.restoreHpRatio));
    adjustPetVitals(attacker, heal, 0);
  }
  if (skill?.restoreMana) {
    restoreMana = skill.restoreMana;
    adjustPetVitals(attacker, 0, restoreMana);
  }
  if (!skill) {
    adjustPetVitals(attacker, 0, 6);
    restoreMana = 6;
  }
  if (skill?.defenseBuff) {
    attacker.defenseBuff = Math.min(18, Math.floor(Number(attacker.defenseBuff) || 0) + skill.defenseBuff);
  }
  if (skill?.dodgeBoost) {
    attacker.dodgeBuff = Math.min(0.24, Number(attacker.dodgeBuff || 0) + skill.dodgeBoost);
  }

  const notes = [`${actionLabel}，造成 ${damage} 点伤害`];
  if (crit) {
    notes.push('触发暴击');
  }
  if (skill?.manaBurn) {
    notes.push(`额外削减 ${defender.name} ${skill.manaBurn} 点蓝量`);
  }
  if (heal > 0) {
    notes.push(`回复 ${heal} 点生命`);
  }
  if (restoreMana > 0) {
    notes.push(`回复 ${restoreMana} 点蓝量`);
  }
  if (skill?.defenseBuff) {
    notes.push(`防御提升 ${skill.defenseBuff}`);
  }
  if (skill?.dodgeBoost) {
    notes.push('闪避提升');
  }
  if (isPetDead(defender)) {
    notes.push(`${defender.name} 已倒下`);
  }

  return {
    ok: true,
    damage,
    crit,
    dodged: false,
    log: `${notes.join('，')}。`
  };
}

function settlePetBattle(outcome) {
  if (!petBattleState || petBattleState.persisted) {
    return;
  }

  const board = getActiveBoard();
  const student = board?.students.find((entry) => entry.id === petBattleState.studentId) || null;
  const pet = getStudentPets(student).find((entry) => entry.id === petBattleState.petId) || null;
  if (!board || !student || !pet) {
    petBattleState = null;
    return;
  }

  pet.currentHp = petBattleState.playerPet.currentHp;
  pet.currentMana = petBattleState.playerPet.currentMana;
  pet.defenseBuff = 0;
  pet.dodgeBuff = 0;
  pet.vitalsInitialized = true;

  let growthResult = {
    leveledUp: false,
    level: getPetLevel(pet)
  };
  if (outcome === 'win') {
    pet.wins += 1;
    growthResult = grantPetGrowth(pet, petBattleState.opponentTemplate?.rewardGrowth || 0);
    if ((petBattleState.opponentTemplate?.rewardCoins || 0) > 0) {
      student.score += petBattleState.opponentTemplate.rewardCoins;
      student.history.unshift(
        createHistoryEntry(`竞技场胜利：${petBattleState.opponentPet?.name || '竞技场对手'}`, petBattleState.opponentTemplate.rewardCoins, '宠物对战')
      );
    }
  } else {
    pet.losses += 1;
  }

  const message = outcome === 'win'
    ? growthResult.leveledUp
      ? `${pet.name} 获胜并升到 Lv.${growthResult.level}。`
      : `${pet.name} 获胜，获得成长值 +${petBattleState.opponentTemplate?.rewardGrowth || 0}。`
    : isPetDead(pet)
      ? `${pet.name} 战败倒下，需使用复活币才能继续出战。`
      : `${pet.name} 本场落败，已记录战绩。`;

  petBattleState.status = outcome;
  petBattleState.result = {
    outcome,
    growthGain: petBattleState.opponentTemplate?.rewardGrowth || 0,
    leveledUp: growthResult.leveledUp,
    level: growthResult.level,
    rewardCoins: petBattleState.opponentTemplate?.rewardCoins || 0
  };
  petBattleState.persisted = true;
  commitState(message);
}

function performPetBattleRound(actionType, skillId = '') {
  if (!petBattleState || petBattleState.status !== 'active') {
    return false;
  }

  const playerAction = actionType === 'skill'
    ? {
        type: 'skill',
        skill: getPetLearnedSkills(petBattleState.playerPet).find((skill) => skill.id === skillId) || null
      }
    : {
        type: 'normal',
        skill: null
      };

  if (actionType === 'skill' && !playerAction.skill) {
    showToast('当前技能不可用。');
    return false;
  }

  const playerResult = resolvePetBattleMove(petBattleState.playerPet, petBattleState.opponentPet, playerAction);
  if (!playerResult.ok) {
    showToast(playerResult.log);
    return false;
  }
  appendPetBattleLog(petBattleState, playerResult.log, 'positive');
  if (isPetDead(petBattleState.opponentPet)) {
    appendPetBattleLog(petBattleState, `${petBattleState.playerPet.name} 赢下了这场对战。`, 'positive');
    settlePetBattle('win');
    return true;
  }

  const enemyAction = pickArenaBattleAction(petBattleState.opponentPet);
  const enemyResult = resolvePetBattleMove(petBattleState.opponentPet, petBattleState.playerPet, enemyAction);
  if (enemyResult.ok) {
    appendPetBattleLog(petBattleState, enemyResult.log, 'negative');
  }
  if (isPetDead(petBattleState.playerPet)) {
    appendPetBattleLog(petBattleState, `${petBattleState.playerPet.name} 倒下了，本场挑战结束。`, 'negative');
    settlePetBattle('loss');
  }

  return true;
}

function getShopEffectTypeLabel(effectType) {
  if (effectType === 'pet-egg') {
    return '宠物蛋';
  }
  if (effectType === 'snack') {
    return '零食';
  }
  if (effectType === 'revive') {
    return '复活币';
  }
  return '道具';
}

function getOwnedItemCount(board, itemId) {
  return (board?.students || []).reduce((sum, student) => sum + getStudentInventoryCount(student, itemId), 0);
}

function pickRandomPetSpecies() {
  const totalWeight = ALL_PET_SPECIES.reduce((sum, species) => sum + species.weight, 0);
  let cursor = Math.random() * totalWeight;

  for (const species of ALL_PET_SPECIES) {
    cursor -= species.weight;
    if (cursor <= 0) {
      return species;
    }
  }

  return ALL_PET_SPECIES[0];
}

function createPetForStudent(student, speciesId) {
  const species = getPetSpecies(speciesId);
  const sameSpeciesCount = getStudentPets(student).filter((pet) => pet.speciesId === species.id).length;
  const pet = {
    id: createId('pet'),
    speciesId: species.id,
    name: sameSpeciesCount === 0 ? species.name : `${species.name}${sameSpeciesCount + 1}`,
    growth: 0,
    feedCount: 0,
    bond: 0,
    wins: 0,
    losses: 0,
    currentHp: 0,
    currentMana: 0,
    learnedSkillIds: [],
    defenseBuff: 0,
    dodgeBuff: 0,
    vitalsInitialized: false,
    hatchedAt: Date.now()
  };
  syncPetVitals(pet, { fill: true });
  return pet;
}

function hatchPetEggForStudent(board, student, eggItemId) {
  if (getStudentInventoryCount(student, eggItemId) <= 0) {
    return null;
  }

  updateStudentInventory(student, eggItemId, -1);
  if (!student.petCollection || typeof student.petCollection !== 'object') {
    student.petCollection = createDefaultPetCollection();
  }

  const species = pickRandomPetSpecies();
  const pet = createPetForStudent(student, species.id);
  student.petCollection.pets.push(pet);
  student.petCollection.activePetId = pet.id;
  return pet;
}

function getCheckedStudents(board) {
  return board.students.filter((student) => checkedStudentIds.has(student.id));
}

function getVisibleStudents(board, keyword = '') {
  const search = keyword.trim();
  return board.students.filter((student) => {
    const groupMatch = activeGroupFilter === GROUP_FILTER_ALL
      ? true
      : activeGroupFilter === GROUP_FILTER_UNGROUPED
        ? !student.groupId
        : student.groupId === activeGroupFilter;

    const keywordMatch = !search
      || student.name.includes(search)
      || (student.studentNo || '').includes(search)
      || (student.seatNo || '').includes(search)
      || (student.note || '').includes(search)
      || getGroupName(board, student.groupId).includes(search);

    return groupMatch && keywordMatch;
  }).sort((left, right) => compareStudentsForDisplay(board, left, right));
}

function getRankableStudents(board, options = {}) {
  const includeAbsent = options.includeAbsent ?? true;
  return [...board.students].filter((student) => includeAbsent || !student.absent);
}

function buildStudentRanking(board, options = {}) {
  return getRankableStudents(board, options)
    .sort((left, right) => right.score - left.score || left.name.localeCompare(right.name, 'zh-CN'))
    .map((student) => ({
      id: student.id,
      name: student.name,
      groupName: getGroupName(board, student.groupId),
      score: student.score,
      absent: Boolean(student.absent)
    }));
}

function getGroupRanking(board, options = {}) {
  const rankableStudents = getRankableStudents(board, options);
  return board.groups
    .map((group) => {
      const members = rankableStudents.filter((student) => student.groupId === group.id);
      return {
        id: group.id,
        name: group.name,
        count: members.length,
        total: members.reduce((sum, student) => sum + student.score, 0),
        average: members.length > 0 ? members.reduce((sum, student) => sum + student.score, 0) / members.length : 0
      };
    })
    .filter((group) => options.includeAbsent ?? true ? true : group.count > 0)
    .sort((left, right) => right.total - left.total || left.name.localeCompare(right.name, 'zh-CN'));
}

function toggleRankingFilter() {
  rankingState.includeAbsent = !rankingState.includeAbsent;
  renderAll();
  syncWidgetState();
  showToast(`排行榜已切换为${getRankingModeLabel()}。`);
}

function getGroupMembers(board, groupId) {
  return board.students.filter((student) => student.groupId === groupId);
}

function createGroup(board, name, options = {}) {
  const group = {
    id: createId('group'),
    name,
    leaderId: ''
  };

  board.groups.push(group);

  const student = options.studentId
    ? board.students.find((item) => item.id === options.studentId)
    : null;

  if (student) {
    student.groupId = group.id;
    if (options.makeLeader) {
      group.leaderId = student.id;
    }
  }

  sanitizeBoardGroups(board);
  return group;
}

function reopenManageGroupsLater() {
  window.setTimeout(() => {
    if (getActiveBoard()) {
      openManageGroupsModal();
    }
  }, 0);
}

function renderManageGroupsModal(board) {
  const checkedStudents = getCheckedStudents(board);
  const rankingMap = new Map(getGroupRanking(board, { includeAbsent: true }).map((group) => [group.id, group]));
  const groups = board.groups
    .map((group) => {
      const ranking = rankingMap.get(group.id) || {
        count: 0,
        total: 0,
        average: 0
      };

      return {
        ...group,
        ...ranking,
        leaderName: getGroupLeader(board, group.id)?.name || '未设置'
      };
    })
    .sort((left, right) => right.total - left.total || left.name.localeCompare(right.name, 'zh-CN'));
  const ungroupedStudents = board.students.filter((student) => !student.groupId);

  return `
    ${buildPreviewTagRow([
      `${groups.length} 个小组`,
      checkedStudents.length > 0 ? `已勾选 ${checkedStudents.length} 人` : '当前未勾选学生'
    ])}
    <div class="manage-group-toolbar">
      <button class="mini-action mini-action-green" type="button" data-action="create-group">新建小组</button>
    </div>
    <div class="manage-group-list">
      ${groups.map((group) => `
        <article class="manage-group-row" ${getGroupStyleAttribute(board, group.id)}>
          <div class="manage-group-main">
            <div class="manage-group-summary">
              <strong>${escapeHtml(group.name)}</strong>
              <small>${group.count} 人 · 总分 ${formatSignedScore(group.total)} · 平均分 ${group.count > 0 ? group.average.toFixed(1) : '0.0'} · 组长 ${escapeHtml(group.leaderName)}</small>
            </div>
            <div class="manage-group-actions">
              <button class="mini-action" type="button" data-action="rename-group" data-group-id="${group.id}">重命名</button>
              <button class="mini-action" type="button" data-action="move-checked-to-group" data-group-id="${group.id}" ${checkedStudents.length === 0 ? 'disabled' : ''}>移动勾选到此组</button>
              <button class="mini-action mini-action-red" type="button" data-action="disband-group" data-group-id="${group.id}">解散</button>
            </div>
          </div>
          <div class="manage-member-list">
            ${getOrderedGroupMembers(board, group.id).map((student) => {
              const isLeader = isGroupLeader(board, student);
              return `
              <article class="manage-member-item ${student.groupId ? 'has-group' : ''}" ${getGroupStyleAttribute(board, student.groupId)}>
                <div>
                  <strong class="manage-member-name ${isLeader ? 'leader-name' : ''}">${escapeHtml(student.name)}</strong>
                  <small>${isLeader ? '小组长 · ' : ''}${escapeHtml(getAttendanceLabel(student))} · ${formatSignedScore(student.score)}</small>
                </div>
                <div class="manage-member-actions">
                  <button class="mini-action ${isLeader ? 'mini-action-red' : 'mini-action-orange'}" type="button" data-action="${isLeader ? 'clear-group-leader' : 'set-group-leader'}" data-student-id="${student.id}" data-group-id="${group.id}">${isLeader ? '取消组长' : '设为组长'}</button>
                  <button class="mini-action" type="button" data-action="move-student" data-student-id="${student.id}">调整分组</button>
                  <button class="mini-action" type="button" data-action="remove-student-from-group" data-student-id="${student.id}" data-group-id="${group.id}">移出本组</button>
                </div>
              </article>
            `;
            }).join('') || '<div class="preview-empty">这个小组当前没有成员。</div>'}
          </div>
        </article>
      `).join('')}
      ${groups.length === 0 ? '<div class="empty-state">当前还没有小组，可以先新建小组，或通过批量分组快速生成。</div>' : ''}
      ${ungroupedStudents.length > 0 ? `
        <article class="manage-group-row ungrouped-section">
          <div class="manage-group-main">
            <div class="manage-group-summary">
              <strong>未分组学生</strong>
              <small>${ungroupedStudents.length} 人</small>
            </div>
          </div>
          <div class="manage-member-list">
            ${ungroupedStudents.map((student) => `
              <article class="manage-member-item">
                <div>
                  <strong>${escapeHtml(student.name)}</strong>
                  <small>${escapeHtml(getAttendanceLabel(student))} · ${formatSignedScore(student.score)}</small>
                </div>
                <div class="manage-member-actions">
                  <button class="mini-action" type="button" data-action="move-student" data-student-id="${student.id}">加入小组</button>
                </div>
              </article>
            `).join('')}
          </div>
        </article>
      ` : ''}
    </div>
  `;
}

function openCreateGroupModal(options = {}) {
  const board = getActiveBoard();
  if (!board) {
    return;
  }

  const student = options.studentId
    ? board.students.find((item) => item.id === options.studentId)
    : null;

  openModal({
    title: '新建小组',
    submitText: '创建小组',
    html: `
      <label class="hero-field">
        <span>小组名称</span>
        <input name="groupName" type="text" maxlength="24" autocomplete="off" placeholder="例如：星火组" />
      </label>
      ${student ? `
        <label class="inline-check">
          <input name="makeLeader" type="checkbox" checked />
          <span>创建后将 ${escapeHtml(student.name)} 设为小组长</span>
        </label>
      ` : ''}
      <p class="modal-help">${student ? `创建后会将 ${student.name} 直接加入新小组。` : '创建后可在管理小组里继续安排成员和设置组长。'}</p>
    `,
    onSubmit: (formData) => {
      const nextName = formData.get('groupName')?.toString().trim() || '';
      if (!nextName) {
        showToast('请输入小组名称。');
        return false;
      }

      if (board.groups.some((group) => group.name === nextName)) {
        showToast('当前面板里已经存在同名小组。');
        return false;
      }

      const group = createGroup(board, nextName, {
        studentId: student?.id || '',
        makeLeader: Boolean(student) && formData.get('makeLeader') === 'on'
      });

      activeGroupFilter = group.id;
      commitState(student
        ? `已创建小组“${group.name}”，并将 ${student.name} 加入该组。`
        : `已创建小组“${group.name}”。`);

      if (options.reopenManageGroups) {
        reopenManageGroupsLater();
      }
    }
  });
}

function openRenameGroupModal(groupId) {
  const board = getActiveBoard();
  const group = board?.groups.find((item) => item.id === groupId);
  if (!board || !group) {
    showToast('目标小组不存在。');
    return;
  }

  openModal({
    title: '重命名小组',
    submitText: '保存名称',
    html: `
      <label class="hero-field">
        <span>小组名称</span>
        <input name="groupName" type="text" maxlength="24" autocomplete="off" value="${escapeHtml(group.name)}" />
      </label>
      <p class="modal-help">当前小组共有 ${getGroupMembers(board, group.id).length} 名学生。</p>
    `,
    onSubmit: (formData) => {
      const nextName = formData.get('groupName')?.toString().trim() || '';
      if (!nextName) {
        showToast('请输入小组名称。');
        return false;
      }

      if (board.groups.some((item) => item.id !== group.id && item.name === nextName)) {
        showToast('当前面板里已经存在同名小组。');
        return false;
      }

      if (nextName === group.name) {
        showToast('小组名称没有变化。');
        return false;
      }

      group.name = nextName;
      commitState(`已将小组重命名为“${group.name}”。`);
      reopenManageGroupsLater();
    }
  });
}

function setGroupLeader(groupId, studentId) {
  const board = getActiveBoard();
  const group = board?.groups.find((item) => item.id === groupId);
  const student = board?.students.find((item) => item.id === studentId);
  if (!board || !group || !student || student.groupId !== groupId) {
    showToast('目标学生或小组不存在。');
    return;
  }

  group.leaderId = student.id;
  commitState(`已将 ${student.name} 设为“${group.name}”的小组长。`);
  reopenManageGroupsLater();
}

function clearGroupLeader(groupId) {
  const board = getActiveBoard();
  const group = board?.groups.find((item) => item.id === groupId);
  if (!board || !group) {
    showToast('目标小组不存在。');
    return;
  }

  if (!group.leaderId) {
    showToast('这个小组当前还没有组长。');
    return;
  }

  const leaderName = getGroupLeader(board, groupId)?.name || '当前组长';
  group.leaderId = '';
  commitState(`已取消“${group.name}”的组长设置（${leaderName}）。`);
  reopenManageGroupsLater();
}

function openDisbandGroupPreview(groupId) {
  const board = getActiveBoard();
  const group = board?.groups.find((item) => item.id === groupId);
  if (!board || !group) {
    showToast('目标小组不存在。');
    return;
  }

  const members = getGroupMembers(board, groupId);
  openActionPreviewModal({
    title: '确认解散小组',
    submitText: '解散小组',
    tags: [group.name, `${members.length} 人`],
    nameListHtml: buildPreviewNameList(members.map((student) => student.name), { title: '解散后将变为未分组的学生' }),
    warningText: '解散后该小组会被删除，原成员会全部转为未分组。',
    onConfirm: async () => {
      board.groups = board.groups.filter((item) => item.id !== groupId);
      board.students.forEach((student) => {
        if (student.groupId === groupId) {
          student.groupId = '';
        }
      });
      if (activeGroupFilter === groupId) {
        activeGroupFilter = GROUP_FILTER_ALL;
      }
      commitState(`已解散小组“${group.name}”。`);
      reopenManageGroupsLater();
    }
  });
}

function openMoveCheckedStudentsToGroupPreview(groupId) {
  const board = getActiveBoard();
  const group = board?.groups.find((item) => item.id === groupId);
  if (!board || !group) {
    showToast('目标小组不存在。');
    return;
  }

  const checkedStudents = getCheckedStudents(board);
  if (checkedStudents.length === 0) {
    showToast('请先勾选要移动的小组成员。');
    return;
  }

  const movableStudents = checkedStudents.filter((student) => student.groupId !== groupId);
  if (movableStudents.length === 0) {
    showToast('已勾选学生已经都在这个小组里。');
    return;
  }

  openActionPreviewModal({
    title: '确认移动勾选学生',
    submitText: '移动到此组',
    tags: [group.name, `${movableStudents.length} 人`],
    nameListHtml: buildPreviewNameList(movableStudents.map((student) => student.name), { title: '即将移动的小组成员' }),
    warningText: '确认后，这些已勾选学生会统一调整到目标小组。',
    onConfirm: async () => {
      movableStudents.forEach((student) => {
        student.groupId = groupId;
      });
      activeGroupFilter = groupId;
      commitState(`已将 ${movableStudents.length} 名学生移动到“${group.name}”。`);
      reopenManageGroupsLater();
    }
  });
}

function openMoveStudentToGroupModal(studentId) {
  const board = getActiveBoard();
  const student = board?.students.find((item) => item.id === studentId);
  if (!board || !student) {
    showToast('目标学生不存在。');
    return;
  }

  if (board.groups.length === 0) {
    openCreateGroupModal({
      studentId: student.id
    });
    return;
  }

  openModal({
    title: `调整 ${student.name} 的小组`,
    submitText: '保存调整',
    html: `
      <label class="hero-field">
        <span>目标小组</span>
        <select name="targetGroupId">
          <option value="">未分组</option>
          ${board.groups.map((group) => `<option value="${group.id}" ${group.id === student.groupId ? 'selected' : ''}>${escapeHtml(group.name)}</option>`).join('')}
          <option value="${GROUP_CREATE_OPTION}">+ 新建小组...</option>
        </select>
      </label>
      <p class="modal-help">当前所在：${escapeHtml(getGroupName(board, student.groupId))}。</p>
    `,
    onSubmit: (formData) => {
      const targetGroupId = formData.get('targetGroupId')?.toString() || '';
      if (targetGroupId === GROUP_CREATE_OPTION) {
        openCreateGroupModal({
          studentId: student.id,
          reopenManageGroups: true
        });
        return false;
      }
      if (targetGroupId === student.groupId) {
        showToast('学生当前已经在这个分组里。');
        return false;
      }

      student.groupId = targetGroupId;
      if (targetGroupId) {
        activeGroupFilter = targetGroupId;
      } else if (activeGroupFilter && activeGroupFilter !== GROUP_FILTER_ALL && activeGroupFilter !== GROUP_FILTER_UNGROUPED) {
        activeGroupFilter = GROUP_FILTER_ALL;
      }
      commitState(`已将 ${student.name} 调整到 ${getGroupName(board, student.groupId)}。`);
      reopenManageGroupsLater();
    }
  });
}

function removeStudentFromGroup(studentId, groupId) {
  const board = getActiveBoard();
  const student = board?.students.find((item) => item.id === studentId);
  const group = board?.groups.find((item) => item.id === groupId);
  if (!board || !student || !group) {
    showToast('目标学生或小组不存在。');
    return;
  }

  if (student.groupId !== groupId) {
    showToast('这名学生当前不在该小组中。');
    return;
  }

  student.groupId = '';
  if (activeGroupFilter === groupId) {
    activeGroupFilter = GROUP_FILTER_ALL;
  }
  commitState(`已将 ${student.name} 移出“${group.name}”。`);
  reopenManageGroupsLater();
}

function openManageGroupsModal() {
  const board = getActiveBoard();
  if (!board) {
    return;
  }

  openModal({
    title: '管理小组',
    hideSubmit: true,
    cancelText: '关闭',
    html: renderManageGroupsModal(board),
    onOpen: (body) => {
      const handleClick = (event) => {
        const actionNode = event.target.closest('[data-action]');
        const action = actionNode?.dataset.action;
        const groupId = actionNode?.dataset.groupId || event.target.closest('[data-group-id]')?.dataset.groupId || '';
        const studentId = actionNode?.dataset.studentId || event.target.closest('[data-student-id]')?.dataset.studentId || '';
        if (!action) {
          return;
        }

        if (action === 'create-group') {
          openCreateGroupModal({ reopenManageGroups: true });
          return;
        }

        if (action === 'rename-group') {
          openRenameGroupModal(groupId);
          return;
        }

        if (action === 'move-checked-to-group') {
          openMoveCheckedStudentsToGroupPreview(groupId);
          return;
        }

        if (action === 'move-student') {
          openMoveStudentToGroupModal(studentId);
          return;
        }

        if (action === 'set-group-leader') {
          setGroupLeader(groupId, studentId);
          return;
        }

        if (action === 'clear-group-leader') {
          clearGroupLeader(groupId);
          return;
        }

        if (action === 'remove-student-from-group') {
          removeStudentFromGroup(studentId, groupId);
          return;
        }

        if (action === 'disband-group') {
          openDisbandGroupPreview(groupId);
        }
      };

      body.addEventListener('click', handleClick);
      return () => {
        body.removeEventListener('click', handleClick);
      };
    }
  });
}

function handleGroupListClick(event) {
  const card = event.target.closest('[data-group-filter]');
  if (!card) {
    return;
  }

  activeGroupFilter = card.dataset.groupFilter;
  renderGroups();
  renderStudents();
  renderRandomCard();
  renderPresentation();
  syncWidgetState();
}

function handleStudentListClick(event) {
  if (event.target.closest('.student-check')) {
    return;
  }

  const item = event.target.closest('.student-item[data-student-id]');
  if (!item) {
    return;
  }

  const studentId = item.dataset.studentId;
  selectedStudentId = studentId;
  if (checkedStudentIds.has(studentId)) {
    checkedStudentIds.delete(studentId);
  } else {
    checkedStudentIds.add(studentId);
  }
  renderHeader();
  renderStudents();
  renderSelectedStudentCard();
  renderHistory();
  renderOverview();
  renderRandomCard();
  renderPresentation();
  syncWidgetState();
}

function handleStudentListChange(event) {
  const checkbox = event.target.closest('[data-action="toggle-check"]');
  if (!checkbox) {
    return;
  }

  selectedStudentId = checkbox.dataset.studentId;
  if (checkbox.checked) {
    checkedStudentIds.add(checkbox.dataset.studentId);
  } else {
    checkedStudentIds.delete(checkbox.dataset.studentId);
  }

  renderHeader();
  renderStudents();
  renderSelectedStudentCard();
  renderOverview();
  renderRandomCard();
  renderPresentation();
  syncWidgetState();
}

function toggleActionPanel() {
  appState.appSettings.quickActionsCollapsed = !appState.appSettings.quickActionsCollapsed;
  appRuntime.setLastCommittedSnapshot(createSnapshot());
  renderHeader();
  scheduleSave();
}

function handleSelectedStudentCardChange(event) {
  if (event.target.id !== 'selectedStudentGroupSelect') {
    return;
  }

  const student = getSelectedStudent();
  if (!student) {
    return;
  }

  if (event.target.value === GROUP_CREATE_OPTION) {
    renderSelectedStudentCard();
    openCreateGroupModal({
      studentId: student.id
    });
    return;
  }

  student.groupId = event.target.value;
  commitState(`${student.name} 已调整到 ${getGroupName(getActiveBoard(), student.groupId)}。`);
}

function handleRandomCardClick(event) {
  const action = event.target.closest('[data-action]')?.dataset.action;
  if (!action) {
    return;
  }

  if (action === 'reset-random-round') {
    resetRandomPickRound();
    return;
  }

  if (action === 'show-random-history') {
    openRandomHistoryModal();
  }
}

function handleTemplateClick(event, kind) {
  const button = event.target.closest('[data-action="apply-template"]');
  if (!button) {
    return;
  }

  const board = getActiveBoard();
  const student = getSelectedStudent();
  if (!board || !student) {
    showToast('请先选择一名学生。');
    return;
  }

  const template = board.scoreTemplates[kind].find((item) => item.id === button.dataset.templateId);
  if (!template) {
    return;
  }

  const checkedStudents = getCheckedStudents(board);
  const targetStudents = checkedStudents.length > 0 ? checkedStudents : [student];
  const delta = kind === 'plus' ? template.value : -template.value;

  applyDeltaToStudents(targetStudents, template.name, delta, '');
  commitState(
    targetStudents.length > 1
      ? `已为 ${targetStudents.length} 名已勾选学生应用“${template.name}”。`
      : `${student.name} 已应用“${template.name}”。`
  );
}

function clearCurrentStudentHistory() {
  const student = getSelectedStudent();
  if (!student) {
    showToast('请先选择一名学生。');
    return;
  }

  openActionPreviewModal({
    title: '确认清空学生记录',
    submitText: '清空记录',
    summaryBlocks: [
      {
        title: student.name,
        html: `<p class="preview-empty">当前共有 ${student.history.length} 条记录，这些记录会被直接清空。</p>`
      }
    ],
    warningText: '清空前会自动创建保护点，避免误删记录。',
    onConfirm: async () => {
      await createProtectionPoint(`清空学生记录前 · ${student.name}`);
      student.history = [];
      commitState(`${student.name} 的记录已清空。`);
    }
  });
}

function createHistoryEntry(itemName, delta, note = '') {
  return {
    id: createId('entry'),
    itemName,
    delta,
    note,
    timestamp: Date.now()
  };
}

function openCreateBoardModal() {
  const nextIndex = appState.boards.length + 1;
  openModal({
    title: '创建新面板',
    submitText: '创建面板',
    html: `
      <label class="hero-field">
        <span>面板名称</span>
        <input name="boardName" type="text" maxlength="24" autocomplete="off" placeholder="例如：新面板 ${nextIndex}" />
      </label>
      <p class="modal-help">新面板会沿用当前面板的规则原因和分值步进设置，学生名单和小组将从空白开始。</p>
    `,
    onSubmit: (formData) => {
      const boardName = formData.get('boardName')?.toString().trim() || generateBoardName();
      const currentBoard = getActiveBoard();
      const board = createDefaultBoard(boardName);
      if (currentBoard) {
        board.scoreTemplates = {
          plus: cloneTemplates(currentBoard.scoreTemplates.plus),
          minus: cloneTemplates(currentBoard.scoreTemplates.minus)
        };
        board.settings.stepValue = currentBoard.settings.stepValue;
      }

      appState.boards.push(board);
      appState.activeBoardId = board.id;
      syncSelectionForActiveBoard({ preferFirstStudent: true, resetGroupFilter: true });
      commitState(`已创建面板“${board.name}”。`);
    }
  });
}

function generateBoardName() {
  return `新面板 ${appState.boards.length + 1}`;
}

function getDefaultShopIcon(effectType) {
  if (effectType === 'pet-egg') {
    return '🥚';
  }
  if (effectType === 'snack') {
    return '🍪';
  }
  if (effectType === 'revive') {
    return '🪙';
  }
  return '🎁';
}

function getPetThemeStyleAttribute(speciesId) {
  const species = getPetSpecies(speciesId);
  return `style="--pet-accent:${species.accent};--pet-accent-soft:${species.accentSoft};--pet-accent-strong:${species.accentStrong};--pet-glow:${species.glow};"`;
}

function renderPetSpeciesShowcase() {
  return `
    <div class="pet-showcase-grid">
      ${ALL_PET_SPECIES.map((species) => `
        <article class="pet-species-card" ${getPetThemeStyleAttribute(species.id)}>
          ${renderPetAvatarMarkup(species.id, species.name)}
          <strong>${escapeHtml(species.name)}</strong>
          <small>${escapeHtml(species.rarity)} · ${escapeHtml(species.description)}</small>
        </article>
      `).join('')}
    </div>
  `;
}

function renderShopModal(board, student) {
  const pets = getStudentPets(student);
  const eggCount = getStudentEggCount(board, student);
  const shopItems = getShopItems(board);

  return `
    <div class="pet-modal-toolbar">
      <button class="mini-action mini-action-green" type="button" data-action="open-pet-home">宠物家园</button>
      <button class="mini-action" type="button" data-action="edit-shop-rules">编辑商城规则</button>
    </div>
    <section class="pet-student-summary">
      <div>
        <p class="card-kicker">当前学生</p>
        <h3>${escapeHtml(student.name)}</h3>
        <p class="modal-help">当前积分 ${formatSignedScore(student.score)} · 已拥有 ${pets.length} 只宠物 · 宠物蛋 ${eggCount} 枚</p>
      </div>
      <div class="shop-score-pill ${scoreTone(student.score)}">${formatSignedScore(student.score)}</div>
    </section>
    <div class="shop-grid">
      ${shopItems.map((item) => {
        const ownedCount = getStudentInventoryCount(student, item.id);
        const canBuy = item.enabled !== false && student.score >= item.cost;
        return `
          <article class="shop-card ${item.enabled === false ? 'is-disabled' : ''}">
            <div class="shop-card-top">
              <span class="shop-card-icon">${escapeHtml(item.icon || getDefaultShopIcon(item.effectType))}</span>
              <div>
                <strong>${escapeHtml(item.name)}</strong>
                <small>${escapeHtml(getShopEffectTypeLabel(item.effectType))}${item.effectType === 'snack' ? ` · 成长 +${item.growthGain}` : ''}</small>
              </div>
            </div>
            <p class="modal-help">${escapeHtml(item.description || '可在积分商城中兑换。')}</p>
            <div class="shop-card-bottom">
              <div class="preview-tag-row">
                <span class="preview-tag">需要 ${item.cost} 积分</span>
                <span class="preview-tag">已拥有 ${ownedCount}</span>
              </div>
              <button class="mini-action ${canBuy ? 'mini-action-orange' : ''}" type="button" data-action="buy-shop-item" data-item-id="${item.id}" ${canBuy ? '' : 'disabled'}>
                ${item.enabled === false ? '已下架' : student.score < item.cost ? '积分不足' : '立即兑换'}
              </button>
            </div>
          </article>
        `;
      }).join('')}
    </div>
  `;
}

function renderShopEditorModal(board) {
  return `
    <div class="pet-modal-toolbar">
      <button class="mini-action mini-action-green" type="button" data-action="create-shop-item">新增商品</button>
      <button class="mini-action" type="button" data-action="reset-shop-rules">恢复默认规则</button>
      <button class="mini-action" type="button" data-action="open-shop">返回商城</button>
    </div>
    <div class="shop-editor-list">
      ${getShopItems(board).map((item) => `
        <article class="shop-editor-card ${item.enabled === false ? 'is-disabled' : ''}">
          <div class="shop-editor-head">
            <div>
              <strong>${escapeHtml(item.icon || getDefaultShopIcon(item.effectType))} ${escapeHtml(item.name)}</strong>
              <small>${escapeHtml(getShopEffectTypeLabel(item.effectType))} · ${item.cost} 积分${item.effectType === 'snack' ? ` · 成长 +${item.growthGain}` : ''}</small>
            </div>
            <div class="manage-member-actions">
              <button class="mini-action" type="button" data-action="edit-shop-item" data-item-id="${item.id}">编辑</button>
              <button class="mini-action mini-action-red" type="button" data-action="delete-shop-item" data-item-id="${item.id}">删除</button>
            </div>
          </div>
          <p class="modal-help">${escapeHtml(item.description || '暂无说明')}</p>
          <div class="preview-tag-row">
            <span class="preview-tag">${item.enabled === false ? '已下架' : '上架中'}</span>
            <span class="preview-tag">全班持有 ${getOwnedItemCount(board, item.id)}</span>
          </div>
        </article>
      `).join('')}
    </div>
  `;
}

function reopenPetHomeLater() {
  window.setTimeout(() => {
    if (getSelectedStudent()) {
      openPetHomeModal();
    }
  }, 0);
}

function reopenShopLater() {
  window.setTimeout(() => {
    if (getSelectedStudent()) {
      openShopModal();
    }
  }, 0);
}

function reopenShopEditorLater() {
  window.setTimeout(() => {
    if (getActiveBoard()) {
      openShopEditorModal();
    }
  }, 0);
}

function activePetName(student) {
  return getActivePet(student)?.name || '宠物';
}

function openRenameActivePetModal() {
  const student = getSelectedStudent();
  const pet = getActivePet(student);
  if (!student || !pet) {
    showToast('当前没有可重命名的宠物。');
    return;
  }

  openModal({
    title: '重命名宠物',
    submitText: '保存名字',
    html: `
      <label class="hero-field">
        <span>宠物名字</span>
        <input name="petName" type="text" maxlength="24" autocomplete="off" value="${escapeHtml(pet.name)}" />
      </label>
      <p class="modal-help">当前宠物：${escapeHtml(getPetSpecies(pet.speciesId).name)}</p>
    `,
    onSubmit: (formData) => {
      const petName = formData.get('petName')?.toString().trim() || '';
      if (!petName) {
        showToast('请输入宠物名字。');
        return false;
      }

      pet.name = petName;
      commitState(`已将宠物改名为 ${petName}。`);
      reopenPetHomeLater();
    }
  });
}

function openShopItemEditorModal(itemId = '') {
  const board = getActiveBoard();
  const item = board?.shopItems.find((shopItem) => shopItem.id === itemId) || null;
  if (!board) {
    return;
  }

  openModal({
    title: item ? '编辑商城商品' : '新增商城商品',
    submitText: item ? '保存商品' : '创建商品',
    html: `
      <div class="modal-grid">
        <label class="hero-field">
          <span>商品名称</span>
          <input name="itemName" type="text" maxlength="24" autocomplete="off" value="${escapeHtml(item?.name || '')}" />
        </label>
        <label class="hero-field">
          <span>图标</span>
          <input name="itemIcon" type="text" maxlength="4" autocomplete="off" value="${escapeHtml(item?.icon || '')}" placeholder="${escapeHtml(getDefaultShopIcon(item?.effectType || 'collectible'))}" />
        </label>
        <label class="hero-field">
          <span>积分价格</span>
          <input name="itemCost" type="number" min="1" max="9999" value="${item?.cost || 10}" />
        </label>
        <label class="hero-field">
          <span>商品类型</span>
          <select name="effectType">
            ${SHOP_ITEM_EFFECT_TYPES.map((effectType) => `<option value="${effectType}" ${(item?.effectType || 'collectible') === effectType ? 'selected' : ''}>${escapeHtml(getShopEffectTypeLabel(effectType))}</option>`).join('')}
          </select>
        </label>
        <label class="hero-field">
          <span>成长值加成</span>
          <input name="growthGain" type="number" min="0" max="500" value="${item?.growthGain || 0}" />
        </label>
        <label class="inline-check">
          <input name="itemEnabled" type="checkbox" ${item?.enabled === false ? '' : 'checked'} />
          <span>商品上架</span>
        </label>
      </div>
      <label class="hero-field">
        <span>说明</span>
        <textarea name="itemDescription" rows="4">${escapeTextarea(item?.description || '')}</textarea>
      </label>
      <p class="modal-help">说明：宠物蛋用于孵化随机宠物；零食用于喂养成长；道具会进入背包，预留给后续装扮或任务系统。</p>
    `,
    onSubmit: (formData) => {
      const itemName = formData.get('itemName')?.toString().trim() || '';
      const effectType = formData.get('effectType')?.toString() || 'collectible';
      const itemCost = Math.max(1, Math.floor(Number(formData.get('itemCost')) || 0));
      const growthGain = effectType === 'snack' ? Math.max(0, Math.floor(Number(formData.get('growthGain')) || 0)) : 0;
      const icon = formData.get('itemIcon')?.toString().trim() || getDefaultShopIcon(effectType);
      const description = formData.get('itemDescription')?.toString().trim() || '';
      const enabled = formData.get('itemEnabled') === 'on';

      if (!itemName) {
        showToast('请输入商品名称。');
        return false;
      }

      if (!SHOP_ITEM_EFFECT_TYPES.includes(effectType)) {
        showToast('商品类型无效。');
        return false;
      }

      if (effectType === 'snack' && growthGain <= 0) {
        showToast('零食类商品需要填写大于 0 的成长值。');
        return false;
      }

      const draft = {
        id: item?.id || createId('shop-item'),
        name: itemName,
        cost: itemCost,
        icon,
        effectType,
        growthGain,
        description,
        enabled
      };

      const otherItems = board.shopItems.filter((shopItem) => shopItem.id !== draft.id);
      if (draft.effectType !== 'pet-egg' && !otherItems.some((shopItem) => shopItem.effectType === 'pet-egg')) {
        showToast('商城里至少需要保留一个宠物蛋商品。');
        return false;
      }

      if (item) {
        Object.assign(item, draft);
      } else {
        board.shopItems.push(draft);
      }

      commitState(`${itemName} 的兑换规则已保存。`);
      reopenShopEditorLater();
    }
  });
}

function openDeleteShopItemPreview(itemId) {
  const board = getActiveBoard();
  const item = board?.shopItems.find((shopItem) => shopItem.id === itemId);
  if (!board || !item) {
    showToast('目标商品不存在。');
    return;
  }

  if (item.effectType === 'pet-egg' && board.shopItems.filter((shopItem) => shopItem.effectType === 'pet-egg').length === 1) {
    showToast('至少保留一个宠物蛋商品。');
    return;
  }

  if (getOwnedItemCount(board, item.id) > 0) {
    showToast('已有学生持有这个商品，暂时不能直接删除。');
    return;
  }

  openActionPreviewModal({
    title: '确认删除商城商品',
    submitText: '删除商品',
    tags: [item.name, `${item.cost} 积分`, getShopEffectTypeLabel(item.effectType)],
    warningText: '删除后，该商品会从当前面板的积分商城中移除。',
    onConfirm: async () => {
      board.shopItems = board.shopItems.filter((shopItem) => shopItem.id !== item.id);
      commitState(`已删除商城商品 ${item.name}。`);
      reopenShopEditorLater();
    }
  });
}

function resetShopRules() {
  const board = getActiveBoard();
  if (!board) {
    return;
  }

  const preservedItems = board.shopItems.filter((item) => {
    const isDefault = DEFAULT_SHOP_ITEMS.some((defaultItem) => defaultItem.id === item.id);
    return !isDefault && getOwnedItemCount(board, item.id) > 0;
  });

  openActionPreviewModal({
    title: '恢复默认商城规则',
    submitText: '恢复默认规则',
    warningText: preservedItems.length > 0
      ? '有学生已经持有的自定义商品会被保留，其余商品将恢复为默认配置。'
      : '当前面板的商城规则会恢复成默认配置。',
    onConfirm: async () => {
      board.shopItems = [
        ...cloneShopItems(DEFAULT_SHOP_ITEMS),
        ...cloneShopItems(preservedItems)
      ];
      commitState('积分商城规则已恢复为默认配置。');
      reopenShopEditorLater();
    }
  });
}

function openShopEditorModal() {
  const board = getActiveBoard();
  if (!board) {
    return;
  }

  openModal({
    title: '编辑商城规则',
    hideSubmit: true,
    cancelText: '关闭',
    html: renderShopEditorModal(board),
    onOpen: (body) => {
      const handleClick = (event) => {
        const actionNode = event.target.closest('[data-action]');
        const action = actionNode?.dataset.action;
        const itemId = actionNode?.dataset.itemId || '';
        if (!action) {
          return;
        }

        if (action === 'create-shop-item') {
          openShopItemEditorModal();
          return;
        }

        if (action === 'edit-shop-item') {
          openShopItemEditorModal(itemId);
          return;
        }

        if (action === 'delete-shop-item') {
          openDeleteShopItemPreview(itemId);
          return;
        }

        if (action === 'reset-shop-rules') {
          resetShopRules();
          return;
        }

        if (action === 'open-shop') {
          openShopModal();
        }
      };

      body.addEventListener('click', handleClick);
      return () => {
        body.removeEventListener('click', handleClick);
      };
    }
  });
}

function deleteCurrentBoard() {
  const board = getActiveBoard();
  if (!board) {
    return;
  }

  openActionPreviewModal({
    title: '确认删除当前面板',
    submitText: appState.boards.length === 1 ? '重置为空白面板' : '删除这个面板',
    summaryBlocks: [
      {
        title: board.name,
        html: `<p class="preview-empty">当前面板包含 ${board.students.length} 名学生、${board.groups.length} 个小组和 ${board.students.reduce((sum, student) => sum + student.history.length, 0)} 条记录。</p>`
      }
    ],
    warningText: '删除前会自动创建保护点。如果当前只剩一个面板，系统会改为重置为空白面板。',
    onConfirm: async () => {
      await createProtectionPoint(`删除面板前 · ${board.name}`);

      if (appState.boards.length === 1) {
        const resetBoard = createDefaultBoard('新面板 1');
        appState.boards = [resetBoard];
        appState.activeBoardId = resetBoard.id;
        checkedStudentIds.clear();
        randomPickState = null;
        syncSelectionForActiveBoard({ preferFirstStudent: true, resetGroupFilter: true });
        commitState('当前只剩一个面板，已重置为空白面板。');
        return;
      }

      appState.boards = appState.boards.filter((item) => item.id !== board.id);
      appState.activeBoardId = appState.boards[0].id;
      checkedStudentIds.clear();
      randomPickState = null;
      syncSelectionForActiveBoard({ preferFirstStudent: true, resetGroupFilter: true });
      commitState(`已删除面板“${board.name}”。`);
    }
  });
}

async function importBackup() {
  const result = await window.classScore.importBackup();
  if (result.canceled) {
    return;
  }

  const nextState = normalizeRootState(result.payload);
  const summary = summarizeRootState(nextState);

  openActionPreviewModal({
    title: '确认导入并覆盖当前数据',
    submitText: '导入并恢复',
    submitClassName: 'mini-action mini-action-orange',
    tags: [
      `${summary.boardCount} 个面板`,
      `${summary.studentCount} 名学生`,
      `${summary.groupCount} 个小组`
    ],
    summaryBlocks: [
      {
        title: '即将导入的备份',
        html: `<p class="preview-empty">${escapeHtml(result.filePath || '本地备份文件')}</p>`
      }
    ],
    warningText: '导入前会自动为当前课堂创建保护点，导入后当前数据会被新的备份内容覆盖。',
    onConfirm: async () => {
      await createProtectionPoint(`导入备份前 · ${getActiveBoard()?.name || '当前课堂'}`);
      appState = nextState;
      checkedStudentIds.clear();
      randomPickState = null;
      selectedStudentId = '';
      activeGroupFilter = GROUP_FILTER_ALL;
      resetRuntimeToolsFromState();
      syncSelectionForActiveBoard({ preferFirstStudent: true, resetGroupFilter: true });
      commitState('备份已导入并恢复。');
    }
  });
}

async function exportBackup() {
  const result = await window.classScore.exportBackup(serializeState());
  if (result.canceled) {
    return;
  }

  showToast(`备份已导出到：${result.filePath}`);
}

function cycleStepValue() {
  const board = getActiveBoard();
  if (!board) {
    return;
  }

  const currentIndex = STEP_OPTIONS.indexOf(board.settings.stepValue);
  board.settings.stepValue = STEP_OPTIONS[(currentIndex + 1) % STEP_OPTIONS.length];
  commitState(`当前分值步进已切换为 ${board.settings.stepValue} 分。`);
}

function openRulesModal() {
  const board = getActiveBoard();
  if (!board) {
    return;
  }

  openModal({
    title: '编辑规则原因',
    submitText: '保存规则',
    html: `
      <div class="modal-grid">
        <section class="modal-panel">
          <h3>加分原因</h3>
          <p class="modal-help">每行一条规则，格式：原因,分值</p>
          <textarea name="plusRules">${escapeTextarea(board.scoreTemplates.plus.map((item) => `${item.name},${item.value}`).join('\n'))}</textarea>
        </section>
        <section class="modal-panel">
          <h3>减分原因</h3>
          <p class="modal-help">每行一条规则，格式：原因,分值</p>
          <textarea name="minusRules">${escapeTextarea(board.scoreTemplates.minus.map((item) => `${item.name},${item.value}`).join('\n'))}</textarea>
        </section>
      </div>
      <p class="modal-help">保存后会立即更新当前面板的加分项和减分项。</p>
    `,
    onSubmit: (formData) => {
      board.scoreTemplates.plus = parseTemplatesFromText(formData.get('plusRules')?.toString() || '', DEFAULT_PLUS_TEMPLATES);
      board.scoreTemplates.minus = parseTemplatesFromText(formData.get('minusRules')?.toString() || '', DEFAULT_MINUS_TEMPLATES);
      commitState('规则原因已更新。');
    }
  });
}

function parseTemplatesFromText(text, fallback) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const templates = lines
    .map((line) => {
      const parts = line.split(/[,，]/).map((part) => part.trim()).filter(Boolean);
      if (parts.length === 0) {
        return null;
      }

      return {
        id: createId('template'),
        name: parts[0],
        value: Math.max(1, Math.abs(Math.floor(Number(parts[1]) || 1)))
      };
    })
    .filter(Boolean);

  return templates.length > 0 ? templates : cloneTemplates(fallback);
}

function clearCurrentBoard() {
  const board = getActiveBoard();
  if (!board) {
    return;
  }

  openActionPreviewModal({
    title: '确认清空当前面板',
    submitText: '清空面板',
    summaryBlocks: [
      {
        title: board.name,
        html: `<p class="preview-empty">将清空 ${board.students.length} 名学生、${board.groups.length} 个小组和全部加减分记录。</p>`
      }
    ],
    warningText: '清空前会自动创建保护点，当前面板会保留名称和规则设置。',
    onConfirm: async () => {
      await createProtectionPoint(`清空面板前 · ${board.name}`);
      board.students = [];
      board.groups = [];
      selectedStudentId = '';
      activeGroupFilter = GROUP_FILTER_ALL;
      checkedStudentIds.clear();
      randomPickState = null;
      commitState(`已清空面板“${board.name}”。`);
    }
  });
}

function resetCurrentBoardScores() {
  const board = getActiveBoard();
  if (!board || board.students.length === 0) {
    showToast('当前面板还没有学生。');
    return;
  }

  openActionPreviewModal({
    title: '确认全部清零',
    submitText: '确认全部清零',
    summaryBlocks: [
      {
        title: board.name,
        html: `<p class="preview-empty">将把 ${board.students.length} 名学生的总分归零，并写入一条“全部清零”记录。</p>`
      }
    ],
    warningText: '清零前会自动创建保护点，便于整班回退。',
    onConfirm: async () => {
      await createProtectionPoint(`全部清零前 · ${board.name}`);
      board.students.forEach((student) => {
        student.score = 0;
        student.history.unshift(createHistoryEntry('全部清零', 0, '面板操作'));
        student.history = student.history.slice(0, 300);
      });

      commitState(`“${board.name}”中的所有学生总分已归零。`);
    }
  });
}

function deleteSelectedStudents() {
  const board = getActiveBoard();
  if (!board) {
    return;
  }

  const targetIds = checkedStudentIds.size > 0
    ? [...checkedStudentIds]
    : (selectedStudentId ? [selectedStudentId] : []);

  if (targetIds.length === 0) {
    showToast('请先勾选学生，或至少选中一名学生。');
    return;
  }

  const names = board.students.filter((student) => targetIds.includes(student.id)).map((student) => student.name);
  openActionPreviewModal({
    title: '确认删除学生',
    submitText: `删除 ${targetIds.length} 名学生`,
    tags: [`共 ${targetIds.length} 人`],
    nameListHtml: buildPreviewNameList(names, { title: '即将删除的学生' }),
    warningText: '删除前会自动创建保护点，避免误删学生名单和历史记录。',
    onConfirm: async () => {
      await createProtectionPoint(`删除学生前 · ${board.name}`);
      board.students = board.students.filter((student) => !targetIds.includes(student.id));
      checkedStudentIds = new Set([...checkedStudentIds].filter((id) => !targetIds.includes(id)));
      syncSelectionForActiveBoard({ preferFirstStudent: true });
      commitState(`已删除 ${targetIds.length} 名学生。`);
    }
  });
}

function buildGroupingPlan(targetStudents, groupCount, prefix) {
  const groups = Array.from({ length: groupCount }, (_value, index) => ({
    id: createId('group'),
    name: `${prefix}${index + 1}组`,
    members: []
  }));
  const orderedStudents = [...targetStudents].sort((left, right) => left.name.localeCompare(right.name, 'zh-CN'));

  orderedStudents.forEach((student, index) => {
    groups[index % groups.length].members.push(student);
  });

  return groups;
}

function openGroupBonusModal() {
  const board = getActiveBoard();
  if (!board || board.groups.length === 0) {
    showToast('请先创建小组。');
    return;
  }

  openModal({
    title: '小组全体加分',
    submitText: '应用加分',
    html: `
      <div class="modal-inline">
        <label class="hero-field">
          <span>目标小组</span>
          <select name="groupId">
            ${board.groups.map((group) => `<option value="${group.id}" ${group.id === activeGroupFilter ? 'selected' : ''}>${escapeHtml(group.name)}</option>`).join('')}
          </select>
        </label>
        <label class="hero-field">
          <span>加分分值</span>
          <input name="value" type="number" min="1" max="999" value="${board.settings.stepValue}" />
        </label>
        <label class="hero-field">
          <span>原因</span>
          <input name="label" type="text" maxlength="30" value="小组全体加分" />
        </label>
      </div>
      <input name="note" type="text" maxlength="40" placeholder="备注（可选）" />
    `,
    onSubmit: (formData) => {
      const groupId = formData.get('groupId')?.toString() || '';
      const label = formData.get('label')?.toString().trim() || '小组全体加分';
      const note = formData.get('note')?.toString().trim() || '';
      const value = Math.max(1, Math.abs(Math.floor(Number(formData.get('value')) || 1)));
      const targetStudents = board.students.filter((student) => student.groupId === groupId);

      if (targetStudents.length === 0) {
        showToast('这个小组里还没有学生。');
        return false;
      }

      openActionPreviewModal({
        title: '确认小组全体加分',
        submitText: '应用加分',
        tags: [`${getGroupName(board, groupId)}`, `+${value} 分`, `${targetStudents.length} 人`],
        summaryBlocks: [
          {
            title: label,
            html: `<p class="preview-empty">${note ? `备注：${escapeHtml(note)}` : '本次没有填写备注。'}</p>`
          }
        ],
        nameListHtml: buildPreviewNameList(targetStudents.map((student) => student.name), { title: '即将加分的学生' }),
        warningText: '确认后将一次性对整个小组生效。',
        onConfirm: async () => {
          applyDeltaToStudents(targetStudents, label, value, note);
          commitState(`已为 ${getGroupName(board, groupId)} 的 ${targetStudents.length} 名学生加分。`);
        }
      });
      return false;
    }
  });
}

function openGroupedBaseBonusModal() {
  const board = getActiveBoard();
  if (!board || board.students.filter((student) => student.groupId).length === 0) {
    showToast('请先完成分组。');
    return;
  }

  openModal({
    title: '小组基础加分',
    submitText: '应用基础加分',
    html: `
      <div class="modal-inline">
        <label class="hero-field">
          <span>加分分值</span>
          <input name="value" type="number" min="1" max="999" value="${board.settings.stepValue}" />
        </label>
        <label class="hero-field">
          <span>原因</span>
          <input name="label" type="text" maxlength="30" value="小组基础加分" />
        </label>
        <label class="hero-field">
          <span>备注</span>
          <input name="note" type="text" maxlength="40" placeholder="例如：课堂基础分" />
        </label>
      </div>
      <p class="modal-help">此操作会对当前面板中所有已分组的学生统一加分。</p>
    `,
    onSubmit: (formData) => {
      const label = formData.get('label')?.toString().trim() || '小组基础加分';
      const note = formData.get('note')?.toString().trim() || '';
      const value = Math.max(1, Math.abs(Math.floor(Number(formData.get('value')) || 1)));
      const targetStudents = board.students.filter((student) => student.groupId);

      openActionPreviewModal({
        title: '确认小组基础加分',
        submitText: '统一加分',
        tags: [`+${value} 分`, `${targetStudents.length} 人`],
        summaryBlocks: [
          {
            title: label,
            html: `<p class="preview-empty">${note ? `备注：${escapeHtml(note)}` : '本次没有填写备注。'}</p>`
          }
        ],
        nameListHtml: buildPreviewNameList(targetStudents.map((student) => student.name), { title: '即将统一加分的已分组学生' }),
        warningText: '确认后将一次性作用于当前面板中所有已分组学生。',
        onConfirm: async () => {
          applyDeltaToStudents(targetStudents, label, value, note);
          commitState(`已为 ${targetStudents.length} 名已分组学生统一加分。`);
        }
      });
      return false;
    }
  });
}

async function exportSummary() {
  const board = getActiveBoard();
  if (!board) {
    return;
  }

  const boards = appState.boards.filter(Boolean);
  if (boards.every((item) => item.students.length === 0)) {
    showToast('所有面板都还没有学生，无法导出汇总。');
    return;
  }

  if (boards.length === 1) {
    await exportCurrentBoardSummary(board);
    return;
  }

  openModal({
    title: '导出 Excel 汇总',
    submitText: '开始导出',
    html: `
      <label class="hero-field">
        <span>导出范围</span>
        <select name="summaryScope">
          <option value="current">当前面板</option>
          <option value="all">全部面板</option>
        </select>
      </label>
      <p class="modal-help">当前面板：导出当前面板的学生、小组和记录。全部面板：导出阶段总览、全体学生、小组汇总和全部记录。</p>
    `,
    onSubmit: async (formData) => {
      const scope = formData.get('summaryScope')?.toString() || 'current';
      return scope === 'all'
        ? exportAllBoardsSummary(boards)
        : exportCurrentBoardSummary(board);
    }
  });
}

function buildSummaryWorkbookSheets(board) {
  const groupRanking = getGroupRanking(board);
  const studentRanking = buildStudentRanking(board);
  const historyRows = board.students.flatMap((student) =>
    student.history.map((entry) => [
      student.name,
      student.studentNo || '',
      student.seatNo || '',
      getGroupName(board, student.groupId),
      getAttendanceLabel(student),
      student.note || '',
      entry.itemName,
      entry.delta,
      entry.note || '',
      formatExportTime(entry.timestamp)
    ])
  );

  return [
    {
      name: '学生汇总',
      rows: [
        ['面板名称', board.name],
        ['导出时间', formatExportTime(Date.now())],
        [],
        ['名次', '姓名', '学号', '座号', '小组', '出勤状态', '备注', '总分', '记录条数', '最近一次'],
        ...studentRanking.map((student, index) => {
          const source = board.students.find((item) => item.id === student.id);
          return [
            index + 1,
            student.name,
            source?.studentNo || '',
            source?.seatNo || '',
            student.groupName,
            getAttendanceLabel(source),
            source?.note || '',
            student.score,
            source?.history.length || 0,
            source?.history[0]?.itemName || ''
          ];
        })
      ]
    },
    {
      name: '小组汇总',
      rows: [
        ['面板名称', board.name],
        [],
        ['名次', '小组名称', '人数', '总分', '平均分'],
        ...groupRanking.map((group, index) => [
          index + 1,
          group.name,
          group.count,
          group.total,
          group.count > 0 ? Number(group.average.toFixed(1)) : 0
        ]),
        ...(board.students.some((student) => !student.groupId)
          ? [[
              '',
              '未分组',
              board.students.filter((student) => !student.groupId).length,
              board.students.filter((student) => !student.groupId).reduce((sum, student) => sum + student.score, 0),
              ''
            ]]
          : [])
      ]
    },
    {
      name: '得分记录',
      rows: [
        ['学生姓名', '学号', '座号', '小组', '出勤状态', '学生备注', '项目名称', '分值变化', '备注', '时间'],
        ...historyRows
      ]
    }
  ];
}

async function exportCurrentBoardSummary(board) {
  if (!board || board.students.length === 0) {
    showToast('当前面板没有学生，无法导出汇总。');
    return false;
  }

  const result = await window.classScore.exportSummaryXlsx({
    defaultPath: `${board.name}-Excel汇总.xlsx`,
    sheets: buildSummaryWorkbookSheets(board)
  });

  if (result.canceled) {
    return false;
  }

  showToast(`当前面板汇总已导出到：${result.filePath}`);
  return true;
}

async function exportAllBoardsSummary(boards) {
  const exportableBoards = (Array.isArray(boards) ? boards : []).filter((board) => board.students.length > 0);
  if (exportableBoards.length === 0) {
    showToast('全部面板都还没有学生，无法导出汇总。');
    return false;
  }

  const result = await window.classScore.exportSummaryXlsx({
    defaultPath: `全部面板-Excel汇总-${new Date().toISOString().slice(0, 10)}.xlsx`,
    sheets: buildAllBoardsSummaryWorkbookSheets(exportableBoards)
  });

  if (result.canceled) {
    return false;
  }

  showToast(`全部面板汇总已导出到：${result.filePath}`);
  return true;
}

function buildAllBoardsSummaryWorkbookSheets(boards) {
  const exportTime = formatExportTime(Date.now());
  const boardOverviewRows = boards.map((board, index) => {
    const totalScore = board.students.reduce((sum, student) => sum + student.score, 0);
    const absentCount = board.students.filter((student) => student.absent).length;
    return [
      index + 1,
      board.name,
      board.students.length,
      board.students.length - absentCount,
      absentCount,
      board.groups.length,
      totalScore,
      board.students.length > 0 ? Number((totalScore / board.students.length).toFixed(1)) : 0,
      buildStudentRanking(board)[0]?.name || '',
      getGroupRanking(board)[0]?.name || ''
    ];
  });
  const allStudentRows = boards.flatMap((board) =>
    buildStudentRanking(board).map((student, index) => {
      const source = board.students.find((item) => item.id === student.id);
      return [
        board.name,
        index + 1,
        student.name,
        source?.studentNo || '',
        source?.seatNo || '',
        student.groupName,
        getAttendanceLabel(source),
        source?.note || '',
        student.score,
        source?.history.length || 0,
        source?.history[0]?.itemName || ''
      ];
    })
  );
  const allGroupRows = boards.flatMap((board) => {
    const rankingRows = getGroupRanking(board).map((group, index) => [
      board.name,
      index + 1,
      group.name,
      group.count,
      group.total,
      group.count > 0 ? Number(group.average.toFixed(1)) : 0
    ]);
    const ungroupedStudents = board.students.filter((student) => !student.groupId);
    if (ungroupedStudents.length > 0) {
      rankingRows.push([
        board.name,
        '',
        '未分组',
        ungroupedStudents.length,
        ungroupedStudents.reduce((sum, student) => sum + student.score, 0),
        ''
      ]);
    }
    return rankingRows;
  });
  const allHistoryRows = boards.flatMap((board) =>
    board.students.flatMap((student) =>
      student.history.map((entry) => [
        board.name,
        student.name,
        student.studentNo || '',
        student.seatNo || '',
        getGroupName(board, student.groupId),
        getAttendanceLabel(student),
        student.note || '',
        entry.itemName,
        entry.delta,
        entry.note || '',
        formatExportTime(entry.timestamp)
      ])
    )
  );

  return [
    {
      name: '面板总览',
      rows: [
        ['导出时间', exportTime],
        [],
        ['序号', '面板名称', '学生人数', '到场人数', '缺勤人数', '小组数', '总分', '平均分', '第一名学生', '第一名小组'],
        ...boardOverviewRows
      ]
    },
    {
      name: '全体学生',
      rows: [
        ['导出时间', exportTime],
        [],
        ['面板名称', '名次', '姓名', '学号', '座号', '小组', '出勤状态', '备注', '总分', '记录条数', '最近一次'],
        ...allStudentRows
      ]
    },
    {
      name: '小组汇总',
      rows: [
        ['导出时间', exportTime],
        [],
        ['面板名称', '名次', '小组名称', '人数', '总分', '平均分'],
        ...allGroupRows
      ]
    },
    {
      name: '全部记录',
      rows: [
        ['导出时间', exportTime],
        [],
        ['面板名称', '学生姓名', '学号', '座号', '小组', '出勤状态', '学生备注', '项目名称', '分值变化', '备注', '时间'],
        ...allHistoryRows
      ]
    }
  ];
}

function buildSummaryCsv(board) {
  const groupRanking = getGroupRanking(board);
  const rows = [
    ['面板名称', board.name],
    ['导出时间', formatExportTime(Date.now())],
    [],
    ['学生汇总'],
    ['姓名', '小组', '出勤状态', '总分', '记录条数', '最近一次']
  ];

  buildStudentRanking(board).forEach((student) => {
    const originStudent = board.students.find((item) => item.id === student.id);
    rows.push([
      student.name,
      student.groupName,
      getAttendanceLabel(originStudent),
      student.score,
      originStudent?.history.length || 0,
      originStudent?.history[0]?.itemName || ''
    ]);
  });

  rows.push([]);
  rows.push(['小组汇总']);
  rows.push(['小组名称', '人数', '总分', '平均分']);

  groupRanking.forEach((group) => {
    rows.push([group.name, group.count, group.total, group.count > 0 ? group.average.toFixed(1) : '0.0']);
  });

  const ungroupedStudents = board.students.filter((student) => !student.groupId);
  if (ungroupedStudents.length > 0) {
    rows.push(['未分组', ungroupedStudents.length, ungroupedStudents.reduce((sum, student) => sum + student.score, 0), '']);
  }

  return `\uFEFF${rows.map((row) => row.map(csvEscape).join(',')).join('\n')}`;
}

function csvEscape(value) {
  const text = String(value ?? '');
  return `"${text.replaceAll('"', '""')}"`;
}

function openGroupRankingModal() {
  const board = getActiveBoard();
  if (!board) {
    return;
  }

  const ranking = getGroupRanking(board, { includeAbsent: rankingState.includeAbsent });
  openModal({
    title: `小组排行榜 · ${getRankingModeLabel()}`,
    hideSubmit: true,
    cancelText: '关闭',
    html: ranking.length > 0
      ? `
          <div class="table-sheet">
            <div class="table-row header">
              <span>名次</span>
              <span>小组名称</span>
              <span>人数</span>
              <span>总分</span>
            </div>
            ${ranking.map((group, index) => `
              <div class="table-row">
                <span>${index + 1}</span>
                <span>${escapeHtml(group.name)}</span>
                <span>${getRankingCountLabel(group.count)}</span>
                <span>${formatSignedScore(group.total)}</span>
              </div>
            `).join('')}
          </div>
        `
      : `<div class="empty-state">${rankingState.includeAbsent ? '当前面板还没有小组排行榜。' : '当前到场学生还不足以生成小组排行榜。'}</div>`
  });
}

function openStudentRankingModal() {
  const board = getActiveBoard();
  if (!board) {
    return;
  }

  const ranking = buildStudentRanking(board, { includeAbsent: rankingState.includeAbsent });
  openModal({
    title: `学生排行榜 · ${getRankingModeLabel()}`,
    hideSubmit: true,
    cancelText: '关闭',
    html: ranking.length > 0
      ? `
          <div class="table-sheet">
            <div class="table-row header">
              <span>名次</span>
              <span>学生姓名</span>
              <span>小组</span>
              <span>总分</span>
            </div>
            ${ranking.map((student, index) => `
              <div class="table-row">
                <span>${index + 1}</span>
                <span>${escapeHtml(student.name)}</span>
                <span>${escapeHtml(student.groupName)}</span>
                <span>${formatSignedScore(student.score)}</span>
              </div>
            `).join('')}
          </div>
        `
      : `<div class="empty-state">${rankingState.includeAbsent ? '当前面板还没有学生排行榜。' : '当前到场学生还不足以生成学生排行榜。'}</div>`
  });
}

function openBatchGroupingModal() {
  const board = getActiveBoard();
  if (!board || board.students.length === 0) {
    showToast('请先添加学生。');
    return;
  }

  openModal({
    title: '批量分组',
    submitText: '开始分组',
    html: `
      <div class="modal-inline">
        <label class="hero-field">
          <span>分组数量</span>
          <input name="groupCount" type="number" min="1" max="20" value="4" />
        </label>
        <label class="hero-field">
          <span>小组前缀</span>
          <input name="groupPrefix" type="text" maxlength="12" value="第" />
        </label>
        <label class="hero-field">
          <span>分组范围</span>
          <select name="scope">
            <option value="checked">仅已勾选学生</option>
            <option value="ungrouped">仅未分组学生</option>
            <option value="all">当前面板全部学生</option>
          </select>
        </label>
      </div>
      <label class="hero-field">
        <span>处理方式</span>
        <select name="resetMode">
          <option value="keep">保留原有小组，新增这次分组</option>
          <option value="reset">清空原有小组并重新分组</option>
        </select>
      </label>
      <p class="modal-help">系统会按姓名顺序轮流分配到各小组中。</p>
    `,
    onSubmit: (formData) => {
      const scope = formData.get('scope')?.toString() || 'checked';
      const resetMode = formData.get('resetMode')?.toString() || 'keep';
      const groupCount = Math.max(1, Math.min(20, Math.floor(Number(formData.get('groupCount')) || 1)));
      const prefix = formData.get('groupPrefix')?.toString().trim() || '第';
      const targetStudents = resolveGroupingTargets(board, scope);

      if (targetStudents.length === 0) {
        showToast('当前分组范围里没有学生。');
        return false;
      }

      const groupingPlan = buildGroupingPlan(targetStudents, groupCount, prefix);
      const scopeLabel = scope === 'checked'
        ? '已勾选学生'
        : scope === 'ungrouped'
          ? '未分组学生'
          : '当前面板全部学生';

      openActionPreviewModal({
        title: '确认批量分组',
        submitText: '开始分组',
        tags: [scopeLabel, `${groupCount} 个小组`, `${targetStudents.length} 人`],
        summaryBlocks: [
          {
            title: resetMode === 'reset' ? '分组方式：重置后重新分组' : '分组方式：保留旧小组并新增本次分组',
            html: groupingPlan.map((group) => {
              const previewNames = group.members.slice(0, 3).map((student) => student.name).join('、');
              return `<p class="preview-empty">${escapeHtml(group.name)}：${group.members.length} 人${group.members.length > 0 ? ` · ${escapeHtml(previewNames)}${group.members.length > 3 ? ` 等 ${group.members.length} 人` : ''}` : ''}</p>`;
            }).join('')
          }
        ],
        nameListHtml: buildPreviewNameList(targetStudents.map((student) => student.name), { title: '参与本次分组的学生' }),
        warningText: resetMode === 'reset'
          ? '确认后会先清空当前面板全部小组，再按预览方案重新分组。'
          : '确认后会保留已有小组，并新增本次生成的小组。',
        onConfirm: async () => {
          if (resetMode === 'reset') {
            board.groups = [];
            board.students.forEach((student) => {
              student.groupId = '';
            });
          }

          const newGroups = groupingPlan.map((group) => ({
            id: group.id,
            name: group.name,
            leaderId: ''
          }));
          board.groups.push(...newGroups);
          groupingPlan.forEach((group) => {
            group.members.forEach((student) => {
              student.groupId = group.id;
            });
          });

          activeGroupFilter = GROUP_FILTER_ALL;
          commitState(`已为 ${targetStudents.length} 名学生完成分组。`);
        }
      });
      return false;
    }
  });
}

function resolveGroupingTargets(board, scope) {
  if (scope === 'checked') {
    return board.students.filter((student) => checkedStudentIds.has(student.id));
  }

  if (scope === 'ungrouped') {
    return board.students.filter((student) => !student.groupId);
  }

  return [...board.students];
}

function openBatchScoringModal() {
  const board = getActiveBoard();
  if (!board || board.students.length === 0) {
    showToast('请先添加学生。');
    return;
  }

  openModal({
    title: '批量加分 / 批量减分',
    submitText: '应用批量操作',
    html: `
      <div class="modal-inline">
        <label class="hero-field">
          <span>作用范围</span>
          <select name="scope">
            <option value="checked">已勾选学生</option>
            <option value="current-group">当前筛选小组</option>
            <option value="all">当前面板全部学生</option>
            <option value="current-student">当前选中学生</option>
          </select>
        </label>
        <label class="hero-field">
          <span>操作类型</span>
          <select name="type">
            <option value="plus">加分</option>
            <option value="minus">减分</option>
          </select>
        </label>
        <label class="hero-field">
          <span>分值</span>
          <input name="value" type="number" min="1" max="999" value="${board.settings.stepValue}" />
        </label>
      </div>
      <input name="label" type="text" maxlength="30" placeholder="原因名称，例如：课堂合作" />
      <input name="note" type="text" maxlength="40" placeholder="备注（可选）" />
      <p class="modal-help">如果没有勾选学生，建议将作用范围改成“当前筛选小组”或“当前面板全部学生”。</p>
    `,
    onSubmit: (formData) => {
      const scope = formData.get('scope')?.toString() || 'checked';
      const type = formData.get('type')?.toString() || 'plus';
      const label = formData.get('label')?.toString().trim() || (type === 'plus' ? '批量加分' : '批量减分');
      const note = formData.get('note')?.toString().trim() || '';
      const value = Math.max(1, Math.abs(Math.floor(Number(formData.get('value')) || 1)));
      const delta = type === 'plus' ? value : -value;
      const targetStudents = resolveStudentsByScope(board, scope);

      if (targetStudents.length === 0) {
        showToast('当前范围内没有可处理的学生。');
        return false;
      }

      const scopeLabel = scope === 'checked'
        ? '已勾选学生'
        : scope === 'current-group'
          ? (activeGroupFilter === GROUP_FILTER_UNGROUPED ? '未分组学生' : activeGroupFilter === GROUP_FILTER_ALL ? '当前筛选小组' : getGroupName(board, activeGroupFilter))
          : scope === 'current-student'
            ? '当前选中学生'
            : '当前面板全部学生';

      openActionPreviewModal({
        title: `确认批量${type === 'plus' ? '加' : '减'}分`,
        submitText: `应用批量${type === 'plus' ? '加' : '减'}分`,
        tags: [scopeLabel, `${delta > 0 ? '+' : ''}${delta} 分`, `${targetStudents.length} 人`],
        summaryBlocks: [
          {
            title: label,
            html: `<p class="preview-empty">${note ? `备注：${escapeHtml(note)}` : '本次没有填写备注。'}</p>`
          }
        ],
        nameListHtml: buildPreviewNameList(targetStudents.map((student) => student.name), { title: '即将处理的学生' }),
        warningText: '确认前请核对人数和名单，避免批量作用范围选错。',
        onConfirm: async () => {
          applyDeltaToStudents(targetStudents, label, delta, note);
          commitState(`已对 ${targetStudents.length} 名学生完成批量${type === 'plus' ? '加' : '减'}分。`);
        }
      });
      return false;
    }
  });
}

function resolveStudentsByScope(board, scope) {
  if (scope === 'checked') {
    return board.students.filter((student) => checkedStudentIds.has(student.id));
  }

  if (scope === 'current-group') {
    if (activeGroupFilter === GROUP_FILTER_ALL) {
      return [];
    }

    if (activeGroupFilter === GROUP_FILTER_UNGROUPED) {
      return board.students.filter((student) => !student.groupId);
    }

    return board.students.filter((student) => student.groupId === activeGroupFilter);
  }

  if (scope === 'current-student') {
    const student = getSelectedStudent();
    return student ? [student] : [];
  }

  return [...board.students];
}

function openBatchAddModal() {
  openModal({
    title: '批量添加学生',
    submitText: '批量添加',
    html: `
      <textarea id="batchNamesInput" name="batchNames" placeholder="每行一个姓名，或用逗号、顿号分隔。例如：&#10;张三&#10;李四&#10;王五"></textarea>
      <div class="timer-actions">
        <button id="importNamesFromFileBtn" class="mini-action mini-action-orange" type="button">从文件导入并预览</button>
      </div>
      <p class="modal-help">支持从 txt / csv / xlsx / xls 文件导入，也支持直接粘贴姓名列表。文件导入会优先识别“姓名 / 小组 / 学号 / 座号 / 备注”等列；手动粘贴后点击下方“批量添加”即可。</p>
    `,
    onOpen: (body) => {
      const importButton = body.querySelector('#importNamesFromFileBtn');
      const textarea = body.querySelector('#batchNamesInput');

      const handleImport = async () => {
        try {
          const result = await window.classScore.importStudents();
          if (result.canceled) {
            return;
          }

          if (result.error) {
            showToast(result.error);
            return;
          }

          const importedStudents = mergeStudentDrafts(
            Array.isArray(result.students) && result.students.length > 0
              ? result.students
              : createStudentDraftsFromNames(result.names || [])
          );
          if (importedStudents.length === 0) {
            showToast('没有识别到可导入的姓名。');
            return;
          }

          const mergedStudents = mergeStudentDrafts([
            ...extractStudentDraftsFromText(textarea.value),
            ...importedStudents
          ]);
          const detail = result.sheetName
            ? `${result.sourceType?.toUpperCase() || '表格'} · ${result.sheetName}`
            : (result.encoding ? `${result.sourceType?.toUpperCase() || '文本'} · ${result.encoding}` : (result.sourceType?.toUpperCase() || '文件'));
          previewBatchAddStudents(mergedStudents, {
            sourceLabel: detail,
            emptyMessage: '导入文件里没有可添加的新学生。'
          });
        } catch (error) {
          showToast('读取名单文件失败，请检查文件格式是否正确。');
        }
      };

      importButton.addEventListener('click', handleImport);
      return () => {
        importButton.removeEventListener('click', handleImport);
      };
    },
    onSubmit: (formData) => {
      return previewBatchAddStudents(extractStudentDraftsFromText(formData.get('batchNames')?.toString() || ''));
    }
  });
}

function previewBatchAddStudents(students, options = {}) {
  const board = getActiveBoard();
  const normalizedStudents = mergeStudentDrafts(students);
  if (normalizedStudents.length === 0) {
    showToast(options.emptyMessage || '请先输入要添加的姓名。');
    return false;
  }

  const {
    freshStudents,
    duplicateStudents,
    supplementStudents,
    skippedDuplicateStudents
  } = analyzeStudentBatch(board, normalizedStudents);
  if (freshStudents.length === 0 && supplementStudents.length === 0) {
    showToast(options.emptyMessage || '这些学生已经都存在于当前面板，且没有可补充的新资料。');
    return false;
  }

  const groupCount = new Set([
    ...freshStudents.map((student) => student.groupName),
    ...supplementStudents.map((student) => student.groupName)
  ].filter(Boolean)).size;
  const enrichedCount = freshStudents.filter((student) => buildStudentDraftMeta(student)).length;
  const submitText = [
    freshStudents.length > 0 ? `添加 ${freshStudents.length} 名学生` : '',
    supplementStudents.length > 0 ? `补全 ${supplementStudents.length} 名资料` : ''
  ].filter(Boolean).join('并');

  openActionPreviewModal({
    title: options.sourceLabel ? `确认导入学生 · ${options.sourceLabel}` : '确认批量添加学生',
    submitText,
    tags: [
      `新增 ${freshStudents.length} 人`,
      supplementStudents.length > 0 ? `补全 ${supplementStudents.length} 人` : '无资料补全',
      skippedDuplicateStudents.length > 0 ? `跳过 ${skippedDuplicateStudents.length} 人` : (duplicateStudents.length > 0 ? '重复已处理' : '无重复'),
      groupCount > 0 ? `涉及 ${groupCount} 个小组` : '无分组字段',
      enrichedCount > 0 ? `${enrichedCount} 人带扩展信息` : '仅姓名'
    ],
    nameListHtml: `
      ${buildPreviewStudentList(freshStudents, { title: '即将新增的学生' })}
      ${supplementStudents.length > 0 ? buildPreviewStudentList(supplementStudents, { title: '将补全到已有学生', limit: 8 }) : ''}
      ${skippedDuplicateStudents.length > 0 ? buildPreviewStudentList(skippedDuplicateStudents, { title: '已存在且无新信息，将跳过', limit: 8 }) : ''}
    `,
    warningText: duplicateStudents.length > 0
      ? '同名学生只会补全当前为空的资料，不会覆盖已填写内容。若识别到新的小组字段，确认后会自动复用同名小组或补建小组。'
      : (groupCount > 0 ? '确认后会自动复用同名小组，缺失小组会自动创建。' : ''),
    onConfirm: async () => {
      const supplementResult = applyStudentDraftSupplements(board, supplementStudents);
      const result = addStudentsToBoard(board, freshStudents);
      const totalCreatedGroupCount = supplementResult.createdGroupCount + result.createdGroupCount;
      const summary = [
        result.addedCount > 0 ? `新增 ${result.addedCount} 名学生` : '',
        supplementResult.updatedCount > 0 ? `补全 ${supplementResult.updatedCount} 名学生资料` : ''
      ].filter(Boolean).join('，');
      const groupMessage = totalCreatedGroupCount > 0 ? `，并创建 ${totalCreatedGroupCount} 个小组` : '';
      commitState(`已处理导入名单：${summary}${groupMessage}。`);
    }
  });
  return false;
}

function openAddStudentModal() {
  openModal({
    title: '添加学生',
    submitText: '添加学生',
    html: `
      <label class="hero-field">
        <span>学生姓名</span>
        <input name="studentName" type="text" maxlength="24" autocomplete="off" placeholder="请输入学生姓名" />
      </label>
    `,
    onSubmit: (formData) => {
      const name = formData.get('studentName')?.toString().trim() || '';
      if (!name) {
        showToast('请输入学生姓名。');
        return false;
      }

      const result = addStudentsToBoard(getActiveBoard(), [{ name }]);
      if (result.addedCount === 0) {
        showToast('这名学生已经存在。');
        return false;
      }

      commitState(`已添加学生 ${name}。`);
    }
  });
}

function openEditStudentProfileModal(studentId = selectedStudentId) {
  const board = getActiveBoard();
  const student = board?.students.find((item) => item.id === studentId) || null;
  if (!board || !student) {
    showToast('请先选择一名学生。');
    return;
  }

  openModal({
    title: `编辑学生资料 · ${student.name}`,
    submitText: '保存资料',
    html: `
      <div class="modal-inline">
        <label class="hero-field">
          <span>学生姓名</span>
          <input name="studentName" type="text" maxlength="24" autocomplete="off" value="${escapeHtml(student.name)}" />
        </label>
        <label class="hero-field">
          <span>学号</span>
          <input name="studentNo" type="text" maxlength="24" autocomplete="off" value="${escapeHtml(student.studentNo || '')}" placeholder="可选" />
        </label>
      </div>
      <div class="modal-inline">
        <label class="hero-field">
          <span>座号</span>
          <input name="seatNo" type="text" maxlength="12" autocomplete="off" value="${escapeHtml(student.seatNo || '')}" placeholder="可选" />
        </label>
        <label class="hero-field">
          <span>备注</span>
          <input name="studentNote" type="text" maxlength="60" autocomplete="off" value="${escapeHtml(student.note || '')}" placeholder="例如：值日组长 / 重点关注" />
        </label>
      </div>
      <p class="modal-help">姓名会参与当前面板查重；学号、座号和备注会同步到搜索、导出和学生卡片展示。</p>
    `,
    onSubmit: (formData) => {
      const nextName = normalizeStudentTextField(formData.get('studentName')?.toString(), 24);
      const nextStudentNo = normalizeStudentTextField(formData.get('studentNo')?.toString(), 24);
      const nextSeatNo = normalizeStudentTextField(formData.get('seatNo')?.toString(), 12);
      const nextNote = normalizeStudentTextField(formData.get('studentNote')?.toString(), 60);

      if (!nextName) {
        showToast('请输入学生姓名。');
        return false;
      }

      const duplicateStudent = board.students.find((item) => item.id !== student.id && item.name === nextName);
      if (duplicateStudent) {
        showToast('当前面板里已经存在同名学生。');
        return false;
      }

      const changed = nextName !== student.name
        || nextStudentNo !== (student.studentNo || '')
        || nextSeatNo !== (student.seatNo || '')
        || nextNote !== (student.note || '');
      if (!changed) {
        showToast('学生资料没有变化。');
        return false;
      }

      student.name = nextName;
      student.studentNo = nextStudentNo;
      student.seatNo = nextSeatNo;
      student.note = nextNote;
      board.students.sort((left, right) => left.name.localeCompare(right.name, 'zh-CN'));
      commitState(`已更新 ${student.name} 的资料。`);
    }
  });
}

function ensureGroupForImportedStudent(board, groupName) {
  const normalizedGroupName = normalizeStudentTextField(groupName, 24);
  if (!board || !normalizedGroupName) {
    return { groupId: '', created: false };
  }

  const existingGroup = board.groups.find((group) => group.name === normalizedGroupName);
  if (existingGroup) {
    return { groupId: existingGroup.id, created: false };
  }

  const group = createGroup(board, normalizedGroupName);
  return {
    groupId: group.id,
    created: true
  };
}

function applyStudentDraftSupplements(board, students) {
  if (!board) {
    return {
      updatedCount: 0,
      createdGroupCount: 0
    };
  }

  let updatedCount = 0;
  let createdGroupCount = 0;

  mergeStudentDrafts(students).forEach((draft) => {
    const student = board.students.find((item) => item.name === draft.name);
    if (!student) {
      return;
    }

    let changed = false;
    if (!normalizeStudentTextField(student.studentNo, 24) && draft.studentNo) {
      student.studentNo = draft.studentNo;
      changed = true;
    }
    if (!normalizeStudentTextField(student.seatNo, 12) && draft.seatNo) {
      student.seatNo = draft.seatNo;
      changed = true;
    }
    if (!normalizeStudentTextField(student.note, 60) && draft.note) {
      student.note = draft.note;
      changed = true;
    }
    if ((!student.groupId || !getGroupById(board, student.groupId)) && draft.groupName) {
      const groupResult = ensureGroupForImportedStudent(board, draft.groupName);
      if (groupResult.created) {
        createdGroupCount += 1;
      }
      if (groupResult.groupId && student.groupId !== groupResult.groupId) {
        student.groupId = groupResult.groupId;
        changed = true;
      }
    }

    if (changed) {
      updatedCount += 1;
    }
  });

  return {
    updatedCount,
    createdGroupCount
  };
}

function addStudentsToBoard(board, students) {
  if (!board) {
    return {
      addedCount: 0,
      createdGroupCount: 0
    };
  }

  const existingNames = new Set(board.students.map((student) => student.name));
  const freshStudents = mergeStudentDrafts(students).filter((student) => !existingNames.has(student.name));
  let createdGroupCount = 0;

  freshStudents.forEach((student) => {
    const groupResult = ensureGroupForImportedStudent(board, student.groupName);
    if (groupResult.created) {
      createdGroupCount += 1;
    }

    board.students.push({
      id: createId('student'),
      name: student.name,
      studentNo: student.studentNo,
      seatNo: student.seatNo,
      note: student.note,
      groupId: groupResult.groupId,
      absent: false,
      score: 0,
      history: [],
      inventory: createEmptyInventory(),
      petCollection: createDefaultPetCollection()
    });
  });

  board.students.sort((left, right) => left.name.localeCompare(right.name, 'zh-CN'));
  if (!selectedStudentId && board.students[0]) {
    selectedStudentId = board.students[0].id;
  }

  return {
    addedCount: freshStudents.length,
    createdGroupCount
  };
}

function extractNamesFromText(text) {
  const cleaned = text.replace(/^\uFEFF/, '').trim();
  if (!cleaned) {
    return [];
  }

  return [...new Set(
    cleaned
      .split(/[\r\n,，;；、\t]+/)
      .map((item) => item.trim())
      .filter(Boolean)
      .filter((name) => !/^(name|student|姓名|学生)$/i.test(name))
  )];
}

function randomPickStudent() {
  const board = getActiveBoard();
  if (!board || board.students.length === 0) {
    showToast('当前面板还没有学生。');
    return;
  }

  const { context, state } = ensureRandomRoundState(board);
  if (!state || context.students.length === 0) {
    showToast(context.absentCount > 0 ? '当前范围内学生都已标记缺勤。' : '当前范围内没有可抽取的学生。');
    return;
  }

  if (state.remainingIds.length === 0) {
    showToast(`“${context.scopeLabel}”这一轮已经抽完，请先重置本轮。`);
    return;
  }

  const pickedId = state.remainingIds[Math.floor(Math.random() * state.remainingIds.length)];
  const picked = board.students.find((student) => student.id === pickedId);
  if (!picked) {
    randomPickState = null;
    showToast('随机点名状态已过期，已自动清空，请重试。');
    return;
  }

  const pickedAt = Date.now();
  selectedStudentId = picked.id;
  randomPickState = {
    ...state,
    studentId: picked.id,
    timestamp: pickedAt,
    remainingIds: state.remainingIds.filter((id) => id !== picked.id),
    history: [
      {
        studentId: picked.id,
        timestamp: pickedAt
      },
      ...state.history
    ]
  };
  renderAll();
  syncWidgetState();
  showToast(
    randomPickState.remainingIds.length === 0
      ? `随机点名：${picked.name}。本轮已抽完。`
      : `随机点名：${picked.name}。本轮还剩 ${randomPickState.remainingIds.length} 人。`
  );
}

function startTicker() {
  tickTimer = window.setInterval(() => {
    let shouldRender = false;

    if (stopwatch.running) {
      shouldRender = true;
    }

    if (countdown.running) {
      countdown.remainingMs = Math.max(0, countdown.endsAt - Date.now());
      shouldRender = true;

      if (countdown.remainingMs === 0) {
        countdown.running = false;
        notifyCountdownFinished();
      }
    }

    if (shouldRender) {
      renderTimers();
      renderPresentation();
      syncWidgetState();
    }
  }, 100);
}

function startStopwatch() {
  if (stopwatch.running) {
    return;
  }

  stopwatch.running = true;
  stopwatch.startedAt = Date.now() - stopwatch.elapsedMs;
  renderTimers();
  syncWidgetState();
}

function pauseStopwatch() {
  if (!stopwatch.running) {
    return;
  }

  stopwatch.elapsedMs = currentStopwatchMs();
  stopwatch.running = false;
  renderTimers();
  syncWidgetState();
}

function resetStopwatch() {
  stopwatch.running = false;
  stopwatch.elapsedMs = 0;
  stopwatch.startedAt = 0;
  renderTimers();
  syncWidgetState();
}

function currentStopwatchMs() {
  return stopwatch.running ? Date.now() - stopwatch.startedAt : stopwatch.elapsedMs;
}

function applyCountdownPreset(totalSeconds, options = {}) {
  const lastCommittedSnapshot = appRuntime.getLastCommittedSnapshot();
  if (!options.silent && lastCommittedSnapshot) {
    pushHistorySnapshot(historyState.undo, lastCommittedSnapshot);
    historyState.redo = [];
  }

  countdown.totalMs = totalSeconds * 1000;
  countdown.remainingMs = countdown.totalMs;
  countdown.running = false;
  countdown.endsAt = 0;

  appState.appSettings.countdownPresetSeconds = totalSeconds;
  ui.countdownMinutes.value = String(Math.floor(totalSeconds / 60));
  ui.countdownSeconds.value = String(totalSeconds % 60);

  renderTimers();
  renderPresentation();
  syncWidgetState();

  if (!options.silent) {
    appRuntime.setLastCommittedSnapshot(createSnapshot());
    scheduleSave();
  }
}

function startCountdown() {
  if (countdown.running) {
    return;
  }

  countdown.running = true;
  countdown.endsAt = Date.now() + countdown.remainingMs;
  renderTimers();
  syncWidgetState();
}

function pauseCountdown() {
  if (!countdown.running) {
    return;
  }

  countdown.remainingMs = currentCountdownMs();
  countdown.running = false;
  countdown.endsAt = 0;
  renderTimers();
  syncWidgetState();
}

function resetCountdown() {
  countdown.running = false;
  countdown.remainingMs = countdown.totalMs;
  countdown.endsAt = 0;
  renderTimers();
  syncWidgetState();
}

function currentCountdownMs() {
  return countdown.running ? Math.max(0, countdown.endsAt - Date.now()) : countdown.remainingMs;
}

function notifyCountdownFinished() {
  playFinishTone();
  renderTimers();
  syncWidgetState();
  showToast('倒计时结束。');
}

function playFinishTone() {
  try {
    audioContext ??= new window.AudioContext();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = 'triangle';
    oscillator.frequency.value = 880;
    gain.gain.value = 0.02;

    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.28);
  } catch (error) {
    // Ignore audio failures.
  }
}

function renderPetAvatarMarkup(speciesId, label = '') {
  const species = getPetSpecies(speciesId);
  let figure = '';

  if (species.id === 'cloud-corgi') {
    figure = `
      <ellipse cx="110" cy="144" rx="54" ry="42" fill="#fff8ef" />
      <ellipse cx="110" cy="104" rx="58" ry="50" fill="#ffd5a6" />
      <path d="M68 68 L86 34 L102 74 Z" fill="#f19945" />
      <path d="M152 68 L134 34 L118 74 Z" fill="#f19945" />
      <ellipse cx="88" cy="112" rx="15" ry="18" fill="#2b3a57" />
      <ellipse cx="132" cy="112" rx="15" ry="18" fill="#2b3a57" />
      <ellipse cx="110" cy="126" rx="20" ry="14" fill="#fffdf7" />
      <ellipse cx="110" cy="119" rx="8" ry="6" fill="#2b3a57" />
      <path d="M103 132 Q110 140 117 132" stroke="#2b3a57" stroke-width="5" stroke-linecap="round" fill="none" />
      <ellipse cx="78" cy="126" rx="8" ry="5" fill="#ffb1aa" />
      <ellipse cx="142" cy="126" rx="8" ry="5" fill="#ffb1aa" />
      <ellipse cx="86" cy="171" rx="11" ry="18" fill="#fff8ef" />
      <ellipse cx="134" cy="171" rx="11" ry="18" fill="#fff8ef" />
      <path d="M163 145 Q181 138 182 154 Q180 170 160 164" fill="#ffd5a6" />
    `;
  } else if (species.id === 'star-bunny') {
    figure = `
      <ellipse cx="110" cy="146" rx="48" ry="40" fill="#fff3fc" />
      <ellipse cx="110" cy="106" rx="52" ry="46" fill="#ffd4ea" />
      <ellipse cx="84" cy="54" rx="14" ry="40" fill="#ffd4ea" />
      <ellipse cx="136" cy="54" rx="14" ry="40" fill="#ffd4ea" />
      <ellipse cx="84" cy="56" rx="7" ry="26" fill="#fff3fc" />
      <ellipse cx="136" cy="56" rx="7" ry="26" fill="#fff3fc" />
      <ellipse cx="90" cy="108" rx="13" ry="16" fill="#3b2f6f" />
      <ellipse cx="130" cy="108" rx="13" ry="16" fill="#3b2f6f" />
      <path d="M103 122 Q110 128 117 122" stroke="#3b2f6f" stroke-width="5" stroke-linecap="round" fill="none" />
      <circle cx="82" cy="124" r="7" fill="#ffaacd" />
      <circle cx="138" cy="124" r="7" fill="#ffaacd" />
      <path d="M110 137 L116 150 L130 150 L119 158 L123 172 L110 164 L97 172 L101 158 L90 150 L104 150 Z" fill="#fff3a6" />
      <circle cx="156" cy="58" r="8" fill="#fff1a0" />
      <path d="M48 69 L52 77 L61 78 L54 84 L56 93 L48 88 L40 93 L42 84 L35 78 L44 77 Z" fill="#fff7c3" />
    `;
  } else if (species.id === 'mint-dragon') {
    figure = `
      <ellipse cx="110" cy="142" rx="50" ry="44" fill="#effff9" />
      <ellipse cx="110" cy="102" rx="52" ry="46" fill="#b9f2dd" />
      <path d="M74 116 Q36 104 44 76 Q68 76 84 102" fill="#8be0c0" />
      <path d="M146 116 Q184 104 176 76 Q152 76 136 102" fill="#8be0c0" />
      <path d="M82 58 L90 40 L102 63" fill="#5dbd97" />
      <path d="M138 58 L130 40 L118 63" fill="#5dbd97" />
      <ellipse cx="92" cy="106" rx="13" ry="16" fill="#24624d" />
      <ellipse cx="128" cy="106" rx="13" ry="16" fill="#24624d" />
      <ellipse cx="110" cy="121" rx="11" ry="8" fill="#24624d" />
      <path d="M101 135 Q110 144 119 135" stroke="#24624d" stroke-width="5" stroke-linecap="round" fill="none" />
      <path d="M152 154 Q180 158 180 178 Q156 184 146 164" fill="#9ce8cb" />
      <circle cx="74" cy="128" r="6" fill="#7de3bf" />
      <circle cx="146" cy="128" r="6" fill="#7de3bf" />
    `;
  } else if (species.id === 'moon-cat') {
    figure = `
      <ellipse cx="110" cy="146" rx="48" ry="40" fill="#f7f4ff" />
      <ellipse cx="110" cy="106" rx="52" ry="46" fill="#d8d0ff" />
      <path d="M72 70 L90 38 L100 74 Z" fill="#7c69e8" />
      <path d="M148 70 L130 38 L120 74 Z" fill="#7c69e8" />
      <ellipse cx="92" cy="106" rx="13" ry="18" fill="#2d2456" />
      <ellipse cx="128" cy="106" rx="13" ry="18" fill="#2d2456" />
      <circle cx="92" cy="104" r="4" fill="#ffffff" />
      <circle cx="128" cy="104" r="4" fill="#ffffff" />
      <ellipse cx="110" cy="121" rx="9" ry="6" fill="#2d2456" />
      <path d="M103 134 Q110 142 117 134" stroke="#2d2456" stroke-width="5" stroke-linecap="round" fill="none" />
      <path d="M154 146 Q188 142 182 178 Q150 182 146 158" fill="#cfc7ff" />
      <circle cx="160" cy="56" r="16" fill="#fff6a8" />
      <circle cx="166" cy="54" r="14" fill="${species.accentSoft}" />
    `;
  } else if (species.id === 'peach-panda') {
    figure = `
      <ellipse cx="110" cy="146" rx="52" ry="42" fill="#fff7f8" />
      <ellipse cx="110" cy="106" rx="50" ry="44" fill="#ffffff" />
      <circle cx="80" cy="72" r="16" fill="#2e3048" />
      <circle cx="140" cy="72" r="16" fill="#2e3048" />
      <ellipse cx="90" cy="110" rx="14" ry="18" fill="#2e3048" />
      <ellipse cx="130" cy="110" rx="14" ry="18" fill="#2e3048" />
      <ellipse cx="110" cy="126" rx="18" ry="14" fill="#fff1f3" />
      <ellipse cx="110" cy="121" rx="7" ry="6" fill="#2e3048" />
      <path d="M102 136 Q110 146 118 136" stroke="#2e3048" stroke-width="5" stroke-linecap="round" fill="none" />
      <circle cx="78" cy="126" r="7" fill="#ffb5c0" />
      <circle cx="142" cy="126" r="7" fill="#ffb5c0" />
      <path d="M156 148 Q184 148 182 174 Q158 180 148 160" fill="#ffd6dc" />
      <path d="M110 148 C126 133 144 148 142 166 C140 181 122 188 110 198 C98 188 80 181 78 166 C76 148 94 133 110 148 Z" fill="#ff97a4" opacity="0.8" />
    `;
  } else if (species.id === 'azure-qilin') {
    figure = `
      <path d="M58 150 Q88 96 142 98 Q170 100 174 128 Q174 164 140 172 Q96 184 58 150 Z" fill="#effcff" />
      <path d="M78 92 Q96 46 114 62 Q126 48 144 92" fill="#b5ecff" />
      <path d="M84 84 L72 50 L94 72" fill="#1f91cc" />
      <path d="M136 84 L148 50 L126 72" fill="#1f91cc" />
      <path d="M154 138 Q184 136 184 164 Q160 170 148 152" fill="#9fe4ff" />
      <path d="M72 146 Q96 176 128 178" stroke="#60cfff" stroke-width="10" stroke-linecap="round" fill="none" />
      <ellipse cx="94" cy="112" rx="12" ry="15" fill="#1d4c72" />
      <ellipse cx="132" cy="112" rx="12" ry="15" fill="#1d4c72" />
      <circle cx="94" cy="108" r="4" fill="#ffffff" />
      <circle cx="132" cy="108" r="4" fill="#ffffff" />
      <ellipse cx="112" cy="126" rx="10" ry="6" fill="#1d4c72" />
      <path d="M104 136 Q112 144 120 136" stroke="#1d4c72" stroke-width="5" stroke-linecap="round" fill="none" />
      <circle cx="62" cy="70" r="8" fill="#ffffff" opacity="0.86" />
      <circle cx="160" cy="62" r="10" fill="#d9f9ff" opacity="0.76" />
    `;
  } else if (species.id === 'sun-phoenix') {
    figure = `
      <path d="M110 50 Q134 66 138 98 Q168 102 176 130 Q178 164 110 180 Q42 164 44 130 Q52 102 82 98 Q86 66 110 50 Z" fill="#fff6ef" />
      <path d="M110 32 L124 60 L110 54 L96 60 Z" fill="#ff8c5a" />
      <path d="M86 70 Q60 54 58 26 Q84 38 96 62" fill="#ffb056" />
      <path d="M134 70 Q160 54 162 26 Q136 38 124 62" fill="#ffb056" />
      <path d="M76 122 Q38 118 26 86 Q58 90 86 108" fill="#ff9a49" />
      <path d="M144 122 Q182 118 194 86 Q162 90 134 108" fill="#ff9a49" />
      <ellipse cx="92" cy="110" rx="12" ry="16" fill="#65321d" />
      <ellipse cx="128" cy="110" rx="12" ry="16" fill="#65321d" />
      <circle cx="92" cy="106" r="4" fill="#ffffff" />
      <circle cx="128" cy="106" r="4" fill="#ffffff" />
      <path d="M110 122 L120 132 L110 136 L100 132 Z" fill="#f3792d" />
      <path d="M102 142 Q110 148 118 142" stroke="#65321d" stroke-width="5" stroke-linecap="round" fill="none" />
      <path d="M110 150 Q132 170 154 188" stroke="#ff8c5a" stroke-width="9" stroke-linecap="round" fill="none" />
      <circle cx="54" cy="56" r="8" fill="#ffe29b" />
      <circle cx="166" cy="48" r="12" fill="#ffd067" opacity="0.8" />
    `;
  } else if (species.id === 'void-basilisk') {
    figure = `
      <path d="M46 150 Q72 92 136 92 Q168 92 178 122 Q180 154 150 168 Q120 182 74 176" fill="#f5f0ff" />
      <path d="M78 90 Q86 44 116 54 Q146 46 154 88" fill="#9b87ff" />
      <path d="M76 92 L60 60 L88 72" fill="#5d47c7" />
      <path d="M148 92 L164 60 L136 72" fill="#5d47c7" />
      <ellipse cx="92" cy="112" rx="12" ry="16" fill="#24174d" />
      <ellipse cx="128" cy="112" rx="12" ry="16" fill="#24174d" />
      <circle cx="92" cy="110" r="4" fill="#ffffff" />
      <circle cx="128" cy="110" r="4" fill="#ffffff" />
      <path d="M104 128 Q110 134 116 128" stroke="#24174d" stroke-width="4" stroke-linecap="round" fill="none" />
      <path d="M150 148 Q184 148 192 176 Q162 176 144 158" fill="#bba8ff" />
      <path d="M72 154 Q36 168 32 194 Q64 188 88 166" fill="#8b74ff" opacity="0.82" />
      <circle cx="60" cy="66" r="10" fill="#ffffff" opacity="0.24" />
    `;
  } else if (species.id === 'ender-sprite') {
    figure = `
      <path d="M110 46 Q148 66 154 110 Q164 160 110 176 Q56 160 66 110 Q72 66 110 46 Z" fill="#f7f2ff" />
      <path d="M76 82 Q48 72 38 44 Q72 52 90 74" fill="#8d6dff" />
      <path d="M144 82 Q172 72 182 44 Q148 52 130 74" fill="#8d6dff" />
      <ellipse cx="92" cy="108" rx="11" ry="16" fill="#261a4e" />
      <ellipse cx="128" cy="108" rx="11" ry="16" fill="#261a4e" />
      <circle cx="92" cy="108" r="4" fill="#8fd5ff" />
      <circle cx="128" cy="108" r="4" fill="#8fd5ff" />
      <ellipse cx="110" cy="126" rx="8" ry="6" fill="#261a4e" />
      <path d="M103 138 Q110 146 117 138" stroke="#261a4e" stroke-width="5" stroke-linecap="round" fill="none" />
      <path d="M62 154 L78 136 L86 154 L70 168 Z" fill="#a48cff" opacity="0.86" />
      <path d="M158 154 L142 136 L134 154 L150 168 Z" fill="#a48cff" opacity="0.86" />
      <circle cx="58" cy="70" r="6" fill="#8fd5ff" opacity="0.7" />
      <circle cx="164" cy="66" r="6" fill="#8fd5ff" opacity="0.7" />
    `;
  } else if (species.id === 'slime-cub') {
    figure = `
      <path d="M58 160 Q58 84 110 78 Q162 84 162 160 Q162 182 110 186 Q58 182 58 160 Z" fill="#76ec8b" />
      <path d="M72 96 Q110 54 148 96" fill="#4cc965" opacity="0.8" />
      <ellipse cx="92" cy="120" rx="12" ry="15" fill="#1f5c30" />
      <ellipse cx="128" cy="120" rx="12" ry="15" fill="#1f5c30" />
      <circle cx="92" cy="118" r="4" fill="#ffffff" />
      <circle cx="128" cy="118" r="4" fill="#ffffff" />
      <path d="M98 142 Q110 154 122 142" stroke="#1f5c30" stroke-width="5" stroke-linecap="round" fill="none" />
      <circle cx="72" cy="166" r="8" fill="#b7ffbf" opacity="0.72" />
      <circle cx="148" cy="166" r="8" fill="#b7ffbf" opacity="0.72" />
    `;
  } else if (species.id === 'warden-cub') {
    figure = `
      <path d="M58 150 Q60 92 110 82 Q160 92 162 150 Q162 176 110 186 Q58 176 58 150 Z" fill="#eafdfd" />
      <path d="M70 96 Q52 74 54 52 Q82 60 92 86" fill="#2fc7c9" />
      <path d="M150 96 Q168 74 166 52 Q138 60 128 86" fill="#2fc7c9" />
      <ellipse cx="92" cy="118" rx="12" ry="15" fill="#143c43" />
      <ellipse cx="128" cy="118" rx="12" ry="15" fill="#143c43" />
      <circle cx="92" cy="118" r="4" fill="#7cf4ff" />
      <circle cx="128" cy="118" r="4" fill="#7cf4ff" />
      <path d="M102 138 Q110 146 118 138" stroke="#143c43" stroke-width="5" stroke-linecap="round" fill="none" />
      <path d="M76 150 Q92 170 110 170 Q128 170 144 150" stroke="#26aeb1" stroke-width="10" stroke-linecap="round" fill="none" />
      <circle cx="50" cy="122" r="7" fill="#7cf4ff" opacity="0.74" />
      <circle cx="170" cy="122" r="7" fill="#7cf4ff" opacity="0.74" />
    `;
  } else {
    figure = `
      <ellipse cx="110" cy="146" rx="50" ry="42" fill="#fff5f5" />
      <ellipse cx="110" cy="106" rx="52" ry="46" fill="#ffe2e6" />
      <circle cx="82" cy="72" r="16" fill="#2f3547" />
      <circle cx="138" cy="72" r="16" fill="#2f3547" />
      <circle cx="89" cy="108" r="13" fill="#2f3547" />
      <circle cx="131" cy="108" r="13" fill="#2f3547" />
      <circle cx="89" cy="104" r="4" fill="#ffffff" />
      <circle cx="131" cy="104" r="4" fill="#ffffff" />
      <ellipse cx="110" cy="120" rx="10" ry="7" fill="#2f3547" />
      <path d="M101 134 Q110 145 119 134" stroke="#2f3547" stroke-width="5" stroke-linecap="round" fill="none" />
      <circle cx="80" cy="126" r="7" fill="#ffb8c3" />
      <circle cx="140" cy="126" r="7" fill="#ffb8c3" />
      <path d="M110 147 C126 133 144 148 142 166 C140 181 122 188 110 198 C98 188 80 181 78 166 C76 148 94 133 110 147 Z" fill="#ff97a4" opacity="0.86" />
    `;
  }

  return `
    <div class="pet-avatar-art" ${getPetThemeStyleAttribute(species.id)}>
      <svg viewBox="0 0 220 220" class="pet-avatar-svg" role="img" aria-label="${escapeHtml(label || species.name)}">
        <circle cx="110" cy="110" r="94" fill="${species.accentSoft}" />
        <circle cx="58" cy="54" r="12" fill="#ffffff" opacity="0.76" />
        <circle cx="165" cy="44" r="8" fill="#ffffff" opacity="0.66" />
        <circle cx="178" cy="79" r="5" fill="#ffffff" opacity="0.72" />
        ${figure}
      </svg>
    </div>
  `;
}

function renderPetVitalBar(label, current, max, tone = 'hp') {
  const safeMax = Math.max(1, Math.floor(Number(max) || 0));
  const safeCurrent = Math.max(0, Math.min(safeMax, Math.floor(Number(current) || 0)));
  const ratio = safeMax > 0 ? safeCurrent / safeMax : 0;
  return `
    <div class="pet-vital-row">
      <span>
        <strong>${escapeHtml(label)}</strong>
        <em>${safeCurrent}/${safeMax}</em>
      </span>
      <div class="pet-vital-track ${tone}">
        <div class="pet-vital-fill ${tone}" style="width:${safeCurrent > 0 ? Math.max(8, ratio * 100) : 0}%"></div>
      </div>
    </div>
  `;
}

function renderPetSkillCards(pet, student) {
  return getPetSkillStates(pet, student).map((skill) => {
    const notes = [];
    if (skill.restoreHpRatio) {
      notes.push(`回复生命 ${Math.round(skill.restoreHpRatio * 100)}%`);
    }
    if (skill.restoreMana) {
      notes.push(`回复蓝量 ${skill.restoreMana}`);
    }
    if (skill.manaBurn) {
      notes.push(`额外烧蓝 ${skill.manaBurn}`);
    }
    if (skill.defenseBuff) {
      notes.push(`防御 +${skill.defenseBuff}`);
    }
    if (skill.dodgeBoost) {
      notes.push('提升闪避');
    }
    if (skill.critBoost) {
      notes.push(`暴击率 +${Math.round(skill.critBoost * 100)}%`);
    }

    const buttonText = skill.learned
      ? '已学会'
      : !skill.unlocked
        ? `Lv.${skill.unlockLevel} 解锁`
        : !skill.affordable
          ? `需 ${skill.learnCost} 积分`
          : `学习技能 -${skill.learnCost}`;

    return `
      <article class="pet-skill-card ${skill.learned ? 'is-learned' : ''} ${skill.unlocked ? '' : 'is-locked'}">
        <div class="pet-skill-head">
          <div>
            <strong>${escapeHtml(skill.name)}</strong>
            <small>MP ${skill.manaCost} · 伤害 ${skill.minDamage}-${skill.maxDamage}</small>
          </div>
          <span class="preview-tag">Lv.${skill.unlockLevel}</span>
        </div>
        <p class="modal-help">${escapeHtml(skill.description)}</p>
        <div class="preview-tag-row">
          ${notes.length > 0 ? notes.map((note) => `<span class="preview-tag">${escapeHtml(note)}</span>`).join('') : '<span class="preview-tag">直接伤害技能</span>'}
        </div>
        <button class="mini-action ${skill.learned ? '' : skill.unlocked && skill.affordable ? 'mini-action-orange' : ''}" type="button" data-action="learn-pet-skill" data-skill-id="${skill.id}" ${skill.learned || !skill.unlocked || !skill.affordable ? 'disabled' : ''}>${buttonText}</button>
      </article>
    `;
  }).join('');
}

function renderPetCollectionCards(student) {
  return getStudentPets(student)
    .map((pet) => {
      const species = getPetSpecies(pet.speciesId);
      const level = getPetLevel(pet);
      const isActive = getActivePet(student)?.id === pet.id;
      const dead = isPetDead(pet);
      return `
        <button class="pet-mini-card ${isActive ? 'is-active' : ''}" type="button" data-action="select-pet" data-pet-id="${pet.id}" ${getPetThemeStyleAttribute(species.id)}>
          ${renderPetAvatarMarkup(species.id, pet.name)}
          <strong>${escapeHtml(pet.name)}</strong>
          <small>${escapeHtml(species.name)} · ${escapeHtml(species.rarity)} · Lv.${level}</small>
          <div class="preview-tag-row">
            <span class="preview-tag">${dead ? '待复活' : `战绩 ${pet.wins}/${pet.losses}`}</span>
            <span class="preview-tag">羁绊 ${pet.bond}</span>
          </div>
        </button>
      `;
    })
    .join('');
}

function renderPetBattleModal(board, student) {
  const pet = getActivePet(student);
  if (!pet) {
    return `<section class="modal-panel"><div class="empty-state">当前还没有宠物，先去宠物家园孵化一只吧。</div></section>`;
  }

  const session = getPetBattleStateForRender(board, student, pet);
  const playerPet = session.playerPet || createBattlePetSnapshot(pet);
  const playerStats = getPetDerivedStats(playerPet);
  const learnedSkills = getPetLearnedSkills(playerPet);
  const reviveItems = getReviveItems(board, student);

  if (session.status === 'lobby') {
    return `
      <div class="pet-modal-toolbar">
        <button class="mini-action" type="button" data-action="battle-back-home">返回宠物家园</button>
        <button class="mini-action" type="button" data-action="battle-open-shop">积分商城</button>
      </div>
      <section class="pet-hero-card" ${getPetThemeStyleAttribute(playerPet.speciesId)}>
        <div class="pet-hero-main">
          ${renderPetAvatarMarkup(playerPet.speciesId, playerPet.name)}
          <div class="pet-hero-copy">
            <p class="card-kicker">竞技场准备</p>
            <h3>${escapeHtml(playerPet.name)}</h3>
            <p class="modal-help">${escapeHtml(playerStats.species.name)} · ${escapeHtml(playerStats.species.rarity)} · Lv.${playerStats.level}</p>
            <div class="pet-vital-grid">
              <article class="pet-vital-card">
                ${renderPetVitalBar('生命值', playerPet.currentHp, playerStats.maxHp, 'hp')}
                ${renderPetVitalBar('蓝量', playerPet.currentMana, playerStats.maxMana, 'mana')}
              </article>
              <article class="pet-vital-card">
                <div class="preview-tag-row">
                  <span class="preview-tag">攻击 ${playerStats.attackMin}-${playerStats.attackMax}</span>
                  <span class="preview-tag">防御 ${playerStats.defense}</span>
                  <span class="preview-tag">暴击 ${Math.round(playerStats.critRate * 100)}%</span>
                  <span class="preview-tag">闪避 ${Math.round(playerStats.dodgeRate * 100)}%</span>
                </div>
                <p class="modal-help">普通攻击会额外回复 6 点蓝量。已学技能 ${learnedSkills.length} 个${isPetDead(pet) ? '，当前宠物已倒下，需先复活。' : '。'}</p>
                ${isPetDead(pet) ? `<div class="pet-dead-box"><strong>宠物当前已倒下</strong><small>请先在商城购买复活币，再回到宠物家园使用。</small><div class="preview-tag-row"><span class="preview-tag">现有复活币 ${reviveItems.reduce((sum, item) => sum + item.count, 0)}</span></div></div>` : ''}
              </article>
            </div>
          </div>
        </div>
      </section>
      <section class="modal-panel">
        <h3>竞技场对手</h3>
        <div class="pet-arena-grid">
          ${PET_ARENA_OPPONENTS.map((opponent) => {
            const arenaPet = createArenaPetFromTemplate(opponent, pet);
            const arenaStats = getPetDerivedStats(arenaPet);
            const arenaSpecies = getPetSpecies(opponent.speciesId);
            return `
              <article class="pet-arena-card" ${getPetThemeStyleAttribute(opponent.speciesId)}>
                ${renderPetAvatarMarkup(opponent.speciesId, opponent.name)}
                <strong>${escapeHtml(opponent.name)}</strong>
                <small>${escapeHtml(arenaSpecies.name)} · ${escapeHtml(arenaSpecies.rarity)} · Lv.${arenaStats.level}</small>
                <p class="modal-help">${escapeHtml(opponent.description)}</p>
                <div class="preview-tag-row">
                  <span class="preview-tag">成长奖励 +${opponent.rewardGrowth}</span>
                  <span class="preview-tag">攻击 ${arenaStats.attackMin}-${arenaStats.attackMax}</span>
                </div>
                <button class="mini-action mini-action-orange" type="button" data-action="battle-start" data-opponent-id="${opponent.id}" ${isPetDead(pet) ? 'disabled' : ''}>开始挑战</button>
              </article>
            `;
          }).join('')}
        </div>
      </section>
      <section class="modal-panel">
        <h3>已掌握技能</h3>
        ${learnedSkills.length > 0 ? `<div class="pet-skill-grid">${learnedSkills.map((skill) => `<article class="pet-skill-card is-learned"><div class="pet-skill-head"><div><strong>${escapeHtml(skill.name)}</strong><small>MP ${skill.manaCost} · 伤害 ${skill.minDamage}-${skill.maxDamage}</small></div><span class="preview-tag">已装备</span></div><p class="modal-help">${escapeHtml(skill.description)}</p></article>`).join('')}</div>` : `<div class="empty-state">当前还没有学会技能，可以先回宠物家园用积分解锁技能。</div>`}
      </section>
    `;
  }

  const opponentPet = session.opponentPet;
  const opponentStats = getPetDerivedStats(opponentPet);
  const resultTitle = session.status === 'win' ? '战斗胜利' : session.status === 'loss' ? '战斗失败' : '';
  const resultCopy = session.result
    ? session.result.outcome === 'win'
      ? `获得成长值 +${session.result.growthGain}${session.result.leveledUp ? `，并升到 Lv.${session.result.level}` : ''}。`
      : isPetDead(pet) ? '宠物已经倒下，需要复活币才能再次出战。' : '战绩已记录，可以调整状态后再战。'
    : '';

  return `
    <div class="pet-modal-toolbar">
      <button class="mini-action" type="button" data-action="battle-back-home">返回宠物家园</button>
      <button class="mini-action" type="button" data-action="battle-reset">${session.status === 'active' ? '重新匹配' : '再来一场'}</button>
    </div>
    ${(session.status === 'win' || session.status === 'loss') ? `<section class="pet-result-banner ${session.status === 'win' ? 'is-win' : 'is-loss'}"><strong>${resultTitle}</strong><small>${escapeHtml(resultCopy)}</small></section>` : ''}
    <section class="pet-battle-shell">
      <div class="pet-battle-stage">
        <article class="pet-battle-card" ${getPetThemeStyleAttribute(playerPet.speciesId)}>
          ${renderPetAvatarMarkup(playerPet.speciesId, playerPet.name)}
          <div class="pet-battle-copy">
            <strong>${escapeHtml(playerPet.name)}</strong>
            <small>${escapeHtml(playerStats.species.name)} · Lv.${playerStats.level}</small>
            ${renderPetVitalBar('生命值', playerPet.currentHp, playerStats.maxHp, 'hp')}
            ${renderPetVitalBar('蓝量', playerPet.currentMana, playerStats.maxMana, 'mana')}
            <div class="preview-tag-row">
              <span class="preview-tag">攻击 ${playerStats.attackMin}-${playerStats.attackMax}</span>
              <span class="preview-tag">防御 ${playerStats.defense}</span>
            </div>
          </div>
        </article>
        <article class="pet-battle-card" ${getPetThemeStyleAttribute(opponentPet.speciesId)}>
          ${renderPetAvatarMarkup(opponentPet.speciesId, opponentPet.name)}
          <div class="pet-battle-copy">
            <strong>${escapeHtml(opponentPet.name)}</strong>
            <small>${escapeHtml(opponentStats.species.name)} · Lv.${opponentStats.level}</small>
            ${renderPetVitalBar('生命值', opponentPet.currentHp, opponentStats.maxHp, 'hp')}
            ${renderPetVitalBar('蓝量', opponentPet.currentMana, opponentStats.maxMana, 'mana')}
            <div class="preview-tag-row">
              <span class="preview-tag">攻击 ${opponentStats.attackMin}-${opponentStats.attackMax}</span>
              <span class="preview-tag">防御 ${opponentStats.defense}</span>
            </div>
          </div>
        </article>
      </div>
      <section class="modal-panel">
        <h3>战斗操作</h3>
        ${session.status === 'active' ? `
          <div class="pet-battle-actions">
            <button class="mini-action mini-action-green" type="button" data-action="battle-attack">普通攻击</button>
          </div>
          <p class="modal-help">普通攻击会回复 6 点蓝量；技能会消耗蓝量并触发额外效果。</p>
          ${learnedSkills.length > 0 ? `<div class="pet-skill-grid">${learnedSkills.map((skill) => `<article class="pet-skill-card ${playerPet.currentMana >= skill.manaCost ? 'is-learned' : 'is-locked'}"><div class="pet-skill-head"><div><strong>${escapeHtml(skill.name)}</strong><small>MP ${skill.manaCost} · 伤害 ${skill.minDamage}-${skill.maxDamage}</small></div><span class="preview-tag">${playerPet.currentMana >= skill.manaCost ? '可释放' : '蓝量不足'}</span></div><p class="modal-help">${escapeHtml(skill.description)}</p><button class="mini-action mini-action-orange" type="button" data-action="battle-skill" data-skill-id="${skill.id}" ${playerPet.currentMana >= skill.manaCost ? '' : 'disabled'}>释放技能</button></article>`).join('')}</div>` : `<div class="empty-state">当前没有已学技能，本场可以先用普通攻击完成对战。</div>`}
        ` : `<div class="empty-state">本场战斗已经结算，可以返回家园调整状态，或重新匹配下一场。</div>`}
      </section>
      <section class="modal-panel">
        <h3>战斗日志</h3>
        <div class="battle-log">
          ${session.log.map((entry) => `<article class="battle-log-item tone-${escapeHtml(entry.tone || 'neutral')}">${escapeHtml(entry.text)}</article>`).join('')}
        </div>
      </section>
    </section>
  `;
}

function feedActivePet(itemId) {
  const board = getActiveBoard();
  const student = getSelectedStudent();
  const item = board?.shopItems.find((shopItem) => shopItem.id === itemId);
  const pet = getActivePet(student);
  if (!board || !student || !pet || !item || item.effectType !== 'snack') {
    showToast('当前没有可喂养的宠物或零食。');
    return;
  }

  if (isPetDead(pet)) {
    showToast('宠物已倒下，复活后才能继续喂养。');
    return;
  }

  if (getStudentInventoryCount(student, item.id) <= 0) {
    showToast('背包里已经没有这个零食了。');
    return;
  }

  updateStudentInventory(student, item.id, -1);
  pet.feedCount += 1;
  pet.bond = Math.min(999, pet.bond + Math.max(2, Math.round(item.growthGain / 5)));
  adjustPetVitals(pet, 14, 10);
  const growthResult = grantPetGrowth(pet, item.growthGain);
  commitState(
    growthResult.leveledUp
      ? `${activePetName(student)} 吃掉了${item.name}，已升到 Lv.${growthResult.level}。`
      : `${activePetName(student)} 吃掉了${item.name}，成长值 +${item.growthGain}。`
  );
  reopenPetHomeLater();
}

function openPetBattleModal() {
  const board = getActiveBoard();
  const student = getSelectedStudent();
  const pet = getActivePet(student);
  if (!board || !student || !pet) {
    showToast('请先选中学生并拥有一只宠物。');
    return;
  }

  petBattleState = ensurePetBattleState(board, student, pet);
  openModal({
    title: '宠物对战',
    hideSubmit: true,
    cancelText: '关闭',
    html: renderPetBattleModal(board, student),
    onOpen: (body) => {
      const rerender = () => {
        const freshBoard = getActiveBoard();
        const freshStudent = getSelectedStudent();
        if (!freshBoard || !freshStudent) {
          return;
        }
        body.innerHTML = renderPetBattleModal(freshBoard, freshStudent);
      };

      const handleClick = (event) => {
        const actionNode = event.target.closest('[data-action]');
        const action = actionNode?.dataset.action;
        const opponentId = actionNode?.dataset.opponentId || '';
        const skillId = actionNode?.dataset.skillId || '';
        if (!action) {
          return;
        }

        if (action === 'battle-back-home') {
          petBattleState = null;
          openPetHomeModal();
          return;
        }

        if (action === 'battle-open-shop') {
          openShopModal();
          return;
        }

        if (action === 'battle-start') {
          if (startPetBattleChallenge(opponentId)) {
            rerender();
          }
          return;
        }

        if (action === 'battle-attack') {
          if (performPetBattleRound('normal')) {
            rerender();
          }
          return;
        }

        if (action === 'battle-skill') {
          if (performPetBattleRound('skill', skillId)) {
            rerender();
          }
          return;
        }

        if (action === 'battle-reset') {
          const freshBoard = getActiveBoard();
          const freshStudent = getSelectedStudent();
          const freshPet = getActivePet(freshStudent);
          if (!freshBoard || !freshStudent || !freshPet) {
            return;
          }
          petBattleState = createPetBattleLobby(freshBoard, freshStudent, freshPet);
          rerender();
        }
      };

      body.addEventListener('click', handleClick);
      return () => {
        body.removeEventListener('click', handleClick);
      };
    }
  });
}

function openModal(config) {
  return uiRuntime.openModal(config);
}

async function handleModalSubmit(event) {
  return uiRuntime.handleModalSubmit(event);
}

function closeModal() {
  return uiRuntime.closeModal();
}

function cleanupModal() {
  return uiRuntime.cleanupModal();
}

function createSnapshot() {
  return appRuntime.createSnapshot();
}

function restoreSnapshot(snapshotText) {
  return appRuntime.restoreSnapshot(snapshotText);
}

function pushHistorySnapshot(target, snapshot) {
  return appRuntime.pushHistorySnapshot(target, snapshot);
}

function undoLastAction() {
  return appRuntime.undoLastAction();
}

function redoLastAction() {
  return appRuntime.redoLastAction();
}

function handleGlobalKeyDown(event) {
  const editableTarget = event.target instanceof HTMLElement
    && (['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName) || event.target.isContentEditable);

  if (editableTarget && !(presentationModeActive && event.key === 'Escape')) {
    return;
  }

  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z' && !event.shiftKey) {
    event.preventDefault();
    undoLastAction();
    return;
  }

  if (
    (event.ctrlKey || event.metaKey) &&
    (event.key.toLowerCase() === 'y' || (event.shiftKey && event.key.toLowerCase() === 'z'))
  ) {
    event.preventDefault();
    redoLastAction();
    return;
  }

  if (presentationModeActive && event.key === 'Escape') {
    event.preventDefault();
    exitPresentationMode();
  }
}

async function enterPresentationMode() {
  if (presentationModeActive) {
    exitPresentationMode();
    return;
  }

  presentationModeActive = true;
  renderPresentation();
  renderHeader();

  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    }
  } catch (error) {
    // Ignore fullscreen failures and keep the overlay visible.
  }
}

async function exitPresentationMode() {
  presentationModeActive = false;
  renderPresentation();
  renderHeader();

  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    }
  } catch (error) {
    // Ignore exit failures.
  }
}

function handlePresentationRandomCardActivate() {
  randomPickStudent();
}

function handlePresentationRandomCardKeyDown(event) {
  if (event.key !== 'Enter' && event.key !== ' ') {
    return;
  }

  event.preventDefault();
  randomPickStudent();
}

function syncPresentationModeState() {
  if (!document.fullscreenElement) {
    presentationModeActive = false;
    renderPresentation();
    renderHeader();
  }
}

// Keep modal/history/toast plumbing behind the extracted runtimes.
function commitState(message) {
  return appRuntime.commitState(message);
}

function scheduleSave() {
  return appRuntime.scheduleSave();
}

function buildSerializableState() {
  return {
    version: 2,
    activeBoardId: appState.activeBoardId,
    boards: appState.boards,
    appSettings: {
      countdownPresetSeconds: Math.floor(countdown.totalMs / 1000),
      quickActionsCollapsed: Boolean(appState.appSettings.quickActionsCollapsed)
    }
  };
}

function serializeState() {
  return appRuntime.serializeState();
}

function buildWidgetPayload() {
  const board = getActiveBoard();
  const selectedStudent = getSelectedStudent();
  const mode = countdown.running ? 'countdown' : stopwatch.running ? 'stopwatch' : 'idle';
  const secondaryText = countdown.running
    ? formatCountdown(currentCountdownMs())
    : stopwatch.running
      ? formatStopwatch(currentStopwatchMs())
      : `${board?.students.length || 0} 人`;

  return {
    mode,
    boardName: board?.name || '班级面板',
    studentCount: board?.students.length || 0,
    primaryText: countdown.running
      ? '倒计时'
      : stopwatch.running
        ? '计时中'
        : (selectedStudent?.name || '待命'),
    secondaryText,
    selectedStudentName: selectedStudent?.name || '',
    selectedStudentScore: selectedStudent?.score || 0
  };
}

function syncWidgetState() {
  return appRuntime.syncWidgetState();
}

function scoreTone(score) {
  const numeric = Number(score) || 0;
  if (numeric > 0) {
    return 'positive';
  }

  if (numeric < 0) {
    return 'negative';
  }

  return 'neutral';
}

function formatSignedScore(score) {
  const numeric = Number(score) || 0;
  if (numeric > 0) {
    return `+${numeric}`;
  }

  return String(numeric);
}

function formatStopwatch(milliseconds) {
  const totalTenths = Math.floor(milliseconds / 100);
  const minutes = Math.floor(totalTenths / 600);
  const seconds = Math.floor((totalTenths % 600) / 10);
  const tenths = totalTenths % 10;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${tenths}`;
}

function formatCountdown(milliseconds) {
  const totalSeconds = Math.ceil(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function formatTimestamp(timestamp) {
  return new Intl.DateTimeFormat('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(timestamp);
}

function formatExportTime(timestamp) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(timestamp);
}

function showToast(message) {
  return uiRuntime.showToast(message);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function escapeTextarea(value) {
  return escapeHtml(value).replaceAll('\n', '&#10;');
}

function normalizePetCollection(collection) {
  const pets = (Array.isArray(collection?.pets) ? collection.pets : [])
    .map((pet) => normalizePet(pet));
  const incubatingEggs = (Array.isArray(collection?.incubatingEggs) ? collection.incubatingEggs : [])
    .map((egg) => normalizeEggIncubator(egg));
  const activePetId = typeof collection?.activePetId === 'string' && pets.some((pet) => pet.id === collection.activePetId)
    ? collection.activePetId
    : (pets[0]?.id || '');

  return {
    pets,
    activePetId,
    incubatingEggs
  };
}

function getPetRarityProfile(petOrRarity) {
  const profiles = {
    common: { factor: 1, critRate: 0.08, dodgeRate: 0.04 },
    rare: { factor: 1.08, critRate: 0.1, dodgeRate: 0.05 },
    epic: { factor: 1.18, critRate: 0.12, dodgeRate: 0.06 },
    legendary: { factor: 1.3, critRate: 0.14, dodgeRate: 0.07 },
    mythic: { factor: 1.46, critRate: 0.16, dodgeRate: 0.08 }
  };
  const raritySource = typeof petOrRarity === 'string'
    ? { rarity: petOrRarity }
    : (petOrRarity?.speciesId ? getPetSpecies(petOrRarity.speciesId) : petOrRarity) || {};
  const rarityText = String(raritySource.rarity || '');
  const tier = typeof raritySource.rarityTier === 'string' && profiles[raritySource.rarityTier]
    ? raritySource.rarityTier
    : /神/.test(rarityText)
      ? 'mythic'
      : /传/.test(rarityText)
        ? 'legendary'
        : /(史|超)/.test(rarityText)
          ? 'epic'
          : /稀/.test(rarityText)
            ? 'rare'
            : 'common';
  return profiles[tier] || profiles.common;
}

function changeStudentScore(student, delta, itemName = '', note = '') {
  if (!student) {
    return 0;
  }

  const previousScore = clampScore(student.score);
  const nextScore = clampScore(previousScore + Math.round(Number(delta) || 0));
  const appliedDelta = nextScore - previousScore;
  student.score = nextScore;
  if (itemName && appliedDelta !== 0) {
    student.history.unshift(createHistoryEntry(itemName, appliedDelta, note));
    student.history = student.history.slice(0, 300);
  }
  return appliedDelta;
}

function spendStudentPoints(student, cost, itemName, note = '宠物系统') {
  const normalizedCost = Math.max(0, Math.floor(Number(cost) || 0));
  if (normalizedCost <= 0) {
    return true;
  }
  if (!student || student.score < normalizedCost) {
    return false;
  }
  changeStudentScore(student, -normalizedCost, itemName, note);
  return true;
}

function applyDeltaToStudents(students, itemName, delta, note = '') {
  (Array.isArray(students) ? students : []).forEach((student) => {
    changeStudentScore(student, delta, itemName, note);
  });
}

function createIncubatingEgg(itemId) {
  const species = pickRandomPetSpecies();
  return normalizeEggIncubator({
    id: createId('egg'),
    itemId,
    speciesId: species.id,
    startedAt: Date.now(),
    readyAt: Date.now() + PET_EGG_HATCH_DURATION_MS
  });
}

function startEggIncubation(itemId) {
  const board = getActiveBoard();
  const student = getSelectedStudent();
  if (!board || !student) {
    showToast('请先选中学生。');
    return;
  }

  if (getStudentInventoryCount(student, itemId) <= 0) {
    showToast('背包里没有可放入孵化仓的宠物蛋。');
    return;
  }

  updateStudentInventory(student, itemId, -1);
  if (!student.petCollection || typeof student.petCollection !== 'object') {
    student.petCollection = createDefaultPetCollection();
  }
  student.petCollection.incubatingEggs.push(createIncubatingEgg(itemId));
  commitState(`${student.name} 的宠物蛋已进入孵化仓，默认孵化 7 天。`);
  reopenPetHomeLater();
}

function accelerateIncubatingEgg(eggId, requestedHours = 1) {
  const student = getSelectedStudent();
  const egg = getIncubatingEggs(student).find((entry) => entry.id === eggId);
  if (!student || !egg) {
    showToast('目标宠物蛋不存在。');
    return;
  }

  const remainingHours = Math.ceil(getEggRemainingMs(egg) / PET_EGG_ACCELERATION_HOUR_MS);
  if (remainingHours <= 0) {
    showToast('这枚宠物蛋已经可以破壳了。');
    return;
  }

  const desiredHours = requestedHours === 'max'
    ? Math.max(1, Math.min(remainingHours, student.score))
    : Math.max(1, Math.floor(Number(requestedHours) || 1));
  const actualHours = Math.min(remainingHours, desiredHours);
  if (!spendStudentPoints(student, actualHours, `孵化加速 ${actualHours} 小时`, '宠物孵化')) {
    showToast('积分不足，无法继续加速。');
    return;
  }

  egg.readyAt = Math.max(Date.now(), egg.readyAt - (actualHours * PET_EGG_ACCELERATION_HOUR_MS));
  commitState(`${student.name} 的宠物蛋已加速 ${actualHours} 小时。`);
  reopenPetHomeLater();
}

function hatchStudentPet(eggId) {
  const student = getSelectedStudent();
  const eggIndex = getIncubatingEggs(student).findIndex((entry) => entry.id === eggId);
  if (!student || eggIndex < 0) {
    showToast('当前没有可孵化的宠物蛋。');
    return;
  }

  const egg = student.petCollection.incubatingEggs[eggIndex];
  if (!isEggReadyToHatch(egg)) {
    showToast('这枚宠物蛋还在孵化中。');
    return;
  }

  student.petCollection.incubatingEggs.splice(eggIndex, 1);
  const pet = createPetForStudent(student, egg.speciesId);
  student.petCollection.pets.push(pet);
  student.petCollection.activePetId = pet.id;
  commitState(`${student.name} 孵化出了 ${getPetSpecies(pet.speciesId).name}。`);
  reopenPetHomeLater();
}

function formatDurationCompact(milliseconds) {
  const totalHours = Math.max(0, Math.ceil(milliseconds / PET_EGG_ACCELERATION_HOUR_MS));
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;
  if (days > 0) {
    return `${days}天${hours}小时`;
  }
  return `${hours}小时`;
}

function buildPetSummaryText(board, student) {
  const pets = getStudentPets(student);
  const eggCount = getStudentEggCount(board, student);
  const incubatingEggs = getIncubatingEggs(student);
  const readyEggs = incubatingEggs.filter((egg) => isEggReadyToHatch(egg)).length;
  const snacks = getFeedableItems(board, student).reduce((sum, item) => sum + item.count, 0);

  if (pets.length === 0 && eggCount === 0 && incubatingEggs.length === 0) {
    return '宠物家园未开启';
  }

  return `宠物 ${pets.length} 只 · 待孵化 ${eggCount} 枚 · 孵化中 ${incubatingEggs.length} 枚 · 可破壳 ${readyEggs} 枚 · 零食 ${snacks} 份`;
}

function interactWithActivePet(interactionKey) {
  const student = getSelectedStudent();
  const pet = getActivePet(student);
  const action = PET_INTERACTION_ACTIONS[interactionKey];
  if (!student || !pet || !action) {
    showToast('当前没有可互动的宠物。');
    return;
  }
  if (isPetDead(pet)) {
    showToast('宠物当前处于倒下状态，请先使用复活币。');
    return;
  }
  if (!spendStudentPoints(student, action.cost, `${action.label}互动`, '宠物家园')) {
    showToast('积分不足，无法执行这个互动。');
    return;
  }

  const result = grantPetGrowth(pet, action.growthGain);
  pet.bond = Math.min(999, pet.bond + action.bondGain);
  adjustPetVitals(pet, action.hpGain, action.manaGain);
  pet.currentHp = Math.max(1, pet.currentHp);

  commitState(
    result.leveledUp
      ? `${activePetName(student)} 完成${action.label}后升到 Lv.${result.level}。`
      : `${activePetName(student)} 完成${action.label}，消耗 ${action.cost} 积分。`
  );
  reopenPetHomeLater();
}

function learnSkillForActivePet(skillId) {
  const student = getSelectedStudent();
  const pet = getActivePet(student);
  const skillState = getPetSkillStates(pet, student).find((skill) => skill.id === skillId);
  if (!student || !pet || !skillState) {
    showToast('目标技能不存在。');
    return;
  }
  if (skillState.learned) {
    showToast('这个技能已经学会了。');
    return;
  }
  if (!skillState.unlocked) {
    showToast(`宠物达到 Lv.${skillState.unlockLevel} 后才能学习该技能。`);
    return;
  }
  if (!spendStudentPoints(student, skillState.learnCost, `学习技能：${skillState.name}`, '宠物家园')) {
    showToast('积分不足，无法学习该技能。');
    return;
  }

  pet.learnedSkillIds.push(skillState.id);
  pet.bond = Math.min(999, pet.bond + 6);
  commitState(`${activePetName(student)} 学会了技能 ${skillState.name}。`);
  reopenPetHomeLater();
}

function startPetBattleChallenge(opponentId) {
  const board = getActiveBoard();
  const student = getSelectedStudent();
  const pet = getActivePet(student);
  const opponentTemplate = getArenaOpponentTemplate(opponentId);
  if (!board || !student || !pet || !opponentTemplate) {
    showToast('当前无法开启宠物对战。');
    return false;
  }
  if (isPetDead(pet)) {
    showToast('宠物已经倒下，请先购买并使用复活币。');
    return false;
  }
  if (!spendStudentPoints(student, opponentTemplate.entryCost || 0, `竞技场门票：${opponentTemplate.name}`, '宠物对战')) {
    showToast('积分不足，无法进入这场挑战。');
    return false;
  }

  petBattleState = {
    ...createPetBattleLobby(board, student, pet),
    status: 'active',
    opponentId: opponentTemplate.id,
    opponentTemplate,
    opponentPet: createArenaPetFromTemplate(opponentTemplate, pet)
  };

  appendPetBattleLog(
    petBattleState,
    `${petBattleState.playerPet.name} 支付 ${opponentTemplate.entryCost || 0} 积分进入竞技场，对手是 ${petBattleState.opponentPet.name}。`,
    'neutral'
  );
  return true;
}

function handleQuickAdjustFormClick(event) {
  const button = event.target.closest('[data-action="quick-adjust-direct"]');
  if (!button) {
    return;
  }

  const delta = Math.round(Number(button.dataset.delta) || 0);
  if (!delta) {
    return;
  }

  applyDirectScoreDelta(delta, ui.quickAdjustLabel.value.trim(), ui.quickAdjustNote.value.trim());
}

function renderSelectedStudentCard() {
  const board = getActiveBoard();
  const student = getSelectedStudent();

  if (!board || !student) {
    ui.selectedStudentCard.className = 'selected-student empty-state';
    ui.selectedStudentCard.innerHTML = '请先从左侧名单中选择一名学生，再使用加减分规则。';
    return;
  }

  const checked = checkedStudentIds.has(student.id);
  const checkedStudents = getCheckedStudents(board);
  const nextBatchAbsence = checkedStudents.some((item) => !item.absent);
  const latest = student.history[0];
  const currentGroup = getGroupById(board, student.groupId);
  const currentLeader = currentGroup ? getGroupLeader(board, currentGroup.id) : null;
  const isLeader = isGroupLeader(board, student);
  const studentProfileDetails = [
    student.studentNo ? `学号：${student.studentNo}` : '',
    student.seatNo ? `座号：${student.seatNo}` : '',
    student.note ? `备注：${student.note}` : ''
  ].filter(Boolean).join(' · ');
  const groupOptions = [
    '<option value="">未分组</option>',
    ...board.groups.map((group) => `<option value="${group.id}" ${group.id === student.groupId ? 'selected' : ''}>${escapeHtml(group.name)}${group.leaderId ? ` · 组长 ${escapeHtml(getGroupLeader(board, group.id)?.name || '')}` : ''}</option>`),
    `<option value="${GROUP_CREATE_OPTION}">+ 新建小组...</option>`
  ].join('');

  ui.selectedStudentCard.className = 'selected-student';
  ui.selectedStudentCard.innerHTML = `
    <div class="selected-student-shell">
      <div class="selected-student-main">
        <div class="selected-student-head">
          <div>
            <p class="card-kicker">当前学生</p>
            <h3>${escapeHtml(student.name)}</h3>
            <p class="selected-note">
              所属小组：${escapeHtml(getGroupName(board, student.groupId))} ·
              ${isLeader ? '组内身份：小组长' : `当前组长：${escapeHtml(currentLeader?.name || '未设置')}`} ·
              出勤状态：${getAttendanceLabel(student)} ·
              历史记录 ${student.history.length} 条
            </p>
            <p class="selected-note">${latest ? `最近一次：${escapeHtml(latest.itemName)} ${formatSignedScore(latest.delta)}` : '还没有记录。'}</p>
            ${studentProfileDetails ? `<p class="selected-note">${escapeHtml(studentProfileDetails)}</p>` : ''}
          </div>
          <div class="score-orb ${scoreTone(student.score)}">${formatSignedScore(student.score)}</div>
        </div>
        <div class="selected-meta-grid">
          <article class="selected-meta-card">
            <span>宠物家园</span>
            <strong>${escapeHtml(buildPetSummaryText(board, student))}</strong>
          </article>
          <article class="selected-meta-card">
            <span>当前分值</span>
            <strong>${formatSignedScore(student.score)}</strong>
          </article>
          <article class="selected-meta-card">
            <span>学号 / 座号</span>
            <strong>${escapeHtml([
              student.studentNo ? `学号 ${student.studentNo}` : '',
              student.seatNo ? `座号 ${student.seatNo}` : ''
            ].filter(Boolean).join(' · ') || '未设置')}</strong>
          </article>
          <article class="selected-meta-card">
            <span>学生备注</span>
            <strong>${escapeHtml(student.note || '未填写')}</strong>
          </article>
          <article class="selected-meta-card">
            <span>勾选状态</span>
            <strong>${checked ? '已勾选' : '未勾选'}</strong>
          </article>
          <article class="selected-meta-card">
            <span>批量目标</span>
            <strong>${checkedStudents.length > 0 ? `${checkedStudents.length} 人` : '仅当前学生'}</strong>
          </article>
        </div>
      </div>
    </div>

    <div class="selected-quick-score-cloud">
      <span class="selected-quick-score-label">快捷加减分</span>
      <div class="selected-quick-score-buttons">
        ${renderQuickScoreButtons()}
      </div>
    </div>

    <div class="selected-actions">
      <label class="hero-field small-field">
        <span>归属小组</span>
        <select id="selectedStudentGroupSelect">
          ${groupOptions}
        </select>
      </label>
      <button class="mini-action" type="button" data-action="edit-student-profile">编辑资料</button>
      <button class="mini-action" type="button" data-action="toggle-current-check">${checked ? '取消勾选' : '勾选当前学生'}</button>
      ${checkedStudents.length > 0 ? `<button class="mini-action ${nextBatchAbsence ? 'mini-action-orange' : ''}" type="button" data-action="toggle-checked-absence">${nextBatchAbsence ? '已勾选设缺勤' : '已勾选设到场'}</button>` : ''}
      <button class="mini-action ${student.absent ? 'mini-action-orange' : ''}" type="button" data-action="toggle-current-absence">${student.absent ? '设为到场' : '设为缺勤'}</button>
      <button class="mini-action" type="button" data-action="reset-current-score">总分归零</button>
    </div>
  `;
}

function handleSelectedStudentCardClick(event) {
  const actionNode = event.target.closest('[data-action]');
  const action = actionNode?.dataset.action;
  if (!action) {
    return;
  }

  const student = getSelectedStudent();
  if (!student) {
    return;
  }

  if (action === 'quick-score-delta') {
    const delta = Math.round(Number(actionNode.dataset.delta) || 0);
    applyDirectScoreDelta(delta);
    return;
  }

  if (action === 'toggle-current-check') {
    if (checkedStudentIds.has(student.id)) {
      checkedStudentIds.delete(student.id);
    } else {
      checkedStudentIds.add(student.id);
    }

    renderHeader();
    renderStudents();
    renderSelectedStudentCard();
    renderOverview();
    renderRandomCard();
    renderPresentation();
    syncWidgetState();
    return;
  }

  if (action === 'edit-student-profile') {
    openEditStudentProfileModal(student.id);
    return;
  }

  if (action === 'toggle-current-absence') {
    student.absent = !student.absent;
    commitState(`${student.name} 已标记为${student.absent ? '缺勤' : '到场'}。`);
    return;
  }

  if (action === 'toggle-checked-absence') {
    const board = getActiveBoard();
    if (!board) {
      return;
    }

    const checkedStudents = getCheckedStudents(board);
    if (checkedStudents.length === 0) {
      showToast('当前没有已勾选学生。');
      return;
    }

    const nextAbsent = checkedStudents.some((item) => !item.absent);
    checkedStudents.forEach((item) => {
      item.absent = nextAbsent;
    });
    commitState(`已将 ${checkedStudents.length} 名已勾选学生标记为${nextAbsent ? '缺勤' : '到场'}。`);
    return;
  }

  if (action === 'reset-current-score') {
    openActionPreviewModal({
      title: '确认总分归零',
      submitText: '确认归零',
      summaryBlocks: [
        {
          title: student.name,
          html: `<p class="preview-empty">当前总分：${escapeHtml(formatSignedScore(student.score))} · 历史记录 ${student.history.length} 条</p>`
        }
      ],
      warningText: '归零前会自动创建保护点，方便回退。',
      onConfirm: async () => {
        await createProtectionPoint(`学生总分归零前 · ${student.name}`);
        student.score = 0;
        student.history.unshift(createHistoryEntry('总分归零', 0, '手动操作'));
        commitState(`${student.name} 的总分已归零。`);
      }
    });
  }
}

function applyQuickAdjust() {
  const board = getActiveBoard();
  const student = getSelectedStudent();
  if (!board) {
    showToast('当前没有可操作的面板。');
    return;
  }

  const targets = getScoreActionTargets(board, student);
  if (targets.length === 0) {
    showToast('请先选择一名学生。');
    return;
  }

  const note = ui.quickAdjustNote.value.trim();
  const value = Math.max(1, Math.abs(Math.floor(Number(ui.quickAdjustValue.value) || 1)));
  const delta = ui.quickAdjustType.value === 'plus' ? value : -value;
  const label = ui.quickAdjustLabel.value.trim() || (delta > 0 ? '快速加分' : '快速扣分');

  applyDeltaToStudents(targets, label, delta, note);
  ui.quickAdjustLabel.value = '';
  ui.quickAdjustNote.value = '';
  ui.quickAdjustValue.value = String(getActiveBoard()?.settings.stepValue || 1);
  commitState(
    targets.length > 1
      ? `已为 ${targets.length} 名学生完成自定义${delta > 0 ? '加' : '减'}分。`
      : `${targets[0].name} 已完成自定义${delta > 0 ? '加' : '减'}分。`
  );
}

function purchaseAndReviveActivePet() {
  const board = getActiveBoard();
  const student = getSelectedStudent();
  const pet = getActivePet(student);
  if (!board || !student || !pet) {
    showToast('请先选中学生与宠物。');
    return;
  }

  if (!isPetDead(pet)) {
    showToast('宠物当前无需复活。');
    return;
  }

  const reviveItems = getReviveItems(board, student);
  if (reviveItems.length > 0) {
    reviveActivePet(reviveItems[0].id);
    return;
  }

  const reviveRule = getShopItems(board).find((item) => item.effectType === 'revive');
  if (!reviveRule || reviveRule.enabled === false) {
    showToast('当前商城没有上架复活币。');
    return;
  }

  if (!spendStudentPoints(student, reviveRule.cost, `购买${reviveRule.name}`, '宠物复活')) {
    showToast(`积分不足，无法购买${reviveRule.name}。`);
    return;
  }

  updateStudentInventory(student, reviveRule.id, 1);
  updateStudentInventory(student, reviveRule.id, -1);
  syncPetVitals(pet, { revive: true });
  commitState(`${activePetName(student)} 已花费 ${reviveRule.cost} 积分购买并立即使用${reviveRule.name}。`);
  reopenPetHomeLater();
}

function renderPetHomeModal(board, student) {
  const pets = getStudentPets(student);
  const activePet = getActivePet(student);
  const eggRule = getPetEggShopItem(board);
  const eggItems = getBackpackItems(board, student).filter((item) => item.effectType === 'pet-egg');
  const incubatingEggs = getIncubatingEggs(student);
  const feedItems = getFeedableItems(board, student);
  const reviveItems = getReviveItems(board, student);
  const backpackItems = getBackpackItems(board, student);
  const reviveRule = getShopItems(board).find((item) => item.effectType === 'revive') || null;
  const reviveCount = reviveItems.reduce((sum, item) => sum + item.count, 0);

  if (pets.length === 0 && eggItems.length === 0 && incubatingEggs.length === 0) {
    return `
      <div class="pet-modal-toolbar">
        <button class="mini-action mini-action-orange" type="button" data-action="open-shop">去积分商城兑换宠物蛋</button>
      </div>
      <section class="pet-hero-card pet-locked-card">
        <div>
          <p class="card-kicker">宠物家园未开启</p>
          <h3>${escapeHtml(student.name)} 还没有宠物蛋</h3>
          <p class="modal-help">开启宠物家园前，需要先兑换一枚宠物蛋。宠物蛋会进入孵化仓，默认孵化 7 天，也可以用积分加速。</p>
          <div class="preview-tag-row">
            <span class="preview-tag">当前积分 ${formatSignedScore(student.score)}</span>
            <span class="preview-tag">宠物蛋 ${eggRule?.cost || 100} 积分</span>
            <span class="preview-tag">图鉴 ${ALL_PET_SPECIES.length} 种</span>
          </div>
        </div>
        <div class="pet-empty-badge">🥚</div>
      </section>
      <section class="modal-panel">
        <h3>宠物图鉴</h3>
        <p class="modal-help">稀有度越高，基础属性越强，技能和战斗潜力也会更高。</p>
        ${renderPetSpeciesShowcase()}
      </section>
    `;
  }

  if (pets.length === 0) {
    return `
      <div class="pet-modal-toolbar">
        <button class="mini-action" type="button" data-action="open-shop">积分商城</button>
      </div>
      <section class="pet-hero-card pet-hatch-card">
        <div>
          <p class="card-kicker">孵化仓</p>
          <h3>${escapeHtml(student.name)} 的宠物家园正在准备中</h3>
          <p class="modal-help">待孵化宠物蛋 ${eggItems.reduce((sum, item) => sum + item.count, 0)} 枚，孵化仓中 ${incubatingEggs.length} 枚。默认孵化 7 天，每消耗 1 积分可减少 1 小时。</p>
          <div class="preview-tag-row">
            <span class="preview-tag">当前积分 ${formatSignedScore(student.score)}</span>
            <span class="preview-tag">默认孵化 7 天</span>
            <span class="preview-tag">1 积分 = 1 小时</span>
          </div>
        </div>
        <div class="pet-empty-badge">⏳</div>
      </section>
      ${eggItems.length > 0 ? `<section class="modal-panel"><h3>待孵化宠物蛋</h3><div class="pet-feed-grid">${eggItems.map((item) => `<article class="shop-card"><div class="shop-card-top"><span class="shop-card-icon">${escapeHtml(item.icon || getDefaultShopIcon(item.effectType))}</span><div><strong>${escapeHtml(item.name)}</strong><small>库存 ${item.count}</small></div></div><p class="modal-help">放入孵化仓后开始倒计时，期间可随时加速。</p><button class="mini-action mini-action-green" type="button" data-action="start-egg-incubation" data-item-id="${item.id}">放入孵化仓</button></article>`).join('')}</div></section>` : ''}
      ${incubatingEggs.length > 0 ? `<section class="modal-panel"><h3>孵化中的宠物蛋</h3><div class="pet-feed-grid">${renderIncubatingEggCards(student)}</div></section>` : ''}
      <section class="modal-panel">
        <h3>宠物图鉴</h3>
        ${renderPetSpeciesShowcase()}
      </section>
    `;
  }

  const species = getPetSpecies(activePet.speciesId);
  const progress = getPetProgress(activePet);
  const stats = getPetDerivedStats(activePet);
  const dead = isPetDead(activePet);
  const autoReviveLabel = reviveCount > 0
    ? `立即使用复活币（${reviveCount}）`
    : `花费${reviveRule?.cost || 10}积分立即复活`;
  const autoReviveHelp = reviveCount > 0
    ? '将优先消耗背包里的复活币，并立即回满生命与蓝量。'
    : `当前没有复活币，可直接花费 ${reviveRule?.cost || 10} 积分购买并自动使用。`;

  return `
    <div class="pet-modal-toolbar">
      <button class="mini-action" type="button" data-action="open-shop">积分商城</button>
      <button class="mini-action mini-action-green" type="button" data-action="open-pet-battle">宠物对战</button>
      <button class="mini-action" type="button" data-action="rename-active-pet">重命名宠物</button>
    </div>
    <section class="pet-hero-card" ${getPetThemeStyleAttribute(species.id)}>
      <div class="pet-hero-main">
        ${renderPetAvatarMarkup(species.id, activePet.name)}
        <div class="pet-hero-copy">
          <p class="card-kicker">当前宠物</p>
          <h3>${escapeHtml(activePet.name)}</h3>
          <p class="modal-help">${escapeHtml(species.name)} · ${escapeHtml(species.rarity)} · ${escapeHtml(getPetStage(progress.level))}</p>
          <div class="preview-tag-row">
            <span class="preview-tag">当前积分 ${formatSignedScore(student.score)}</span>
            <span class="preview-tag">战绩 ${activePet.wins}/${activePet.losses}</span>
            <span class="preview-tag">羁绊 ${activePet.bond}</span>
            <span class="preview-tag">喂养 ${activePet.feedCount} 次</span>
            <span class="preview-tag">复活币 ${reviveCount}</span>
            ${dead ? '<span class="preview-tag pet-dead-badge">已倒下</span>' : ''}
          </div>
          <div class="pet-vital-grid">
            <article class="pet-vital-card">
              ${renderPetVitalBar('生命值', activePet.currentHp, stats.maxHp, 'hp')}
              ${renderPetVitalBar('蓝量', activePet.currentMana, stats.maxMana, 'mana')}
            </article>
            <article class="pet-vital-card">
              <div class="preview-tag-row">
                <span class="preview-tag">攻击 ${stats.attackMin}-${stats.attackMax}</span>
                <span class="preview-tag">防御 ${stats.defense}</span>
                <span class="preview-tag">暴击 ${Math.round(stats.critRate * 100)}%</span>
                <span class="preview-tag">闪避 ${Math.round(stats.dodgeRate * 100)}%</span>
              </div>
              <p class="modal-help">${escapeHtml(species.description)}</p>
            </article>
          </div>
          <div class="pet-stat-grid">
            <article class="pet-stat-card"><strong>Lv.${progress.level}</strong><span>成长等级</span></article>
            <article class="pet-stat-card"><strong>${activePet.growth}</strong><span>累计成长值</span></article>
            <article class="pet-stat-card"><strong>${formatTimestamp(activePet.hatchedAt)}</strong><span>孵化时间</span></article>
            <article class="pet-stat-card"><strong>${escapeHtml(species.rarity)}</strong><span>稀有度</span></article>
          </div>
          <div class="pet-progress-shell">
            <div class="pet-progress-track">
              <div class="pet-progress-bar" style="width:${Math.max(6, progress.ratio * 100)}%"></div>
            </div>
            <small>距离下一等级还需 ${progress.remaining} 点成长值</small>
          </div>
          ${dead ? `<div class="pet-dead-box"><strong>宠物当前已倒下</strong><small>${autoReviveHelp}</small><div class="timer-actions"><button class="mini-action mini-action-orange" type="button" data-action="purchase-and-revive-pet">${autoReviveLabel}</button></div></div>` : ''}
        </div>
      </div>
    </section>
    <section class="modal-panel">
      <h3>互动与训练</h3>
      ${dead ? `<div class="empty-state">宠物倒下时无法互动，请先复活。</div>` : `<div class="pet-action-grid">${Object.entries(PET_INTERACTION_ACTIONS).map(([actionKey, action]) => `<article class="pet-action-card"><strong>${escapeHtml(action.label)}</strong><p class="modal-help">${escapeHtml(action.description)}</p><div class="preview-tag-row"><span class="preview-tag">消耗 ${action.cost} 积分</span><span class="preview-tag">成长 +${action.growthGain}</span><span class="preview-tag">羁绊 +${action.bondGain}</span><span class="preview-tag">${action.hpGain >= 0 ? `生命 +${action.hpGain}` : `生命 ${action.hpGain}`}</span><span class="preview-tag">${action.manaGain >= 0 ? `蓝量 +${action.manaGain}` : `蓝量 ${action.manaGain}`}</span></div><button class="mini-action mini-action-green" type="button" data-action="pet-interact" data-mode="${actionKey}" ${student.score >= action.cost ? '' : 'disabled'}>${escapeHtml(action.label)}</button></article>`).join('')}</div>`}
    </section>
    <section class="modal-panel">
      <h3>技能学习</h3>
      <div class="pet-skill-grid">${renderPetSkillCards(activePet, student)}</div>
    </section>
    <section class="modal-panel">
      <h3>喂养区</h3>
      ${feedItems.length > 0 ? `<div class="pet-feed-grid">${feedItems.map((item) => `<article class="shop-card"><div class="shop-card-top"><span class="shop-card-icon">${escapeHtml(item.icon || getDefaultShopIcon(item.effectType))}</span><div><strong>${escapeHtml(item.name)}</strong><small>库存 ${item.count} · 成长 +${item.growthGain}</small></div></div><p class="modal-help">${escapeHtml(item.description || '喂养后可提升成长值并恢复部分状态。')}</p><button class="mini-action mini-action-orange" type="button" data-action="feed-active-pet" data-item-id="${item.id}" ${dead ? 'disabled' : ''}>喂养一次</button></article>`).join('')}</div>` : `<div class="empty-state">背包里还没有可喂养的零食，先去积分商城兑换吧。</div>`}
    </section>
    ${eggItems.length > 0 ? `<section class="modal-panel"><h3>待孵化宠物蛋</h3><div class="pet-feed-grid">${eggItems.map((item) => `<article class="shop-card"><div class="shop-card-top"><span class="shop-card-icon">${escapeHtml(item.icon || getDefaultShopIcon(item.effectType))}</span><div><strong>${escapeHtml(item.name)}</strong><small>库存 ${item.count}</small></div></div><p class="modal-help">放入孵化仓后开始 7 天倒计时。</p><button class="mini-action mini-action-green" type="button" data-action="start-egg-incubation" data-item-id="${item.id}">放入孵化仓</button></article>`).join('')}</div></section>` : ''}
    ${incubatingEggs.length > 0 ? `<section class="modal-panel"><h3>孵化中的宠物蛋</h3><div class="pet-feed-grid">${renderIncubatingEggCards(student)}</div></section>` : ''}
    <section class="modal-panel">
      <h3>宠物名单</h3>
      <div class="pet-collection-grid">${renderPetCollectionCards(student)}</div>
    </section>
    <section class="modal-panel">
      <h3>背包</h3>
      ${backpackItems.length > 0 ? `<div class="preview-tag-row">${backpackItems.map((item) => `<span class="preview-tag">${escapeHtml(item.icon || getDefaultShopIcon(item.effectType))} ${escapeHtml(item.name)} × ${item.count}</span>`).join('')}</div>` : `<div class="empty-state">当前背包还是空的。</div>`}
    </section>
  `;
}

function openPetHomeModal() {
  const board = getActiveBoard();
  const student = getSelectedStudent();
  if (!board || !student) {
    showToast('请先选中学生，再打开宠物家园。');
    return;
  }

  openModal({
    title: '宠物家园',
    hideSubmit: true,
    cancelText: '关闭',
    html: renderPetHomeModal(board, student),
    onOpen: (body) => {
      const handleClick = (event) => {
        const actionNode = event.target.closest('[data-action]');
        const action = actionNode?.dataset.action;
        const itemId = actionNode?.dataset.itemId || '';
        const petId = actionNode?.dataset.petId || '';
        const mode = actionNode?.dataset.mode || '';
        const skillId = actionNode?.dataset.skillId || '';
        const eggId = actionNode?.dataset.eggId || '';
        const hours = actionNode?.dataset.hours || '';
        if (!action) {
          return;
        }

        if (action === 'open-shop') {
          openShopModal();
          return;
        }
        if (action === 'open-pet-battle') {
          openPetBattleModal();
          return;
        }
        if (action === 'start-egg-incubation') {
          startEggIncubation(itemId);
          return;
        }
        if (action === 'accelerate-egg') {
          accelerateIncubatingEgg(eggId, hours);
          return;
        }
        if (action === 'accelerate-egg-max') {
          accelerateIncubatingEgg(eggId, 'max');
          return;
        }
        if (action === 'claim-ready-egg') {
          hatchStudentPet(eggId);
          return;
        }
        if (action === 'feed-active-pet') {
          feedActivePet(itemId);
          return;
        }
        if (action === 'pet-interact') {
          interactWithActivePet(mode);
          return;
        }
        if (action === 'learn-pet-skill') {
          learnSkillForActivePet(skillId);
          return;
        }
        if (action === 'revive-active-pet') {
          reviveActivePet(itemId);
          return;
        }
        if (action === 'purchase-and-revive-pet') {
          purchaseAndReviveActivePet();
          return;
        }
        if (action === 'select-pet') {
          setActivePet(student, petId);
          petBattleState = null;
          commitState(`已切换到宠物 ${activePetName(student)}。`);
          reopenPetHomeLater();
          return;
        }
        if (action === 'rename-active-pet') {
          openRenameActivePetModal();
        }
      };

      body.addEventListener('click', handleClick);
      return () => {
        body.removeEventListener('click', handleClick);
      };
    }
  });
}
