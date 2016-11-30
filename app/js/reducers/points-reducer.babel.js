import C from '../constants';
import createPoint from '../helpers/create-point';

const INITIAL_STATE = [];

const insertPoint = (state=INITIAL_STATE, action) => {
  const {data} = action;

  switch (action.type) {

  case 'ADD_POINT': {
    return [...state, createPoint(data)];
  }

  }

  return state;
};

export default insertPoint;
