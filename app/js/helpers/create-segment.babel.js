import C from '../constants';

import createSpot from './create-spot';
import fallback from './fallback';

export default (o={}) => {
  const delay    = o.delay    || 0;
  const duration = o.duration || C.MIN_DURATION;
  const start    = o.start    || 0;

  return {
    index: fallback(o.index, 0),
    start: createSpot({
      time:  start,
      value: o.startValue,
      connected: 'prev'
    }),
    end:   createSpot({
      time:  start + delay + duration,
      value: o.endValue,
      connected: 'next'
    }),
    isChanged:  false, // if was changed by the user
    isSelected: false,
    delay, duration
  };
};
