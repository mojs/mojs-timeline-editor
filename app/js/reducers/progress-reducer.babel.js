import C from '../constants';
import clamp from '../helpers/clamp';

const INITIAL_STATE = 0;
const progress = (state=INITIAL_STATE, action) => {
  const {data} = action;

  switch (action.type) {

  case 'SET_PROGRESS': { return data; }

  }

  return state;
};

export default progress;
