
// const point1 = createPoint({ x: 10, y: 300 });
// const point2 = createPoint({ x: 100, y: 200 });
// const point3 = createPoint({ x: 30, y: 20 });
//
// const OBJ = {
//   [point1.id]: point1,
//   [point2.id]: point2,
//   [point3.id]: point3
// };

// console.log(change(OBJ, [point2.id, 'props', 'x', 0, 'end', 'isSelected'], (state) => !state )[point2.id]);

import getLast from './get-last';

const copy = (obj) => { return (obj instanceof Array) ? [...obj] : {...obj}; };

export default (obj, path, value) => {
  const newState = copy(obj);
  let current = newState;

  // copy everything in the current path
  for (let i = 0; i < path.length-1; i++) {
    const point = path[i];
    current[point] = copy(current[point]);
    current = current[point];
  }

  // update the `last property` in the `path`
  const leaf = getLast(path);
  current[leaf] = (typeof value === 'function')
    ? value(current[leaf]) : value;

  return newState;
};
