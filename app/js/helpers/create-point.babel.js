
import makeID from './makeID';
import createSegment from './create-segment';

export default (data, i=0) => {
  const { x, y, name, time } = data;

  return {
    id:           makeID(),
    name:         name || `point${i+1}`,
    isOpen:       true,
    isSelected:   false,
    currentProps: { ['x / y']: [x, y] },
    selectedSpot: {
      prop:     null,
      segment:  0,
      type:     null
    },
    props: {
      ['x / y']: [ createSegment({ startValue: [x, y], delay: time }) ]
    }
  };
};
