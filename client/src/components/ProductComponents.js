import React from 'react';

export function ProductTable({ products }) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Description</th>
          <th>Sku</th>
          <th>upc</th>
          <th>MSRP</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.description}</td>
            <td>{product.sku}</td>
            <td>{product.upc}</td>
            <td>${product.msrp}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

