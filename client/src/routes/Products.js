import React, { useState, useEffect } from 'react';
import ProductTable from '../components/ProductTable';
import QueryButtons from '../components/QueryButtons';
import getProducts from '../api/productsAPI';

import queryReset from '../queries/queryReset';
import queryUpdate from '../queries/queryUpdate';
import queryFillModels from '../queries/queryFillModels';
import queryUpdateExport from '../queries/queryUpdateExport';
import queryAIMExport from '../queries/queryAIMExport';
import queryBCExport from '../queries/queryBCExport';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [fetchDataFlag, setFetchDataFlag] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProducts();
            setProducts(data);
        };
        if (fetchDataFlag) {
            fetchData();
            setFetchDataFlag(false); 
        }
    }, [fetchDataFlag]);


    return (
        <div className='container'>
            <main className='App-body'>
                    <div>
                        <QueryButtons
                            triggerFetchData={() => setFetchDataFlag(true)}
                            queryReset={() => {
                                queryReset();
                                setFetchDataFlag(true);
                            }}
                            queryUpdate={queryUpdate}
                            queryFillModels={queryFillModels}
                            queryUpdateExport={queryUpdateExport}
                            queryAIMExport={queryAIMExport}
                            queryBCExport={queryBCExport}
                        />
                        <ProductTable products={products} />
                    </div>
            </main>
        </div>
    );
}

export default Products;