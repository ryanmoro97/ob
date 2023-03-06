import React, { useState, useEffect } from 'react';
import InputDropDown from './DropdownFilter';
import InputText from './TextFilter';

import axios from 'axios';

const inputFieldsInitial = [
    { name: 'brand', label: 'Brand', options: [], component: InputDropDown },
    { name: 'category', label: 'Category', options: [], component: InputDropDown },
    { name: 'sub_category', label: 'Sub Category', options: [], component: InputDropDown },
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
    // const [formData, setFormData] = useState({});
    const [taxonomyBrand, setTaxonomyBrand] = useState([]);
    const [taxonomyCat, setTaxonomyCat] = useState([]);
    const [taxonomySubCat, setTaxonomySubCat] = useState([]);
    const [inputFields, setInputFields] = useState(inputFieldsInitial);

    useEffect(() => {
        axios.get('http://localhost:6969/api/taxonomy_brand')
        .then((response) => {
            const options = response.data.map(brand => ({ id: brand.id, value: brand.value }));
            setTaxonomyBrand(options);
        })
        .catch((error) => console.log(error));
    }, [taxonomyBrand]);

    useEffect(() => {
        axios.get('http://localhost:6969/api/taxonomy_cat')
        .then((response) => {
            const options = response.data.map(cat => ({ id: cat.id, value: cat.value }));
            setTaxonomyCat(options);
        })
        .catch((error) => console.log(error));
    }, [taxonomyCat]);

    useEffect(() => {
        axios.get('http://localhost:6969/api/taxonomy_sub_cat')
        .then((response) => {
            const options = response.data.map(subcat => ({ id: subcat.id, value: subcat.value }));
            setTaxonomySubCat(options);
        })
        .catch((error) => console.log(error));
    }, [taxonomySubCat]);

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

    function handleInputChange(name, value) {
        // setFormData({ ...formData, [name]: value });
        // console.log('name: ' + name + ', value: ' + value);
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
                    // placeholder={formData[field.name]}
                    options={(inputFields.find(f => f.name === field.name)?.options || []).map(option => option.value)}
                    onChange={(value) => handleInputChange(field.name, value)}
                    />  
                ) : null}
            </td>
            );
        })}
        </tr>
    );
}

export default ProductFilters;


// 