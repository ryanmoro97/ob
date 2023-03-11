import axios from 'axios';

const getProducts = async (params) => {
    try {
      const response = await axios.get('http://localhost:6969/api/products');
      return response.data;
    } catch (error) {
      console.log(error);
    }
};

export default getProducts;