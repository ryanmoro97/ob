import React from 'react';
import Filters from './Filters';
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
    if (header === 'product_brand') {
      field = 'product_brand.taxonomy_brand.value';
    } else if (header === 'product_category') {
      field = 'product_category.taxonomy_category.value';
    } else if (header === 'product_sub_category') {
      field = 'product_sub_category.taxonomy_sub_category.value';
    } else if (header === 'product_colors') {
      // Use a custom value getter function for product_colors
      field = 'product_colors';
    } else if (headerHasValueProp) {
      field += '.value';
    }
  
    // Return the column definition
    return { headerName: header, field, valueGetter: getCustomValueGetter(header), editable: true };
  });
  
  // return comma separated list of multi option attributes
  function getCustomValueGetter(header) {
    if (header === 'product_colors') {
      return function(params) {
        const colors = params.data.product_colors || [];
        return colors.map((color) => color.value).join(', ');
      }
    }
  }
  
  
  

  return (
    <table className="ag-theme-alpine" style={{ height: 400, width: 800 }}>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <Filters />
        <tr>
          <td colSpan={headers.length}>
            <AgGridReact
              columnDefs={columnDefs}
              rowData={products}
              pagination={true}
              paginationPageSize={10}
            />
          </td>
        </tr>
      </tbody>
    </table>
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
