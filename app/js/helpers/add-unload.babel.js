/*
  Function to add cross-browser `unload` event.
  @param {Function} Callback for the event.
*/
export default (fn) => {
  const unloadEvent = ('onpagehide' in window) ? 'pagehide' : 'beforeunload';
  window.addEventListener( unloadEvent, fn);
};