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

export function setBarcodeFilter(barcodeFilter) {
    return { type: SET_BARCODE_FILTER, payload: barcodeFilter };
}

export function setPartNumFilter(partNumFilter) {
    return { type: SET_PART_NUM_FILTER, payload: partNumFilter };
}
