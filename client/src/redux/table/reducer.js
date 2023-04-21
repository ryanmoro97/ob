import { 
    SET_TABLE, 
} from './types';

const initialState = {
    table: 0,
};

export default function tableReducer(state = initialState, action) {
    return {
      ...state,
      table: action.type === SET_TABLE ? action.payload : state.table
    };
  }
  
