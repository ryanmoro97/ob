import { combineReducers, createStore } from 'redux';
import { filtersReducer } from './filters';

const rootReducer = combineReducers({
  filters: filtersReducer,
//   other: otherReducer
});

const store = createStore(rootReducer);

export default store;
