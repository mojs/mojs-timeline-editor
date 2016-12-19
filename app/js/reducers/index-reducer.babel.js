import { combineReducers } from 'redux';
import recycleState from 'redux-recycle';
import progress from './progress-reducer';
import mainPanel from './main-panel-reducer';
import controls from './controls-reducer';
import points from './points-reducer';

const reducer = recycleState(combineReducers({
  progress,
  mainPanel,
  controls,
  points
}), ['SET_APP_STATE'], (state, action) => action.data );

export default reducer;
