import { combineReducers } from 'redux';
import recycleState from 'redux-recycle';
import mainPanel from './main-panel-reducer';

const reducer = recycleState(combineReducers({
  mainPanel
}), ['SET_APP_STATE'], (state, action) => action.data );

export default reducer;