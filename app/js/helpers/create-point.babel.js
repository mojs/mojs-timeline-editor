
import makeID from './makeID';
import createSpot from './create-spot';

export default (data, i=0) => {
  const { x, y, name, time } = data;

  return {
    id:           makeID(),
    name:         name || `point${i+1}`,
    isOpen:       true,
    isSelected:   false,
    currentProps: {x, y},
    props: {
      x: [ createSpot({ startValue: x, delay: time }) ],
      y: [ createSpot({ startValue: y, delay: time }) ]
    }
  };
};
