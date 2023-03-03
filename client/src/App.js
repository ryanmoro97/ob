import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/App.css';
import { ProductTable } from './components/ProductTable';
import InputDropDown from './inputs/dropdown';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log('Running effect');
    axios.get('http://localhost:6969/api/products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  }, []);
  console.log(products)

  return (
    <div className='container'>
      <header className='App-header'>
        <h1>Product List</h1>
      </header>
      <main className='App-body'>
        <div className='filters'>
          <InputDropDown 
            options = {['Bag', 'Rear Derailleur', 'Suspension Fork']}
            placeholder = 'Sub Category'
          />
          <InputDropDown 
            options = {['Fox', 'Shimano', 'SRAM']}
            placeholder = 'Brand'
          />
        </div>
        <div>
          <ProductTable products={products} />
        </div>
      </main>
    </div>
  );
}

export default App;
