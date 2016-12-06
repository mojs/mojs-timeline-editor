import C from '../constants';
import createPoint from '../helpers/create-point';

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

const shiftSpot = (state, data) => {
  const newState = [];
  for (let i = 0; i < state.length; i++) {
    const newPoint = { ...state[i] };
    newState[i] = newPoint;
    // console.log(newPoint.props.x.spots[2]);
    if (newPoint.id === data.id) {
      const prop = { ...newPoint.props[data.prop] };
      newPoint.props[data.prop] = prop;
      const spots = [...prop.spots];
      prop.spots = spots;
      for (let j = data.spotIndex; j < spots.length; j++) {
        const spot = { ...spots[j] };
        spot.time += data.value;
        spots[j] = spot;
      }
    }
    // console.log(newPoint.props.x.spots[2]);
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

  case 'TOGGLE_OPEN_POINT': {
    return togglePoint(state, data);
  }

  case 'SELECT_POINT': {
    return selectPoint(state, data);
  }

  case 'SHIFT_SPOT': {
    return shiftSpot(state, data);
  }

  }

  return state;
};

export default insertPoint;
