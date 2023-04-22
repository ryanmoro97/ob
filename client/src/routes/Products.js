import React, { useState, useEffect } from 'react';
import ProductTable from '../components/ProductTable';
import QueryButtons from '../components/QueryButtons';
import getProducts from '../api/productsAPI';
import Filters from '../components/Filters';

import queryReset from '../queries/queryReset';
import queryUpdate from '../queries/queryUpdate';
import queryFillModels from '../queries/queryFillModels';
import queryAIMUpdate from '../queries/queryUpdateExport';
import queryAIMExport from '../queries/queryAIMExport';
import queryBCExport from '../queries/queryBCExport';
import queryInsert from '../queries/queryInsert';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [fetchDataFlag, setFetchDataFlag] = useState(false);
    const [resetValues, setResetValues] = useState(false);
    const [displayedItems, setDisplayedItems] = useState([]);
    const [mode, setMode] = useState(1);
    const [table, setTable] = useState(0);


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

    const handleBCExport = () => {
        queryBCExport(displayedItems);
    };
    const handleAIMExport = () => {
        queryAIMExport(displayedItems);
    };
    const handleAimUpdate = () => {
        queryAIMUpdate(displayedItems);
    };
    const handleInsert = () => {
        queryInsert(displayedItems, mode, table);
    };
      

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
                            queryFillModels={queryFillModels}
                            queryAIMUpdate={handleAimUpdate}
                            queryAIMExport={handleAIMExport}
                            queryBCExport={handleBCExport}
                            queryInsert={handleInsert}
                        />
                        <Filters resetValues={resetValues} onResetDone={onResetDone}/>
                    </div>
                    <ProductTable products={products} onDisplayedItemsChange={setDisplayedItems} />
            </main>
        </div>
    );
}

export default Products;