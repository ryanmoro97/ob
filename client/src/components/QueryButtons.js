import React, { useState, useEffect } from 'react';
import '../styles/QueryButtons.css';

import DropDownMenu from '../components/DropDownMenu'
import getTaxonomyValues from '../api/taxonomyAPI';

const modeOptions = [
  { id: 1, value: 'Product Table' },
  { id: 2, value: 'Vendor -> Obsession' },
  { id: 3, value: 'Excel -> Vendor' }
];

function QueryButtons({ triggerFetchData, queryUpdate, queryReset, queryFillModels, queryUpdateExport, queryBCExport, queryAIMExport}) {
  const [selectedMode, setSelectedMode] = useState(1);
  const [vendorOptions, setVendorOptions] = useState([]);

  const handleModeChange = (selected) => {
    setSelectedMode(selected.id);
  };

  const handleVendorChange = (selected) => {
    // TODO
    // update table to display selected vendor product table
  }

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const filePath = URL.createObjectURL(file);
    console.log(filePath);
  };

  useEffect(() => {
    async function getVendorList() {
      const options = await getTaxonomyValues('taxonomy_vendor');
      setVendorOptions(options);
    }
    getVendorList();
  }, []);


  const buttons = [
    {
      label: 'Search',
      onClick: triggerFetchData,
      show: true,
    },
    {
      label: 'Reset',
      onClick:  queryReset,
      show: true,
    },
    {
      label: 'Update',
      onClick: queryUpdate,
      show: selectedMode === 1 || selectedMode === 2,
    },
    {
      label: 'Insert',
      onClick: queryReset,
      show: selectedMode === 2 || selectedMode === 3,
    },
    {
      label: 'Fill Models',
      onClick: queryFillModels,
      show: selectedMode === 1,
    },
    {
      label: 'Update Export',
      onClick: queryUpdateExport,
      show: selectedMode === 1,
    },
    {
      label: 'BC Export',
      onClick: queryBCExport,
      show: selectedMode === 1,
    },
    {
      label: 'AIM Export',
      onClick: queryAIMExport,
      show: selectedMode === 1,
    },
  ];


  return (
    <div className='btns-container'>
      <div className="select-buttons-container">
        <DropDownMenu options={modeOptions} onChange={handleModeChange} />
        {selectedMode === 2 ? (
          <DropDownMenu options={vendorOptions} onChange={handleVendorChange} />
        ) : null}
        {selectedMode === 3 ? (
          <input className='file-input' type="file" onChange={handleFileInputChange} />
        ) : null}
      </div>
      <div className="query-buttons-container">
        {buttons.map((button, index) => (
          button.show && (
            <button className="query-button" onClick={button.onClick} key={index}>
              {button.label}
            </button>
          )
        ))}
      </div>
    </div>
  );
}

export default QueryButtons;

