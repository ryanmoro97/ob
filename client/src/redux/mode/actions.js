import { 
    SET_MODE, 
} from './types';

export function setMode(mode) {
    return { type: SET_MODE, payload: mode };
}
