import React from 'react';
import '../styles/ProductTable.css';
import ProductFilters from './Filters';

const ProductTable = ({ products }) => {
  return (
    <table>
      <thead>
        <tr>
          {/* <th>ID</th> */}
          <th>Brand</th>
          <th>Category</th>
          <th>Sub Category</th>
          <th>Description</th>
          <th>Model_ID</th>
          <th>SKU</th>
          <th>UPC</th>
          <th>MSRP</th>
          <th>Size</th>
          <th>Color</th>
          <th>Speed</th>
        </tr>
      </thead>
      <tbody>
        <ProductFilters />
        {products.map((product) => (
          <tr key={product.id}>
            {/* <td>{product.id}</td> */}
            <td>{product.brand}</td>
            <td>{product.cat}</td>
            <td>{product.subcat}</td>
            <td>{product.description}</td>
            <td>{product.model_id}</td>
            <td>{product.sku}</td>
            <td>{product.upc}</td>
            <td>${product.msrp}</td>
            <td>{product.size}</td>
            <td>{product.color}</td>
            <td>{product.speed}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductTable;
