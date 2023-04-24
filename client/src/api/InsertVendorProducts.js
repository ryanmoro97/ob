import { gql } from '@apollo/client';
import client from '../index.js';

const INSERT_VENDOR_PRODUCTS = gql`
  mutation insertVendorProducts($products: [VendorProductInput!]!, $vendorID: Int!, $sub_category: String!) {
    insertVendorProducts(products: $products, vendorID: $vendorID, sub_category: $sub_category)
  }
`;

const InsertVendorProducts = async (products, vendorID, sub_category) => {
  console.log('InsertVendorProducts()');
  console.log("mutation:", INSERT_VENDOR_PRODUCTS);
  console.log("variables:", { products, vendorID, sub_category });


  try {
    const { data } = await client.mutate({
      mutation: INSERT_VENDOR_PRODUCTS,
      variables: { products, vendorID, sub_category },
    });
    console.log('data: ', data);
    return data.success;
  } catch (error) {
    console.error(error);
    throw new Error(`Error: ${error.message}`);
  }
};
  
  
  export default InsertVendorProducts;