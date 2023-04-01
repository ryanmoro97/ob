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
    { name: 'description', label: 'Description', component: InputText, reducer: 'SET_DESCRIPTION_FILTER' },
    { name: 'model_id', label: 'Model ID', component: InputText, reducer: 'SET_MODEL_ID_FILTER' },
    { name: 'sku', label: 'Sku', component: InputText, reducer: 'SET_SKU_FILTER' },
    { name: 'barcode', label: 'Barcode', component: InputText, reducer: 'SET_BARCODE_FILTER' },
    { name: 'partnum', label: 'Part Number', component: InputText, reducer: 'SET_PART_NUM_FILTER' },
];

function Filters({ resetValues, onResetDone }) {
    const [taxonomyOptions, setTaxonomyOptions] = useState({
        brand: [],
        cat: [],
        subCat: [],
    });
    const [inputFields, setInputFields] = useState(inputFieldsInitial);
    

    useEffect(() => {
        async function fetchTaxonomyData() {
            const brandOptions = await getTaxonomyValues('taxonomy_brand');
            const catOptions = await getTaxonomyValues('taxonomy_cat');
            const subCatOptions = await getTaxonomyValues('taxonomy_sub_cat');
            setTaxonomyOptions({
                brand: brandOptions,
                cat: catOptions,
                subCat: subCatOptions,
            });
        }
        fetchTaxonomyData();
    }, []);
      
    useEffect(() => {
        setInputFields(fields => {
            const updatedFields = fields.map(field => {
                switch (field.name) {
                    case 'brand':
                        return { ...field, options: taxonomyOptions.brand };
                    case 'sub_category':
                        return { ...field, options: taxonomyOptions.subCat };
                    case 'category':
                        return { ...field, options: taxonomyOptions.cat };
                    default:
                        return field;
                }
            });
            return updatedFields;
        });
    }, [taxonomyOptions]);

    function handleInputChange(name, value, reducer) {
        filtersStore.dispatch({ type: reducer, payload: { value } });
    }


    function resetDone() {
        onResetDone();
    }

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                    {inputFields.map((field) => {
                        const InputComponent = field.component;
                        return (
                            <td key={field.name}>
                            {InputComponent ? (
                                <InputComponent
                                name={field.name}
                                placeholder={[field.label]}
                                options={(inputFields.find(f => f.name === field.name)?.options || []).map(option => option.value)}
                                resetValues={resetValues}
                                resetDone={resetDone}
                                onChange={(value) => handleInputChange(field.name, value, field.reducer)}
                                />
                                ) : null}
                            </td>
                        );
                    })}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Filters;
