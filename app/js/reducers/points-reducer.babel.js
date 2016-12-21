import C from '../constants';
import createPoint from '../helpers/create-point';
import createSpot from '../helpers/create-spot';

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

const ensureEndTimes = (prop, i = 0, start=0) => {
  if (i >= prop.length) { return; }
  prop[i].timeEnd = start + prop[i].delay + prop[i].duration;
  ensureEndTimes(prop, i+1, prop[i].timeEnd);
};

const shiftSpot = (state, data) => {
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
      prop[i].duration = Math.max(prop[i].duration, 40);
      prop[i].delay    = Math.max(prop[i].delay, 0);
      ensureEndTimes(prop);
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

const addPropertySpot = (props, name, data, endValue) => {
  const spots = [...props[name]];
  props[name] = spots;

  const prevSpot = spots[spots.length-1];
  // if very first unchanged segment - alter it's tail
  const isChanged = spots.length > 1 || spots[0].isChanged;
  const isUpdate = !isChanged && spots[0].duration === C.MIN_DURATION;
  if (isUpdate) {
    spots[0].endValue = endValue;
    spots[0].duration = (data.time - spots[0].delay);
    ensureEndTimes(spots);
  // if not - create entirely new segement
  } else {
    const duration = (data.time - prevSpot.timeEnd);
    spots.push(
      createSpot({
        index:      spots.length + 1,
        startValue: prevSpot.endValue,
        timeEnd:    prevSpot.timeEnd + duration,
        endValue,
        duration
      })
    );
  }

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
      addPropertySpot(props, 'x', data, x);
      addPropertySpot(props, 'y', data, y);
    }
  }
  return newState;
};

const createPropertySpot = (state, data) => {
  const newState = [];
  for (let i = 0; i < state.length; i++) {
    const newPoint = {...state[i]};
    newState.push( newPoint );
    if (newPoint.id === data.id) {
      const {name} = data;
      const props = { ...newPoint.props };
      newPoint.props = props;
      addPropertySpot(props, name, data, newPoint.currentProps[name]);
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

  case 'ADD_SPOT': {
    return addSpot(state, data);
  }

  case 'ADD_PROPERTY_SPOT': {
    return createPropertySpot(state, data);
  }

  case 'TOGGLE_OPEN_POINT': {
    return togglePoint(state, data);
  }

  case 'SELECT_POINT': {
    return selectPoint(state, data);
  }

  case 'SHIFT_SPOT': {
    return shiftSpot(state, data);
  }

  case 'CHANGE_POINT_CURRENT_POSITION': {
    return setPointPosition(state, data);
  }

  }

  return state;
};

export default insertPoint;
