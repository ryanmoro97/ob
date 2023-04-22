import * as XLSX from 'xlsx';

const queryAIMExport = (products) => {
    console.log('queryAIMExport');
    console.log(products)
    const fieldMappings = {
        brand: 'Brand',
        category: 'Category',
        color: 'Color',
        description: 'Description',
        id: 'ID',
        model_id: 'Model ID',
        msrp: 'MSRP',
        size: 'Size',
        sku: 'SKU',
        speed: 'Speed',
        subCategory: 'Subcategory',
        upc: 'UPC',
      };

     // Map the fields to AIM Format
    const formattedData = products.map((item) => {
        const newItem = {};
        Object.entries(item).forEach(([key, value]) => {
            if (fieldMappings[key]) {
            newItem[fieldMappings[key]] = Array.isArray(value) ? value.join(', ') : value;
            }
        });
        return newItem;
    });

    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Products');

    const firstItem = products[0];
    const date = new Date().toISOString().slice(0, 10);
    const fileName = `product_export_${firstItem.brand}_${firstItem.category}_${date}.xlsx`;

    XLSX.writeFile(wb, fileName);
};

export default queryAIMExport;