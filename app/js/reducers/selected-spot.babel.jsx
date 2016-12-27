import C from '../constants';

const INITIAL_STATE = {
  id:         null,
  spotIndex:  null,
  type:       null,
  prop:       null
};

const progress = (state=INITIAL_STATE, action) => {
  const {data} = action;

  switch (action.type) {

  case 'SET_SELECTED_SPOT': { return { ...data }; }

  case 'RESET_SELECTED_SPOT': { return INITIAL_STATE; }

  }

  return state;
};

export default progress;
