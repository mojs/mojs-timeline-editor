import C from '../constants';

import getLast       from '../helpers/get-last';
import createPoint   from '../helpers/create-point';
import createSegment from '../helpers/create-segment';
import change        from '../helpers/change';

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

const addSegment = (segments, name, data, current) => {
  const prevSpot = getLast(segments);
  const isChanged = segments.length > 1 || segments[0].isChanged;
  const isUpdate = !isChanged && segments[0].duration === C.MIN_DURATION;

  if (isUpdate) {
    segments[0].end.value = current[name];
    segments[0].duration = (data.time - segments[0].delay);
  // if not - create entirely new segement
  } else {
    const duration = (data.time - prevSpot.end.time);
    segments.push(
      createSegment({
        index:      segments.length,
        startValue: prevSpot.end.value,
        endValue:   current[name],
        duration
      })
    );
  }
  ensureTimeBounds(segments);
  return segments;
};

const updateSpot = (currentValue, input) => {
  const {index, value} = input;
  // if value is array - update the item in index
  if (!(currentValue instanceof Array)) { return value; }

  const newValue = [...currentValue];
  newValue[index] = value;
  return newValue;
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
  case 'ADD_SNAPSHOT': {
    const {id} = data;
    const current = state[id].currentProps;

    const props = Object.keys(current);
    let newState = state;
    for (let i = 0; i < props.length; i++) {
      const name = props[i];
      newState = change(newState,
        [id, 'props', name],
        segments => addSegment([...segments], name, data, current)
      );
    }

    return newState;
  }

  case 'ADD_PROPERTY_SEGMENT': {
    const {id, name, time} = data;
    const current = state[id].currentProps;

    return change(state,
      [id, 'props', name],
      segments => addSegment([...segments], name, data, current)
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

  case 'ADD_POINT_PROPERTY': {
    const {name, count} = data.property;
    const value = Array(count).fill(0);

    const newState = change(state,
      [data.id, 'props'],
      (props) => {
        props[name] = [createSegment({ startValue: value, endValue: value })];
        return props;
      }
    );

    return change(newState,
      [data.id, 'currentProps'],
      (props) => {
        props[name] = value;
        return props;
      }
    );
  }

  case 'UPDATE_SELECTED_SPOT': {
    const {values, id, type, spotIndex, prop, value} = data;
    const segments = state[id].props[prop];
    const len = Object.keys(segments).length;

    const newState = change(state,
      [id, 'props', prop, spotIndex, type, 'value'], value );

    const spot = state[id].props[prop][spotIndex][type];
    if (spot.connected === 'prev' && spotIndex > 0) {
      return change(newState,
        [id, 'props', prop, spotIndex-1, 'end', 'value'], value );
    }

    if (spot.connected === 'next' && spotIndex < len-1) {
      return change(newState,
        [id, 'props', prop, spotIndex+1, 'start', 'value'], value);
    }

    return newState;
  }

  case 'UPDATE_SELECTED_SPOT_CURRENT': {
    const {value, name} = data;

    return change(state, [data.id, 'currentProps'],
      (currentProps) => {
        currentProps[name] = value;
        return currentProps;
      }
    );
  }

  }

  return state;
};

export default points;
