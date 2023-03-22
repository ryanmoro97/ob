import React from 'react';

import '../styles/ProductTable.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const ProductTable = ({ products }) => {
  const headers = products.length > 0 ? Object.keys(products[0]) : [];
  console.log("products: ", products);
  console.log("headers: ", headers);

  const columnDefs = headers.map((header) => {
    // Check if header is associated with an object that has a .value property
    const headerHasValueProp = products.some((row) => row[header] && row[header].hasOwnProperty('value'));
  
    // get .value for nested objects
    let field = header;
    let filter = 'agTextColumnFilter'; // default to text filter
    let filterParams = {}; // default empty filterParams object
    if (header === 'product_brand') {
      field = 'product_brand.taxonomy_brand.value';
      filter = 'agSetColumnFilter';
      filterParams = {
        values: ['A', 'B', 'C'],
      };
    } else if (header === 'product_category') {
      field = 'product_category.taxonomy_category.value';
      filter = 'agSetColumnFilter';
      filterParams = {
        values: products.map((product) => product.product_category.taxonomy_category.value).filter((value, index, self) => self.indexOf(value) === index),
      };
    } else if (header === 'product_sub_category') {
      field = 'product_sub_category.taxonomy_sub_category.value';
      filter = 'agSetColumnFilter';
      filterParams = {
        values: products.map((product) => product.product_sub_category.taxonomy_sub_category.value).filter((value, index, self) => self.indexOf(value) === index),
      };
    } else if (header === 'product_colors') {
      // Use a custom value getter function for product_colors
      field = 'product_colors';
    } else if (headerHasValueProp) {
      field += '.value';
    }
  
    // Return the column definition with filter added
    return { 
      headerName: header, 
      field, 
      valueGetter: getCustomValueGetter(header), 
      editable: true,
      filter, // set filter type
      filterParams, // set filter parameters
    };
  });
  
  // return comma separated list of multi value attributes
  function getCustomValueGetter(header) {
    if (header === 'product_colors') {
      return function(params) {
        const colors = params.data.product_colors || [];
        return colors.map((color) => color.value).join(', ');
      }
    }
  }
  
  
  
  return (
    <div className='ag-theme-alpine'> 
      <AgGridReact
        columnDefs={columnDefs}
        rowData={products}
        pagination={true}
        paginationPageSize={100}
        domLayout='autoHeight'
      />
    </div>
  );
};

export default ProductTable;



// import React from 'react';
// import '../styles/ProductTable.css';
// import Filters from './Filters';

// const ProductTable = ({ products }) => {
//   // console.log("HERE: ",products);
//   return (
//     <table>
//       <thead>
//         <tr>
//           {/* <th>ID</th> */}
//           <th>Brand</th>
//           <th>Category</th>
//           <th>Sub Category</th>
//           <th>Description</th>
//           <th>Model ID</th>
//           <th>SKU</th>
//           <th>UPC</th>
//           <th>MSRP</th>
//           <th>Size</th>
//           <th>Color</th>
//           <th>Speed</th>
//         </tr>
//       </thead>
//       <tbody>
//         <Filters />
//         {products.map((product) => (
//           <tr key={product.id}>
//             {/* <td>{product.id}</td> */}
//             <td>{product.product_brand.taxonomy_brand.value}</td>
//             <td>{product.product_category.taxonomy_category.value}</td>
//             <td>{product.product_sub_category.taxonomy_sub_category.value}</td>
//             <td>{product.description}</td>
//             <td>{product.model_id}</td>
//             <td>{product.sku}</td>
//             <td>{product.product_UPC.value}</td>
//             <td>${product.product_MSRP.value}</td>
//             <td>{product.product_size ? product.product_size.value : ''}</td>
//             <td>{product.product_colors.length > 0 ? product.product_colors[0].value : ''}</td>
//             <td>{product.product_speed ? product.product_speed.value : ''}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

// export default ProductTable;
