
import md5 from 'md5';

const createSpot = (o={}) => {
  return {
    currentValue: o.currentValue || 0,
    startValue: o.startValue || 0,
    endValue:   o.endValue || 0,
    delay:      o.delay || parseInt(Math.random()*500, 10),
    duration:   o.duration || 500 + parseInt(Math.random()*2000, 10),
    isSelected: o.isSelected || false,
    connected:  o.connected || null
  };
};

export default (data, i=0) => {
  const { x, y, name } = data;

  return {
    id:         md5( `${Math.random()}${Math.random()}` ),
    name:       name || `point${i+1}`,
    isOpen:     true,
    isSelected: true,
    currentProps: {x, y},
    props: {
      x: {
        currentSpot: 0,
        spots: [
          createSpot({ startValue: x }),
          createSpot(),
          createSpot()
        ]
      },
      y: {
        currentSpot: 0,
        spots: [
          createSpot({ startValue: y }),
          createSpot(),
          createSpot()
        ]
      }
    }
  };
};
