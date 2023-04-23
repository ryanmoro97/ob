import React, { useEffect, useState } from 'react';
import '../styles/popup.css'
import DropDownFilter from './DropdownFilter';
import getTaxonomyValues from '../api/taxonomyAPI';

const VendorInsertPopup = ({ isOpen, onClose, onConfirm, numItems }) => {
    const [subCatOptions, setSubCatOptions] = useState([]);
    const [selectedSubCat, setSelectedSubCat] = useState(null);

    // reset selectedSubCat when popup is closed
    useEffect(() => {
        if (isOpen) {
          setSelectedSubCat(null);
        }
    }, [isOpen]); 

    // get sub category options
    useEffect(() => {
        async function getVendorList() {
            const options = await getTaxonomyValues('taxonomy_sub_cat');
            const subCatOptionsValues = options.map(option => option.value);
            setSubCatOptions(subCatOptionsValues);
        }
        getVendorList();
      }, []);

    if (!isOpen) {
        return null;
    }

    // send selected sub cat to parent / insert query
    const handleConfirmClick = (e) => {
        e.stopPropagation();
        onConfirm(selectedSubCat);
    };

    const handleSubCatChange = (selected) => {
        setSelectedSubCat(selected);
    };


  return (
    <div className="popup-overlay">
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <div>
            <p>You are about to insert: {numItems} rows</p>
        </div>
        <div className='filterContainer'>
            <DropDownFilter 
                options={subCatOptions} 
                onChange={handleSubCatChange}
                placeholder={'Sub Category'}
            />
        </div>
        <div>
            <button className = 'popupBtn' onClick={onClose}>Cancel</button>
            <button className = 'popupBtn' onClick={handleConfirmClick} disabled={selectedSubCat === null} >OK</button>
        </div>
      </div>
    </div>
  );
};

export default VendorInsertPopup;