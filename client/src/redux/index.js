import { combineReducers, createStore } from 'redux';
import { filtersReducer } from './filters';

const rootReducer = combineReducers({
  filters: filtersReducer,
//   buttons: buttonReducer
});

const store = createStore(rootReducer);

export default store;


// to import
// import { createStore } from 'store';
// import { filtersReducer } from './reducers/filters';

// const filtersStore = createStore(filtersReducer);

// // You can then use the store in your application as usual:
// filtersStore.dispatch({ type: 'ADD_ITEM_TO_CART', payload: { id: 123, name: 'Product A', price: 9.99 } });
// const filtersItems = filtersStore.getState().items;
// console.log(filtersItems);
