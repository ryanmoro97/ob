import React, { useState, useEffect } from 'react';
import ProductTable from '../components/ProductTable';
import QueryButtons from '../components/QueryButtons';
import getProducts from '../api/productsAPI';
import Filters from '../components/Filters';

import queryReset from '../queries/queryReset';
import queryUpdate from '../queries/queryUpdate';
import queryFillModels from '../queries/queryFillModels';
import queryUpdateExport from '../queries/queryUpdateExport';
import queryAIMExport from '../queries/queryAIMExport';
import queryBCExport from '../queries/queryBCExport';
import queryUpdatePrice from '../queries/queryUpdatePrice';
import queryInsert from '../queries/queryInsert';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [fetchDataFlag, setFetchDataFlag] = useState(false);
    const [resetValues, setResetValues] = useState(false);

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

    function handleReset() {
        setResetValues(true);
    }
    function onResetDone() {
        setResetValues(false);
    }


    return (
        <div className='container'>
            <main className='App-body'>
                    <div style={{ position: 'relative', zIndex: '1' }}>
                        <QueryButtons
                            triggerFetchData={() => setFetchDataFlag(true)}
                            queryReset={() => {
                                queryReset();
                                setFetchDataFlag(true);
                                handleReset();
                            }}
                            queryUpdate={queryUpdate}
                            queryUpdatePrice={queryUpdatePrice}
                            queryFillModels={queryFillModels}
                            queryUpdateExport={queryUpdateExport}
                            queryAIMExport={queryAIMExport}
                            queryBCExport={queryBCExport}
                            queryInsert={queryInsert}
                        />
                        <Filters resetValues={resetValues} onResetDone={onResetDone}/>
                    </div>
                    <ProductTable products={products} />
            </main>
        </div>
    );
}

export default Products;