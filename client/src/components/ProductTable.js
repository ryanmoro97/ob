import React, { useRef } from 'react';
import { useCallback } from 'react';

import '../styles/QueryButtons.css';
import '../styles/ProductTable.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const ProductTable = ({ products }) => {
  const gridRef = useRef();

  const resetState = useCallback(() => {
    gridRef.current.api.setFilterModel(null);
  }, []);
  
  const onFirstDataRendered = useCallback((params) => {
    const columnApi = params.columnApi;
    columnApi.autoSizeAllColumns();
  }, []);
  
  // dont render if no product data is retreived
  if(!products){
    console.log("products: ", products);
    return null;
  }

  const headers = products.length > 0 ? Object.keys(products[0]) : [];
  // console.log("products: ", products);
  // console.log("headers: ", headers);

  const columnDefs = headers.map((header) => {
    // Check if header is associated with an object that has a .value property
    const headerHasValueProp = products.some((row) => row[header] && row[header].hasOwnProperty('value'));
  
    // get .value for nested objects
    let field = header;
    let filter = 'agTextColumnFilter'; // default to text filter
    switch (header) {
      case 'color':
        // Use a custom value getter function for array types
        field = 'color';
        break;
      case 'msrp': // or product_cost
        if (headerHasValueProp) {
          field += '.value';
        }
        filter = 'agNumberColumnFilter';
        break;
      default:
        if (headerHasValueProp) {
          field += '.value';
        }
    }
    
  
    // Return the column definition with filter added
    return { 
      headerName: header, 
      field, 
      valueGetter: getCustomValueGetter(header), 
      editable: true,
      filter, // set filter type
      resizable: true,
      sortable: true,
    };
  });
  
  // return comma separated list of multi value attributes
  function getCustomValueGetter(header) {
    if (header === 'color') {
      return function(params) {
        const colors = params.data.color || [];
        return colors.join(', ');
      }
    }
  }
  
  const gridOptions = {
    rowSelection: 'multiple',
    skipHeaderOnAutoSize: false,
    rowHeight: 25,
    
  };

  return (
    <div>
      <div>
        <button className="query-button"  onClick={resetState}>Clear Filters</button>
      </div>
      <div className='ag-theme-alpine'> 
        <AgGridReact
          ref={gridRef}
          columnDefs={columnDefs}
          rowData={products}
          pagination={true}
          paginationPageSize={100}
          domLayout='autoHeight'
          onFirstDataRendered={onFirstDataRendered}
          gridOptions={gridOptions}
        />
      </div>
    </div>
  );
};

export default ProductTable;

