import C from '../constants';

const INITIAL_STATE = {
  selected:      null,
  isMouseInside: false
};

const controls = (state=INITIAL_STATE, action) => {
  const {data} = action;

  switch (action.type) {

  case 'TOOLS_SET_SELECTED': {
    const selected = (data === state.selected) ? null : data;
    return {...state, selected};
  }
  case 'TOOLS_RESET_SELECTED': {
    return {...state, selected: null};
  }

  case 'CONTROLS_SET_MOUSE_INSIDE': {
    return {...state, isMouseInside: data};
  }

  }
  return state;
};

export default controls;
