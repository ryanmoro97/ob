import React, {useState} from 'react';
import '../styles/QueryButtons.css';

import { querySearch } from '../queries/querySearch';
import { queryReset } from '../queries/queryReset';
import { queryUpdate } from '../queries/queryUpdate';
import { queryFillModels } from '../queries/queryFillModels';
import { queryUpdateExport } from '../queries/queryUpdateExport';
import { queryAIMExport } from '../queries/queryAIMExport';
import { queryBCExport } from '../queries/queryBCExport';
import DropDownMenu from '../components/DropDownMenu'

const modeOptions = [
  { id: 1, label: 'Product Table' },
  { id: 2, label: 'Vendor -> Obsession' },
  { id: 3, label: 'Excel -> Vendor' }
];

// TODO this should pull from the same get request in Filters.js: api/taxonomy_brand
const vendorOptions = [
  { id: 30, label: 'Bontrager' },
  { id: 274, label: 'Shimano' },
  { id: 69, label: 'SRAM' },
  { id: 327, label: 'Trek' }
];

function QueryButtons() {
  const [selectedMode, setSelectedMode] = useState(1); 

  const handleModeChange = (selected) => {
    setSelectedMode(selected.id);
  };

  const handleVendorChange = (selected) => {
    // TODO
    // update table to display vendor product table
  }

  const buttons = [
    {
      label: 'Search',
      onClick: querySearch,
      show: true,
    },
    {
      label: 'Reset',
      onClick: queryReset,
      show: true,
    },
    {
      label: 'Update',
      onClick: queryUpdate,
      show: selectedMode === 1 || selectedMode === 2,
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
        <DropDownMenu options={modeOptions} onChange={handleModeChange}/>
        {selectedMode === 2 && (
          <DropDownMenu options={vendorOptions} onChange={handleVendorChange} />
        )}
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

