import { 
    RESET_FILTERS, 
    SET_BRAND_FILTER, 
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

export function resetFilters() {
    return { type: RESET_FILTERS };
}

export function setBrandFilter(brandFilter) {
    return { type: SET_BRAND_FILTER, payload: brandFilter };
}

export function setCategoryFilter(categoryFilter) {
    return { type: SET_CATEGORY_FILTER, payload: categoryFilter };
}

export function setSubCategoryFilter(subCategoryFilter) {
    return { type: SET_SUB_CATEGORY_FILTER, payload: subCategoryFilter };
}
  
export function setDescriptionFilter(descriptionFilter) {
    return { type: SET_DESCRIPTION_FILTER, payload: descriptionFilter };
}  

export function setModelIdFilter(modelIdFilter) {
    return { type: SET_MODEL_ID_FILTER, payload: modelIdFilter };
}

export function setSkuFilter(skuFilter) {
    return { type: SET_SKU_FILTER, payload: skuFilter };
}

export function setUpcFilter(upcFilter) {
    return { type: SET_UPC_FILTER, payload: upcFilter };
}

// export function setMsrpFilter(msrpFilter) {
//     return { type: SET_MSRP_FILTER, payload: msrpFilter };
// }

export function setSizeFilter(sizeFilter) {
    return { type: SET_SIZE_FILTER, payload: sizeFilter };
}

export function setColorFilter(colorFilter) {
    return { type: SET_COLOR_FILTER, payload: colorFilter };
}

export function setSpeedFilter(speedFilter) {
    return { type: SET_SPEED_FILTER, payload: speedFilter };
}
