import { combineReducers } from 'redux';
import recycleState from 'redux-recycle';
import mainPanel from './main-panel-reducer';
import controls from './controls-reducer';
import points from './points-reducer';

const reducer = recycleState(combineReducers({
  mainPanel,
  controls,
  points
}), ['SET_APP_STATE'], (state, action) => action.data );

export default reducer;
