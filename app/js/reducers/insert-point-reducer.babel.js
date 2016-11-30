import C from '../constants';

const INITIAL_STATE = {
  x: 0,
  y: 0
};

const insertPoint = (state=INITIAL_STATE, action) => {
  const {data} = action;

  switch (action.type) {

  case 'INSERT_POINT_SET_POSITION': {
    return {...state, ...data};
  }

  }

  return state;
};

export default insertPoint;
