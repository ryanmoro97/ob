import { 
    SET_MODE, 
} from './types';

const initialState = {
    mode: 1,
};

export default function modeReducer(state = initialState, action) {
    return {
      ...state,
      mode: action.type === SET_MODE ? action.payload : state.mode
    };
  }
  
