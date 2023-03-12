// import axios from 'axios';
import React, { useState, useEffect } from 'react';
import InputDropDown from './DropdownFilter';
import InputText from './TextFilter';
import filtersStore from '../redux'
import getTaxonomyValues from '../api/taxonomyAPI';

const inputFieldsInitial = [
    { name: 'brand', label: 'Brand', options: [], component: InputDropDown, reducer: 'SET_BRAND_FILTER' },
    { name: 'category', label: 'Category', options: [], component: InputDropDown, reducer: 'SET_CATEGORY_FILTER' },
    { name: 'sub_category', label: 'Sub Category', options: [], component: InputDropDown, reducer: 'SET_SUB_CATEGORY_FILTER' },
    { name: 'description', label: 'Description', component: InputText },
    { name: 'model_id', label: 'Model ID', component: InputText },
    { name: 'sku', label: 'Sku', component: InputText },
    { name: 'upc', label: 'upc', component: InputText },
    { name: 'msrp', label: 'MSRP', component: null },
    { name: 'size', label: 'Size', component: InputText },
    { name: 'color', label: 'Color', component: InputText },
    { name: 'speed', label: 'Speed', component: InputText }
];

function ProductFilters() {
    const [taxonomyBrand, setTaxonomyBrand] = useState([]);
    const [taxonomyCat, setTaxonomyCat] = useState([]);
    const [taxonomySubCat, setTaxonomySubCat] = useState([]);
    const [inputFields, setInputFields] = useState(inputFieldsInitial);
    // const [inputValues, setInputValues] = useState({});

    useEffect(() => {
        async function fetchTaxonomyData() {
            const brandOptions = await getTaxonomyValues('taxonomy_brand');
            setTaxonomyBrand(brandOptions);
            const catOptions = await getTaxonomyValues('taxonomy_cat');
            setTaxonomyCat(catOptions);
            const subCatOptions = await getTaxonomyValues('taxonomy_sub_cat');
            setTaxonomySubCat(subCatOptions);
        }
        fetchTaxonomyData();
    }, []);
      
    useEffect(() => {
        setInputFields(fields => {
        const updatedFields = fields.map(field => {
            switch (field.name) {
            case 'brand':
                return { ...field, options: taxonomyBrand };
            case 'sub_category':
                return { ...field, options: taxonomySubCat };
            case 'category':
                return { ...field, options: taxonomyCat };
            default:
                return field;
            }
        });
        return updatedFields;
        });
    }, [taxonomyBrand, taxonomyCat, taxonomySubCat]);

    function handleInputChange(name, value, reducer) {
        filtersStore.dispatch({ type: reducer, payload: { value } });
    }
  

    return (
        <tr>
        {inputFields.map((field) => {
            const InputComponent = field.component;
            return (
            <td key={field.name}>
                {InputComponent ? (
                <InputComponent
                    name={field.name}
                    // placeholder={[field.label]}
                    // value={field.value}
                    options={(inputFields.find(f => f.name === field.name)?.options || []).map(option => option.value)}
                    onChange={(value) => handleInputChange(field.name, value, field.reducer)}
                    />
                ) : null}
            </td>
            );
        })}
        </tr>
    );
}

export default ProductFilters;
