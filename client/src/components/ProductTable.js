import React from 'react';
import '../styles/ProductTable.css';
import ProductFilters from './Filters';

const ProductTable = ({ products }) => {
  // console.log("HERE: ",products);
  return (
    <table>
      <thead>
        <tr>
          {/* <th>ID</th> */}
          <th>Brand</th>
          <th>Category</th>
          <th>Sub Category</th>
          <th>Description</th>
          <th>Model ID</th>
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
            <td>{product.product_brand.taxonomy_brand.value}</td>
            <td>{product.product_category.taxonomy_category.value}</td>
            <td>{product.product_sub_category.taxonomy_sub_category.value}</td>
            <td>{product.description}</td>
            <td>{product.model_id}</td>
            <td>{product.sku}</td>
            <td>{product.product_UPC.value}</td>
            <td>${product.product_MSRP.value}</td>
            <td>{product.product_size ? product.product_size.value : ''}</td>
            <td>{product.product_colors.length > 0 ? product.product_colors[0].value : ''}</td>
            <td>{product.product_speed ? product.product_speed.value : ''}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductTable;
