
import C from '../constants';
import makeID from './makeID';
import createSegment from './create-segment';

export default (data, i=0) => {
  const { x, y, name, time } = data;

  return {
    id:           makeID(),
    name:         name || `point${i+1}`,
    isOpen:       true,
    isSelected:   false,
    currentProps: { [C.POSITION_NAME]: [x, y] },
    // selectedSpot: {
    //   prop:     null,
    //   segment:  0,
    //   type:     null
    // },
    props: {
      [C.POSITION_NAME]: [ createSegment({
        startValue: [x, y],
        endValue: [x, y],
        delay: time
      }) ]
    }
  };
};
