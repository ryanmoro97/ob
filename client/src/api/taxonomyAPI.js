import axios from 'axios'

const getTaxonomyValues = async (endpoint) => {

  try {
    const response = await axios.get(`http://localhost:6969/api/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching data');
  }
}
export default getTaxonomyValues;

