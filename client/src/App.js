import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log('Running effect');
    axios.get('http://localhost:6969/api/products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <div>
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.model_description}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
