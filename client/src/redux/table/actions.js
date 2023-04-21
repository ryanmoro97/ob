import { 
    SET_TABLE, 
} from './types';

export function setTable(table) {
    return { type: SET_TABLE, payload: table };
}
