import { gql } from '@apollo/client';
import client from '../index.js';

const INSERT_VENDOR_PRODUCTS = gql`
  mutation InsertVendorItems($products: [ProductInput!]!, $vendorID: Int!, $sub_category: String!) {
    insertVendorItems(products: $products, vendorID: $vendorID, sub_categoryID: $sub_category)
  }
`;


const InsertVendorProducts = async (products, vendorID, sub_category) => {
    try {
      const { data } = await client.mutate({
        mutation: INSERT_VENDOR_PRODUCTS,
        variables: { products, vendorID, sub_category },
      });
  
      return data.success;
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching data');
    }
  };
  
  
  export default InsertVendorProducts;