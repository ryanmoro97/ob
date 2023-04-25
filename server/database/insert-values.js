const db = require('./db');

const { products_Data, product_UPC_Data, product_MSRP_Data, product_brand_Data, product_sub_cat_Data, product_cat_Data, product_color_Data, product_speed_Data, product_size_Data, product_trek_Data } = require('./entity_values');
const { taxonomy_brand, taxonomy_category, taxonomy_sub_category, taxonomy_vendor, taxonomy, taxonomy_vendor_table } = require('./taxonomy');
const { TaxonomyBrand, TaxonomyCategory, TaxonomySubCategory, TaxonomyVendor, TaxonomyVendorTable, Product, ProductUPC, ProductMSRP, ProductBrand, ProductCategory, ProductSubCategory, ProductSize, ProductColor, ProductSpeed, ProductTrek } = require('./create-tables');

module.exports = {
    insertTaxonomyData: async function() {
        try {
            const valuesTaxonomyBrand = taxonomy_brand.map(taxonomy => ({ taxonomy_id: taxonomy.taxonomy_id, value: taxonomy.value}));
            await TaxonomyBrand.bulkCreate(valuesTaxonomyBrand);
            console.log('taxonomy_brand values inserted');

            const valuesTaxonomyCategory = taxonomy_category.map(taxonomy => ({ taxonomy_id: taxonomy.taxonomy_id, value: taxonomy.value}));
            await TaxonomyCategory.bulkCreate(valuesTaxonomyCategory);
            console.log('taxonomy_category values inserted');

            const valuesTaxonomySubCategory = taxonomy_sub_category.map(taxonomy => ({ taxonomy_id: taxonomy.taxonomy_id, value: taxonomy.value}));
            await TaxonomySubCategory.bulkCreate(valuesTaxonomySubCategory);
            console.log('taxonomy_sub_category values inserted');

            const valuesTaxonomyVendor = taxonomy_vendor.map(taxonomy => ({ taxonomy_id: taxonomy.taxonomy_id, value: taxonomy.value}));
            await TaxonomyVendor.bulkCreate(valuesTaxonomyVendor);
            console.log('taxonomy_vendor values inserted');

            const valuesTaxonomyVendorTable = taxonomy_vendor_table.map(taxonomy => ({ taxonomy_id: taxonomy.taxonomy_id, value: taxonomy.value}));
            await TaxonomyVendorTable.bulkCreate(valuesTaxonomyVendorTable);
            console.log('taxonomy_vendor_table values inserted');
            
        } catch (err) {
            console.error(err);
        }
    },
    
    insertProductsData: async function() {
        try {           
            const valuesProduct = products_Data.map(product => ({ product_id: product.product_id, description: product.description, model_id: product.model_id, sku: product.sku }));
            await Product.bulkCreate(valuesProduct);
            console.log('Product values inserted');
        } catch (err) {
            console.error(err);
        }
    },
        
    insertAttributesData: async function() {
        try {
            const valuesUPC = product_UPC_Data.map(upc => ({ product_id: upc.product_id, value: upc.value }));
            await ProductUPC.bulkCreate(valuesUPC);
            console.log('UPC values inserted');
    
            const valuesMSRP = product_MSRP_Data.map(msrp => ({ product_id: msrp.product_id, value: msrp.value }));
            await ProductMSRP.bulkCreate(valuesMSRP);
            console.log('MSRP values inserted');
    
            const valuesBrand = product_brand_Data.map(brand => ({ product_id: brand.product_id, value: brand.value }));
            await ProductBrand.bulkCreate(valuesBrand);
            console.log('Brand values inserted');
    
            const valuesCat = product_cat_Data.map(cat => ({ product_id: cat.product_id, value: cat.value }));
            await ProductCategory.bulkCreate(valuesCat);
            console.log('Category values inserted');
    
            const valuesSubCat = product_sub_cat_Data.map(subcat => ({ product_id: subcat.product_id, value: subcat.value }));
            await ProductSubCategory.bulkCreate(valuesSubCat);
            console.log('Subcategory values inserted');
    
            const valuesSize = product_size_Data.map(size => ({ product_id: size.product_id, value: size.value }));
            await ProductSize.bulkCreate(valuesSize);
            console.log('Size values inserted');
    
            const valuesColor = product_color_Data.map(color => ({ product_id: color.product_id, value: color.value }));
            await ProductColor.bulkCreate(valuesColor);
            console.log('Color values inserted');
    
            const valuesSpeed = product_speed_Data.map(speed => ({ product_id: speed.product_id, value: speed.value }));
            await ProductSpeed.bulkCreate(valuesSpeed);
            console.log('Speed values inserted');
        } catch (err) {
            console.error(err);
        }
    },

    // VENDOR DATA
    insertProductTrekData: async function() {
        try {
            const valuesTrek = product_trek_Data.map(product => ({ product_id: product.product_id, description: product.description, brand: product.brand, upc: product.upc, msrp: product.msrp, size: product.size, color: product.color, speed: product.speed }));
            await ProductTrek.bulkCreate(valuesTrek);
            console.log('Trek values inserted');
        } catch (err) {
            console.error(err);
        }
    },
}