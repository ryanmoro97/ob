import axios from 'axios';
import filtersStore from '../redux'

const getProducts = async (params) => {
    try {
        const filtersStateEntries = filtersStore.getState().filters;
        const nonEmptyFilters = Object.fromEntries(
          Object.entries(filtersStateEntries).filter(([key, value]) => {
            if (typeof value === 'string') {
              return value !== '';
            } else if (typeof value === 'object') {
              return value.value !== '';
            }
            return true; 
          })
        );
        const response = await axios.get('http://localhost:6969/api/products', { params: nonEmptyFilters });
        return response.data;
    } catch (error) {
      console.log(error);
    }
};

export default getProducts;