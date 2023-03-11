import { SET_BRAND_FILTER , SET_CATEGORY_FILTER, SET_SUB_CATEGORY_FILTER } from './types';

const initialState = {
    brandFilter: '',
    categoryFilter: '',
    subCategoryFilter: '',
};

export default function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_BRAND_FILTER:
        return { ...state, brandFilter: action.payload };
    case SET_CATEGORY_FILTER:
        return { ...state, categoryFilter: action.payload };
    case SET_SUB_CATEGORY_FILTER:
        return { ...state, subCategoryFilter: action.payload };
    default:
        return state;
  }
}
