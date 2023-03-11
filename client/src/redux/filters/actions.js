import {  SET_BRAND_FILTER, SET_CATEGORY_FILTER, SET_SUB_CATEGORY_FILTER } from './types';

export function setBrandFilter(brandFilter) {
    return { type: SET_BRAND_FILTER, payload: brandFilter };
}

export function setCategoryFilter(categoryFilter) {
    return { type: SET_CATEGORY_FILTER, payload: categoryFilter };
}

export function setSubCategoryFilter(subCategoryFilter) {
    return { type: SET_SUB_CATEGORY_FILTER, payload: subCategoryFilter };
}
  