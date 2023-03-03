import React from 'react';
import '../styles/ProductTable.css';

export function ProductTable({ products }) {
  return (
    <table>
      <thead>
        <tr>
          {/* <th>ID</th> */}
          <th>Brand</th>
          <th>Category</th>
          <th>Sub Category</th>
          <th>Description</th>
          <th>Sku</th>
          <th>upc</th>
          <th>MSRP</th>
          <th>Size</th>
          <th>Color</th>
          <th>Speed</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            {/* <td>{product.id}</td> */}
            <td>{product.brand}</td>
            <td>{product.cat}</td>
            <td>{product.subcat}</td>
            <td>{product.description}</td>
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
