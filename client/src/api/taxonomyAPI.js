// import axios from 'axios'

// const getTaxonomyValues = async (endpoint) => {

//   try {
//     const response = await axios.get(`http://localhost:6969/api/${endpoint}`);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw new Error('Error fetching data');
//   }
// }
// export default getTaxonomyValues;

import client from '../index.js';
import { gql } from '@apollo/client';

const GET_TAXONOMY_VALUES = gql`
  query getTaxonomyValues($taxonomyClass: String!) {
    getTaxonomyValues(taxonomyClass: $taxonomyClass) {
      taxonomyId
      value
    }
  }
`;

const getTaxonomyValues = async (taxonomyClass) => {
  try {
    const { data } = await client.query({
      query: GET_TAXONOMY_VALUES,
      variables: { taxonomyClass },
    });

    return data.getTaxonomyValues;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching data');
  }
};


export default getTaxonomyValues;
