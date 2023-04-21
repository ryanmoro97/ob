import { combineReducers, createStore } from 'redux';
import { filtersReducer } from './filters';
import { tableReducer } from './table';
import { modeReducer } from './mode';

const rootReducer = combineReducers({
  filters: filtersReducer,
  table: tableReducer,
  mode: modeReducer,
});

const store = createStore(rootReducer);

export default store;
