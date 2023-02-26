import React from 'react';

export function ProductTable({ products }) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.model_description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function ProductList({ products }) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.model_description}</li>
      ))}
    </ul>
  );
}
