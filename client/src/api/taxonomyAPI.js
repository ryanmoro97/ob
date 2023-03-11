import axios from 'axios'

const getTaxonomy = (endpoint) => {
  axios.get('http://localhost:6969/api/' + endpoint)
    .then((response) => {
      console.log(response.data);
      return response.data
    })
    .catch((error) => console.log(error));
}
export default getTaxonomy;