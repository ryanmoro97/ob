import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';
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
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [modifiedProducts, setModifiedProducts] = useState([]);
    const selectedMode = useSelector((state) => state.mode.mode);
    const selectedTable = useSelector((state) => state.table.table);


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

    const handleBCExport = async () => {
        // force update on modified products before export
        await queryUpdate(modifiedProducts, selectedTable);
        queryBCExport(displayedProducts);
    };
    const handleAIMExport = async () => {
        // force update on modified products before export
        await queryUpdate(modifiedProducts, selectedTable);
        queryAIMExport(displayedProducts);
    };
    const handleAimUpdate = async () => {
        // force update on modified products before export
        await queryUpdate(modifiedProducts, selectedTable);
        queryAIMUpdate(displayedProducts);
    };
    const handleInsert = async () => {
        // force update on modified products before insert
        await queryUpdate(modifiedProducts, selectedTable);
        queryInsert(displayedProducts, selectedMode, selectedTable);
    };
    const handleUpdate = () => {
        queryUpdate(modifiedProducts, selectedTable);
    };
    const handleFillModels = async () => {
        // force update on modified products before filling models
        await queryUpdate(modifiedProducts, selectedTable);
        queryFillModels(displayedProducts);
    };

    const updateModifiedProducts = (rowIndex, colId, newValue) => {
        console.log('updateModifiedProducts');
        // new copy to avoid direct mutation
        const updatedProducts = _.cloneDeep(products);
        updatedProducts[rowIndex][colId] = newValue;
        setProducts(updatedProducts);

        const updatedModifiedProducts = _.cloneDeep(modifiedProducts);
        const existingProductIndex = updatedModifiedProducts.findIndex(product => product.id === updatedProducts[rowIndex].id);
        if (existingProductIndex > -1) {
            updatedModifiedProducts[existingProductIndex] = updatedProducts[rowIndex];
        } else {
            updatedModifiedProducts.push(updatedProducts[rowIndex]);
        }
        setModifiedProducts(updatedModifiedProducts);
        console.log('modifiedProducts: ', modifiedProducts);
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
                            queryUpdate={handleUpdate}
                            queryFillModels={handleFillModels}
                            queryAIMUpdate={handleAimUpdate}
                            queryAIMExport={handleAIMExport}
                            queryBCExport={handleBCExport}
                            queryInsert={handleInsert}
                        />
                        <Filters resetValues={resetValues} onResetDone={onResetDone}/>
                    </div>
                    <ProductTable 
                        products={products} 
                        onDisplayedProductsChange={setDisplayedProducts} 
                        onProductsModified={updateModifiedProducts} 
                    />
            </main>
        </div>
    );
}

export default Products;