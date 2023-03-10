const db = require('./db');

const { products_Data, product_UPC_Data, product_MSRP_Data, product_brand_Data, product_sub_cat_Data, product_cat_Data, product_color_Data, product_speed_Data, product_size_Data } = require('./entity_values');
const { taxonomy_brand, taxonomy_category, taxonomy_sub_category, taxonomy_vendor } = require('./taxonomy');
const { TaxonomyBrand, TaxonomyCategory, TaxonomySubCategory, TaxonomyVendor, Product, ProductUPC, ProductMSRP, ProductBrand, ProductCategory, ProductSubCategory, ProductSize, ProductColor, ProductSpeed } = require('./create-tables');

module.exports = {
    insertTaxonomyData: async function() {
        try {
            const valuesTaxonomyBrand = taxonomy_brand.map(taxonomy => ({ taxonomyId: taxonomy.taxonomyId, value: taxonomy.value}));
            await TaxonomyBrand.bulkCreate(valuesTaxonomyBrand);
            console.log('taxonomy_brand values inserted');

            const valuesTaxonomyCategory = taxonomy_category.map(taxonomy => ({ taxonomyId: taxonomy.taxonomyId, value: taxonomy.value}));
            await TaxonomyCategory.bulkCreate(valuesTaxonomyCategory);
            console.log('taxonomy_category values inserted');

            const valuesTaxonomySubCategory = taxonomy_sub_category.map(taxonomy => ({ taxonomyId: taxonomy.taxonomyId, value: taxonomy.value}));
            await TaxonomySubCategory.bulkCreate(valuesTaxonomySubCategory);
            console.log('taxonomy_sub_category values inserted');

            const valuesTaxonomyVendor = taxonomy_vendor.map(taxonomy => ({ taxonomyId: taxonomy.taxonomyId, value: taxonomy.value}));
            await TaxonomyVendor.bulkCreate(valuesTaxonomyVendor);
            console.log('taxonomy_vendor values inserted');
        } catch (err) {
            console.error(err);
        }
    },
    
    insertProductsData: async function() {
        try {           
            const valuesProduct = products_Data.map(product => ({ id: product.id, description: product.description, model_id: product.model_id, sku: product.sku }));
            await Product.bulkCreate(valuesProduct);
            console.log('Product values inserted');
        } catch (err) {
            console.error(err);
        }
    },
        
    insertAttributesData: async function() {
        try {
            const valuesUPC = product_UPC_Data.map(upc => ({ productId: upc.productId, value: upc.value }));
            await ProductUPC.bulkCreate(valuesUPC);
            console.log('UPC values inserted');
    
            const valuesMSRP = product_MSRP_Data.map(msrp => ({ productId: msrp.productId, value: msrp.value }));
            await ProductMSRP.bulkCreate(valuesMSRP);
            console.log('MSRP values inserted');
    
            const valuesBrand = product_brand_Data.map(brand => ({ productId: brand.productId, value: brand.value }));
            await ProductBrand.bulkCreate(valuesBrand);
            console.log('Brand values inserted');
    
            const valuesCat = product_cat_Data.map(cat => ({ productId: cat.productId, value: cat.value }));
            await ProductCategory.bulkCreate(valuesCat);
            console.log('Category values inserted');
    
            const valuesSubCat = product_sub_cat_Data.map(subcat => ({ productId: subcat.productId, value: subcat.value }));
            await ProductSubCategory.bulkCreate(valuesSubCat);
            console.log('Subcategory values inserted');
    
            const valuesSize = product_size_Data.map(size => ({ productId: size.productId, value: size.value }));
            await ProductSize.bulkCreate(valuesSize);
            console.log('Size values inserted');
    
            const valuesColor = product_color_Data.map(color => ({ productId: color.productId, value: color.value }));
            await ProductColor.bulkCreate(valuesColor);
            console.log('Color values inserted');
    
            const valuesSpeed = product_speed_Data.map(speed => ({ productId: speed.productId, value: speed.value }));
            await ProductSpeed.bulkCreate(valuesSpeed);
            console.log('Speed values inserted');
        } catch (err) {
            console.error(err);
        }
    }
}