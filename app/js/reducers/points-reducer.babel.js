import C from '../constants';

import getLast       from '../helpers/get-last';
import createPoint   from '../helpers/create-point';
import createSegment from '../helpers/create-segment';
import change from '../helpers/change';

const INITIAL_STATE = {};

const resetSelectedPoints = (state) => {
  const newState = {};
  const props = Object.keys(state);

  for (let i = 0; i < props.length; i++) {
    const prop = props[i];
    newState[prop] = { ...state[i], isSelected: false };
  }
  return newState;
};

const ensureTimeBounds = (prop, i = 0, start=0) => {
  if (i >= prop.length) { return; }
  const item = prop[i];
  const prevItem = prop[i-1];
  /* calculate start and end bounds */
  item.start.time = start;
  item.end.time   = start + item.delay + item.duration;
  ensureTimeBounds(prop, i+1, item.end.time);
};

const addPropertySegment = (segments, name, data) => {
  const prevSpot = getLast(segments);
  const isChanged = segments.length > 1 || segments[0].isChanged;
  const isUpdate = !isChanged && segments[0].duration === C.MIN_DURATION;

  if (isUpdate) {
    segments[0].end.value = data[name];
    segments[0].duration = (data.time - segments[0].delay);
  // if not - create entirely new segement
  } else {
    const duration = (data.time - prevSpot.end.time);
    segments.push(
      createSegment({
        index:      segments.length + 1,
        startValue: prevSpot.endValue,
        endValue:   data[name],
        duration
      })
    );
  }
  ensureTimeBounds(segments);
  return segments;
};


const points = (state=INITIAL_STATE, action) => {
  const {data} = action;

  switch (action.type) {

  case 'ADD_POINT': {
    const newState = resetSelectedPoints(state);
    const point = createPoint(data, newState.length);
    newState[point.id] = point;
    return newState;
  }
  case 'SELECT_POINT': {
    return change( state, [data, 'isSelected'], state => !state );
  }
  case 'TOGGLE_OPEN_POINT': {
    return change(state,[ data, 'isOpen' ], state => !state);
  }
  case 'ADD_SPOT': {
    const {x, y, id} = data;
    return change(state,
      [id, 'props', C.POSITION_NAME],
      segments => addPropertySegment([...segments], C.POSITION_NAME, data)
    );
  }

  case 'ADD_PROPERTY_SEGMENT': {
    const {id, name, time} = data;

    return change(state,
      [id, 'props', name],
      segments => addPropertySegment([...segments], C.POSITION_NAME, data)
    );
  }

  case 'CHANGE_POINT_CURRENT_POSITION': {
    return change(state, [data.id, 'currentProps'], (obj) => {
      const {deltaX: dX, deltaY: dY} = data;
      const pos = obj[C.POSITION_NAME];
      return {...obj, [C.POSITION_NAME]: [pos[0] + dX, pos[1] + dY] };
    });
  }

  case 'SHIFT_SEGMENT': {
    const {id, prop, spotIndex} = data;

    const newState = change(state, [id, 'props', prop, spotIndex],
      (prop) => {
        const {delay=0, duration=0} = data;

        return {
          ...prop,
          duration: Math.max((prop.duration + duration), C.MIN_DURATION),
          delay: Math.max((prop.delay + delay), 0)
        };
      }
    );

    ensureTimeBounds(newState[data.id].props[data.prop]);
    return newState;
  }

  case 'TOGGLE_SPOT_SELECTION': {
    const {id, prop, spotIndex, type} = data;

    return change(state,
      [id, 'props', prop, spotIndex, type, 'isSelected'],
      state => !state
    );
  }

  }

  return state;
};

export default points;
