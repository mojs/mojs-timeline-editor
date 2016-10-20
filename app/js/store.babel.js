import {createStore} from 'redux';
import reducer from './reducers/index-reducer';

const initStore = () => { return createStore( reducer ); }

export default initStore;