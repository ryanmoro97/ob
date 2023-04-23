import store from '../redux'

import client from '../index.js';
import { gql } from '@apollo/client';

const GET_PRODUCT_VALUES = gql`
  query getProductsValues($filters: FiltersInput!) {
    getProductsValues(filters: $filters) {
      id,
      description,
      model_id,
      sku,
      brand,
      category,
      subCategory,
      upc,
      msrp,
      size,
      color,
      speed
    }
  }
`;
const GET_VENDOR_PRODUCT_VALUES = gql`
  query getVendorProductsValues($table: Int!, $filters: FiltersInput!) {
    getVendorProductsValues(table: $table, filters: $filters) {
      id,
      description,
      brand,
      upc,
      msrp,
      size,
      color,
      speed
    }
  }
`;

const getProductsValues = async () => {
  try {
    const table = store.getState().table.table;
    const filtersStateEntries = store.getState().filters;
    const nonEmptyFilters = Object.fromEntries(
      Object.entries(filtersStateEntries).filter(([key, value]) => {
        if (typeof value === 'string') {
          return value !== '';
        } else if (typeof value === 'object') {
          return value.value !== '';
        }
        return true; 
      }).map(([key, value]) => [key, typeof value === 'object' ? value.value : value])
    );

    // product obsession query
    if(table === 0){
      const { data } = await client.query({
        query: GET_PRODUCT_VALUES,
        variables: { filters: nonEmptyFilters },
      });
      return data.getProductsValues;
    }
    // vendor table query
    else{
      const { data } = await client.query({
        query: GET_VENDOR_PRODUCT_VALUES,
        variables: { table: table, filters: nonEmptyFilters },
      });
      return data.getVendorProductsValues;
    }
  } catch (error) {
    console.error('getProductsValues', error);
  }
};


export default getProductsValues;