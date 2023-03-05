import React, { useState, useEffect } from 'react';
import ProductTable from '../components/ProductTable';
import QueryButtons from '../components/QueryButtons';

import axios from 'axios';

const Products = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
      console.log('Loading Products');
      axios.get('http://localhost:6969/api/products')
        .then((response) => setProducts(response.data))
        .catch((error) => console.log(error));
    }, []);

    return (
        <div className='container'>
            <main className='App-body'>
                    <div>
                    <QueryButtons />
                    <ProductTable products={products} />
                    </div>
            </main>
        </div>
    );
}

export default Products;