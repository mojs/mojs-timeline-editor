import makeID from './makeID';
const listeners = {};

const onClick = (e) => {
  const keys = Object.keys(listeners);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const listener = listeners[key];
    if (typeof listener === 'function') { listener(e); }
  }
};

const add = (fun) => {
  const id = makeID();
  listeners[id] = fun;
  return id;
};

const remove = (id) => { delete listeners[id]; };

document.addEventListener('click', onClick);
export default { add, remove };
