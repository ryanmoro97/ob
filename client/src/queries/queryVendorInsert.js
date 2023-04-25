// import { filtersReducer } from '../redux/filters';
import InsertVendorProducts from '../api/InsertVendorProducts'

export default function queryVendorInsert(products, vendor_id, sub_category) {
    console.log('queryInsert()');
    console.log('products: ', products);
    console.log('vendorID: ', vendor_id);
    console.log('sub_category: ', sub_category);
    // Vendor -> OB 
    InsertVendorProducts(products, vendor_id, sub_category)
}

