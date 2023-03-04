import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/App.css';
import { ProductTable } from './components/ProductTable';

function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    console.log('Loading Products');
    axios.get('http://localhost:6969/api/products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className='container'>
      <header className='App-header'>
        <h1>Product List</h1>
      </header>
      <main className='App-body'>
        <div>
          <ProductTable products={products} />
        </div>
      </main>
    </div>
  );
}

export default App;
