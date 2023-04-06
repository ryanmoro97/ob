import React, { useState, useEffect } from 'react';
import '../styles/QueryButtons.css';

import DropDownMenu from '../components/DropDownMenu'
import getTaxonomyValues from '../api/taxonomyAPI';

const modeOptions = [
  { id: 1, value: 'Product Table' },
  { id: 2, value: 'Vendor -> Obsession' },
  { id: 3, value: 'Excel -> Vendor' },
  { id: 4, value: 'SaqPK + Part# Import' },
];

function QueryButtons({ triggerFetchData, queryUpdate, queryUpdatePrice, queryReset, queryFillModels, queryUpdateExport, queryBCExport, queryAIMExport}) {
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
      show: [1, 2, 3].includes(selectedMode),
    },
    {
      label: 'Reset',
      onClick:  queryReset,
      show: [1, 2, 3].includes(selectedMode),
    },
    {
      label: 'Update',
      onClick: queryUpdate,
      show: [1, 2].includes(selectedMode),
    },
    {
      label: 'Update Prices',
      onClick: queryUpdatePrice,
      show: [2, 3].includes(selectedMode),
    },
    {
      label: 'Insert',
      onClick: queryReset,
      show: [2, 3].includes(selectedMode),
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
    {
      label: 'Import',
      onClick: queryAIMExport,
      show: [4, 3].includes(selectedMode),
    },
  ];


  return (
    <div className='btns-container'>
      <div className="select-buttons-container">
        <DropDownMenu options={modeOptions} onChange={handleModeChange} />
        {selectedMode === 2 ? (
          <DropDownMenu options={vendorOptions} onChange={handleVendorChange} />
        ) : null}
        {[3, 4].includes(selectedMode) ? (
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

