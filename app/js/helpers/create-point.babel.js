
import makeID from './makeID';
import createSegment from './create-segment';

export default (data, i=0) => {
  const { x, y, name, time } = data;

  return {
    id:           makeID(),
    name:         name || `point${i+1}`,
    isOpen:       true,
    isSelected:   false,
    currentProps: {x, y},
    // start:        0,
    // end:          0,
    props: {
      x: [ createSegment({ startValue: x, delay: time }) ],
      y: [ createSegment({ startValue: y, delay: time }) ]
    }
  };
};
