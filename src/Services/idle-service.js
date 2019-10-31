let _timeoutId;
let _idleCallback = null;
let _notIdleEvents = [
  "mousedown",
  "mousemove",
  "keypress",
  "scroll",
  "touchstart"
];

let _FIVE_MINUTES_IN_MS = 5 * 60 * 1000;

const IdleService = {
  setIdleCallBack(idleCallback) {
    _idleCallback = idleCallback;
  },

  resetIdleTimer(ev) {
    clearTimeout(_timeoutId);
    _timeoutId = setTimeout(_idleCallback, _FIVE_MINUTES_IN_MS);
  },

  registerIdleTimerResets() {
    _notIdleEvents.forEach(ev =>
      document.addEventListener(ev, IdleService.resetIdleTimer, true)
    );
  },

  unRegisterIdleResets() {
    clearTimeout(_timeoutId);
    _notIdleEvents.forEach(ev =>
      document.removeEventListener(ev, IdleService.resetIdleTimer, true)
    );
  }
};

export default IdleService;
