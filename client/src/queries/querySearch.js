// import { filtersReducer } from '../redux/filters';
import filtersStore from '../redux'

export default function querySearch() {
    const filtersState = filtersStore.getState();

    console.log("HELLOOO FROM QUERY SEARCH");
    console.log(filtersState);
}
