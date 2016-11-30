import { combineReducers } from 'redux';
import recycleState from 'redux-recycle';
import mainPanel from './main-panel-reducer';
import controls from './controls-reducer';
import insertPoint from './insert-point-reducer';

const reducer = recycleState(combineReducers({
  mainPanel,
  controls,
  insertPoint
}), ['SET_APP_STATE'], (state, action) => action.data );

export default reducer;
