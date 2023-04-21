import { combineReducers, createStore } from 'redux';
import { filtersReducer } from './filters';
import { tableReducer } from './table';

const rootReducer = combineReducers({
  filters: filtersReducer,
  table: tableReducer,
});

const store = createStore(rootReducer);

export default store;
