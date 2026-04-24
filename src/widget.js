const widgetShell = document.getElementById('widgetShell');
const toggleButton = document.getElementById('toggleMainButton');
const menuButton = document.getElementById('widgetMenuButton');
const DRAG_THRESHOLD = 6;

let dragSession = null;
let suppressClick = false;

function clearDragVisualState() {
  document.body.classList.remove('is-pressing');
  document.body.classList.remove('is-dragging');
}

function resetSuppressClickSoon() {
  window.setTimeout(() => {
    suppressClick = false;
  }, 0);
}

function handleActionClick(action) {
  return (event) => {
    if (suppressClick) {
      suppressClick = false;
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    action();
  };
}

function finishDrag(pointerId = null) {
  if (!dragSession || (pointerId !== null && dragSession.pointerId !== pointerId)) {
    return;
  }

  const wasDragging = dragSession.dragging;
  const activePointerId = dragSession.pointerId;
  dragSession = null;
  clearDragVisualState();
  if (widgetShell.hasPointerCapture?.(activePointerId)) {
    widgetShell.releasePointerCapture(activePointerId);
  }
  if (wasDragging) {
    window.classScore.endWidgetDrag();
    resetSuppressClickSoon();
  }
}

widgetShell.addEventListener('pointerdown', (event) => {
  if (event.button !== 0) {
    return;
  }

  dragSession = {
    pointerId: event.pointerId,
    startScreenX: event.screenX,
    startScreenY: event.screenY,
    dragging: false
  };
  suppressClick = false;
  document.body.classList.add('is-pressing');
  widgetShell.setPointerCapture?.(event.pointerId);
});

widgetShell.addEventListener('pointermove', (event) => {
  if (!dragSession || dragSession.pointerId !== event.pointerId) {
    return;
  }

  const distance = Math.hypot(
    event.screenX - dragSession.startScreenX,
    event.screenY - dragSession.startScreenY
  );

  if (!dragSession.dragging && distance >= DRAG_THRESHOLD) {
    dragSession.dragging = true;
    suppressClick = true;
    document.body.classList.remove('is-pressing');
    document.body.classList.add('is-dragging');
    window.classScore.startWidgetDrag(dragSession.startScreenX, dragSession.startScreenY);
  }

  if (dragSession.dragging) {
    window.classScore.updateWidgetDrag(event.screenX, event.screenY);
  }
});

widgetShell.addEventListener('pointerup', (event) => {
  finishDrag(event.pointerId);
});

widgetShell.addEventListener('pointercancel', (event) => {
  finishDrag(event.pointerId);
});

widgetShell.addEventListener('lostpointercapture', (event) => {
  finishDrag(event.pointerId);
});

toggleButton.addEventListener('click', handleActionClick(() => {
  window.classScore.toggleMainWindow();
}));

menuButton.addEventListener('click', handleActionClick(() => {
  window.classScore.openWidgetMenu();
}));

document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
  window.classScore.openWidgetMenu();
});

window.classScore.onWidgetState((payload) => {
  const modeClass = `mode-${payload.mode || 'idle'}`;
  toggleButton.className = `widget-button ${modeClass}`;
  toggleButton.title = payload.boardName
    ? `${payload.boardName} · ${payload.primaryText || '待命'}`
    : '显示或隐藏主窗口';
});
