// import { filtersReducer } from '../redux/filters';
import InsertVendorProducts from '../api/InsertVendorProducts'

export default function queryVendorInsert(products, vendorID, sub_category) {
    console.log('queryInsert()');
    console.log('products: ', products);
    console.log('vendorID: ', vendorID);
    console.log('sub_category: ', sub_category);
    // Vendor -> OB 
    InsertVendorProducts(products, vendorID, sub_category)
}

