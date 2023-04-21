import { 
    RESET_FILTERS, 
    SET_BRAND_FILTER, 
    SET_CATEGORY_FILTER, 
    SET_SUB_CATEGORY_FILTER, 
    SET_DESCRIPTION_FILTER, 
    SET_MODEL_ID_FILTER,
    SET_SKU_FILTER,
    SET_BARCODE_FILTER,
    SET_PART_NUM_FILTER,
    SET_MODEL_YEAR_FILTER,
} from './types';

const initialState = {
    categoryFilter: '',
    subCategoryFilter: '',
    brandFilter: '',
    descriptionFilter: '',
    modelIdFilter: '',
    skuFilter: '',
    barcodeFilter: '',
    partnumFilter: '',
    modelYearFilter: '',
};

export default function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_FILTERS:
        return initialState;
    case SET_BRAND_FILTER:
        return { ...state, brandFilter: action.payload };
    case SET_CATEGORY_FILTER:
        return { ...state, categoryFilter: action.payload };
    case SET_SUB_CATEGORY_FILTER:
        return { ...state, subCategoryFilter: action.payload };
    case SET_DESCRIPTION_FILTER:
        return { ...state, descriptionFilter: action.payload };
    case SET_MODEL_ID_FILTER:
        return { ...state, modelIdFilter: action.payload };
    case SET_SKU_FILTER:
        return { ...state, skuFilter: action.payload };
    case SET_BARCODE_FILTER:
        return { ...state, barcodeFilter: action.payload };
    case SET_PART_NUM_FILTER:
        return { ...state, partnumFilter: action.payload };
    case SET_MODEL_YEAR_FILTER:
        return { ...state, modelYearFilter: action.payload };
    default:
        return state;
  }
}
