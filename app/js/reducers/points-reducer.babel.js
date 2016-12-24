import C from '../constants';

import getLast       from '../helpers/get-last';
import createPoint   from '../helpers/create-point';
import createSegment from '../helpers/create-segment';

const INITIAL_STATE = [];

const resetSelected = (state) => {
  const newState = [];
  for (let i = 0; i < state.length; i++) {
    newState[i] = { ...state[i], isSelected: false };
  }
  return newState;
};

const togglePoint = (state, id) => {
  const newState = [];
  for (let i = 0; i < state.length; i++) {
    const newPoint = { ...state[i] };
    if (newPoint.id === id) { newPoint.isOpen = !newPoint.isOpen; }
    newState[i] = newPoint;
  }
  return newState;
};

const selectPoint = (state, id) => {
  const newState = [];
  for (let i = 0; i < state.length; i++) {
    const newPoint = { ...state[i] };
    if (newPoint.id === id) { newPoint.isSelected = !newPoint.isSelected; }
    else { newPoint.isSelected = false; }
    newState[i] = newPoint;
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

const shiftSegment = (state, data) => {
  const newState = [];
  for (let i = 0; i < state.length; i++) {
    const newPoint = { ...state[i] };
    newState[i] = newPoint;
    if (newPoint.id === data.id) {
      const prop = [ ...newPoint.props[data.prop] ];
      newPoint.props[data.prop] = prop;
      const i = data.spotIndex;
      prop[i].duration += data.duration || 0;
      prop[i].delay    += data.delay || 0;
      prop[i].duration = Math.max(prop[i].duration, C.MIN_DURATION);
      prop[i].delay    = Math.max(prop[i].delay, 0);
      ensureTimeBounds(prop);
    }
  }
  return newState;
};

const setPointPosition = (state, {deltaX, deltaY, id}) => {
  const newState = [];
  for (let i = 0; i < state.length; i++) {
    const newPoint = {...state[i]};
    newState.push( newPoint );
    if (newPoint.id === id) {
      const {x, y} = newPoint.currentProps;
      newPoint.currentProps = { x: x+deltaX, y: y+deltaY };
    }
  }
  return newState;
};

const addPropertySegment = (props, name, data, endValue) => {
  const spots = [...props[name]];
  props[name] = spots;

  const prevSpot = getLast(spots);
  // if very first unchanged segment - alter it's tail
  const isChanged = spots.length > 1 || spots[0].isChanged;
  const isUpdate = !isChanged && spots[0].duration === C.MIN_DURATION;
  if (isUpdate) {
    spots[0].end.value = endValue;
    spots[0].duration = (data.time - spots[0].delay);
  // if not - create entirely new segement
  } else {
    const duration = (data.time - prevSpot.end.time);
    spots.push(
      createSegment({
        index:      spots.length + 1,
        startValue: prevSpot.endValue,
        endValue,
        duration
      })
    );
  }
  ensureTimeBounds(spots);
};

const addSpot = (state, data) => {
  const newState = [];
  for (let i = 0; i < state.length; i++) {
    const newPoint = {...state[i]};
    newState.push( newPoint );
    if (newPoint.id === data.id) {
      const {x, y} = newPoint.currentProps;
      const props = { ...newPoint.props };
      newPoint.props = props;
      addPropertySegment(props, 'x', data, x);
      addPropertySegment(props, 'y', data, y);
    }
  }
  return newState;
};

const createPropertySegment = (state, data) => {
  const newState = [];
  for (let i = 0; i < state.length; i++) {
    const newPoint = {...state[i]};
    newState.push( newPoint );
    if (newPoint.id === data.id) {
      const {name} = data;
      const props = { ...newPoint.props };
      newPoint.props = props;
      addPropertySegment(props, name, data, newPoint.currentProps[name]);
    }
  }
  return newState;
};

// const setSpotSelection = (state, data) => {
//   const newState = [];
//
//   console.log('setSpotSelection', data);
//
//   for (let i = 0; i < state.length; i++) {
//     const point = { ...state[i] };
//     newState.push(point);
//     if (point.id === data.id) {
//       point.props = {...point.props};
//       point.props[data.prop] = [...point.props[data.prop]];
//       const segments = point.props[data.prop];
//       segments[data.spotIndex] = {...segments[data.spotIndex]};
//       const segment = segments[data.spotIndex];
//       segment[data.type] = {...segment[data.type]};
//       const spot = segment[data.type];
//       spot.isSelected = true;
//
//       if (spot.connected === 'prev' && data.spotIndex > 0) {
//         segments[data.spotIndex-1] = {...segments[data.spotIndex-1]};
//         const prevSegment = segments[data.spotIndex-1];
//         const spot = prevSegment.end;
//         spot.isSelected = true;
//       }
//
//     }
//   }
//   return newState;
// };


const toggleSpotSelection = (state, data) => {
  const newState = [];

  console.log('setSpotSelection', data);

  for (let i = 0; i < state.length; i++) {
    const point = { ...state[i] };
    newState.push(point);
    if (point.id === data.id) {
      point.props = {...point.props};
      point.props[data.prop] = [...point.props[data.prop]];
      const prop = point.props[data.prop];

      const segments = point.props[data.prop];
      segments[data.spotIndex] = {...segments[data.spotIndex]};
      const segment = segments[data.spotIndex];
      segment[data.type] = {...segment[data.type]};
      const spot = segment[data.type];
      spot.isSelected = !spot.isSelected;

      if (spot.connected === 'prev' && data.spotIndex > 0) {
        segments[data.spotIndex-1] = {...segments[data.spotIndex-1]};
        const prevSegment = segments[data.spotIndex-1];
        const prevSpot = prevSegment.end;
        prevSpot.isSelected = spot.isSelected;
      }

      if (spot.connected === 'next' && data.spotIndex < prop.length-2) {
        segments[data.spotIndex+1] = {...segments[data.spotIndex+1]};
        const nextSegment = segments[data.spotIndex+1];
        const nextSpot = nextSegment.start;
        nextSpot.isSelected = spot.isSelected;
      }

    }
  }
  return newState;
};

const insertPoint = (state=INITIAL_STATE, action) => {
  const {data} = action;

  switch (action.type) {

  case 'ADD_POINT': {
    const newState = resetSelected(state);
    newState.push( createPoint(data, newState.length) );
    return newState;
  }

  case 'ADD_SPOT': { return addSpot(state, data); }

  case 'ADD_PROPERTY_SEGMENT': {
    return createPropertySegment(state, data);
  }

  case 'TOGGLE_OPEN_POINT': {
    return togglePoint(state, data);
  }

  case 'SELECT_POINT': {
    return selectPoint(state, data);
  }

  case 'SHIFT_SEGMENT': {
    return shiftSegment(state, data);
  }

  case 'CHANGE_POINT_CURRENT_POSITION': {
    return setPointPosition(state, data);
  }

  // case 'SELECT_SPOT': {
  //   return setSpotSelection(state, data);
  // }

  case 'TOGGLE_SPOT_SELECTION': {
    return toggleSpotSelection(state, data);
  }

  }

  return state;
};

export default insertPoint;
