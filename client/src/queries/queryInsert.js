// import { filtersReducer } from '../redux/filters';

export default function queryInsert(products, mode, table) {
    console.log('queryInsert()');
    console.log('products: ', products);
    console.log('mode: ', mode);
    console.log('table: ', table);

    // Vendor -> OB 
    if(mode === 2){
        console.log('Vendor -> OB');

    }
    // Excel -> Vendor
    else if(mode === 3){
        // Map vendor fields to OB schema

        // Update prices on existing product in vendor table and OB

        // Insert non-existing products into selected table
    }
}

