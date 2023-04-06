import filtersStore from '../redux'
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

const getProductsValues = async () => {
  try {
    const filtersStateEntries = filtersStore.getState().filters;
    console.log('filtersStateEntries', filtersStateEntries);

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
    const { data } = await client.query({
      query: GET_PRODUCT_VALUES,
      variables: { filters: nonEmptyFilters },
    });
    return data.getProductsValues;
  } catch (error) {
    console.error('getProductsValues', error);
  }
};


export default getProductsValues;