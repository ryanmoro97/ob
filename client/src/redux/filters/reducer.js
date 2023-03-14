import { 
    RESET_FILTERS, SET_BRAND_FILTER, 
    SET_CATEGORY_FILTER, 
    SET_SUB_CATEGORY_FILTER, 
    SET_DESCRIPTION_FILTER, 
    SET_MODEL_ID_FILTER,
    SET_SKU_FILTER,
    SET_UPC_FILTER,
    // SET_MSRP_FILTER,
    SET_SIZE_FILTER,
    SET_COLOR_FILTER,
    SET_SPEED_FILTER
} from './types';

const initialState = {
    brandFilter: '',
    categoryFilter: '',
    subCategoryFilter: '',
    descriptionFilter: '',
    modelIdFilter: '',
    skuFilter: '',
    upcFilter: '',
    // msrpFilter: '',
    sizeFilter: '',
    colorFilter: '',
    speedFilter: ''
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
    case SET_UPC_FILTER:
        return { ...state, upcFilter: action.payload };
    // case SET_MSRP_FILTER:
    //     return { ...state, msrpFilter: action.payload };
    case SET_SIZE_FILTER:
        return { ...state, sizeFilter: action.payload };
    case SET_COLOR_FILTER:
        return { ...state, colorFilter: action.payload };
    case SET_SPEED_FILTER:
        return { ...state, speedFilter: action.payload };
    default:
        return state;
  }
}
