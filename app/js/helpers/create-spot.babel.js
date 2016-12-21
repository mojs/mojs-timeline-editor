import C from '../constants';

export default (o={}) => {
  const delay    = o.delay || 0;
  const duration = o.duration || C.MIN_DURATION;

  return {
    index:      0,
    isChanged:  false, // if was changed by user
    startValue: 0,
    endValue:   0,
    isSelected: false,
    timeEnd:    delay + duration,
    delay, duration,
    ...o
  };
};
