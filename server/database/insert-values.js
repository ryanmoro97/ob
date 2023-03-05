const pool = require('./db');
const { Products, product_UPC, product_MSRP, product_brand, product_sub_cat, product_cat , product_color, product_speed, product_size } = require('./entity_values');
const { taxonomy_brand, taxonomy_sub_cat, taxonomy_cat} = require('./taxonomy');

module.exports = {
    insertTaxonomy: async function() {
        try {
            const valuesTaxonomyBrand = taxonomy_brand.map((brand) => `('${brand.id}', '${brand.value}')`).join(',');
            await pool.query(`
            INSERT INTO taxonomy_brand (id, value)
            VALUES ${valuesTaxonomyBrand}
            `);
            console.log('taxonomy_brand values inserted');

            const valuesTaxonomyCat = taxonomy_cat.map((cat) => `('${cat.id}', '${cat.value}')`).join(',');
            await pool.query(`
            INSERT INTO taxonomy_cat (id, value)
            VALUES ${valuesTaxonomyCat}
            `);
            console.log('taxonomy_cat values inserted');
    
            const valuesTaxonomySubCat = taxonomy_sub_cat.map((subcat) => `('${subcat.id}', '${subcat.value}')`).join(',');
            await pool.query(`
            INSERT INTO taxonomy_sub_cat (id, value)
            VALUES ${valuesTaxonomySubCat}
            `);
            console.log('taxonomy_sub_cat values inserted');
        }catch (err) {
            console.error(err);
        }
    },
    
    insertProducts: async function() {
        try {           
            const valuesProduct = Products.map((product) => `('${product.id}', '${product.description}', '${product.model_id}', '${product.sku}')`).join(',');
            await pool.query(`
            INSERT INTO product (id, description, model_id, sku)
            VALUES ${valuesProduct}
            `);
            console.log('Products inserted');
        } catch (err) {
            console.error(err);
        }
    },
    
    insertAttributes: async function() {
        try {
            const valuesUPC = product_UPC.map((upc) => `('${upc.id}', '${upc.value}')`).join(',');
            await pool.query(`
            INSERT INTO product_UPC (id, value)
            VALUES ${valuesUPC}
            `);
            console.log('UPC values inserted');
    
            const valuesMSRP = product_MSRP.map((msrp) => `('${msrp.id}', '${msrp.value}')`).join(',');
            await pool.query(`
                INSERT INTO product_MSRP (id, value)
                VALUES ${valuesMSRP}
            `);
            console.log('MSRP values inserted');
    
            const valuesBrand = product_brand.map((brand) => `('${brand.id}', '${brand.value}')`).join(',');
            await pool.query(`
                INSERT INTO product_brand (id, value)
                VALUES ${valuesBrand}
            `);
            console.log('product_brand values inserted');
    
            const valuesCat = product_cat.map((cat) => `('${cat.id}', '${cat.value}')`).join(',');
            await pool.query(`
                INSERT INTO product_cat (id, value)
                VALUES ${valuesCat}
            `);
            console.log('product_cat values inserted');

            const valuesSubCat = product_sub_cat.map((subcat) => `('${subcat.id}', '${subcat.value}')`).join(',');
            await pool.query(`
                INSERT INTO product_sub_cat (id, value)
                VALUES ${valuesSubCat}
            `);
            console.log('product_sub_cat values inserted');

            const valuesSize = product_size.map((size) => `('${size.id}', '${size.value}')`).join(',');
            await pool.query(`
                INSERT INTO product_size (id, value)
                VALUES ${valuesSize}
            `);
            console.log('product_size values inserted');

            const valuesColor = product_color.map((color) => `('${color.id}', '${color.value}')`).join(',');
            await pool.query(`
                INSERT INTO product_color (id, value)
                VALUES ${valuesColor}
            `);
            console.log('product_color values inserted');

            const valuesSpeed = product_speed.map((speed) => `('${speed.id}', '${speed.value}')`).join(',');
            await pool.query(`
                INSERT INTO product_speed (id, value)
                VALUES ${valuesSpeed}
            `);
            console.log('product_speed values inserted');
        }catch (err) {
            console.error(err);
        }
    }
}