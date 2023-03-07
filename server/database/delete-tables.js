const pool = require('./db');

module.exports = deleteTables = async () => {
    try {
        // TAXONOMY
        await pool.query(`
        DROP TABLE IF EXISTS taxonomy_vendor
        `);
        console.log('taxonomy_vendor table deleted');

        await pool.query(`
        DROP TABLE IF EXISTS taxonomy_brand
        `);
        console.log('taxonomy_brand table deleted');

        await pool.query(`
        DROP TABLE IF EXISTS taxonomy_sub_cat
        `);
        console.log('taxonomy_sub_cat table deleted');

        await pool.query(`
        DROP TABLE IF EXISTS taxonomy_cat
        `);
        console.log('taxonomy_cat table deleted');

        // MAIN PRODUCT TABLE
        await pool.query(`
        DROP TABLE IF EXISTS product
        `);
        console.log('Product table deleted');


        // CORE ATTRIBUTES
        await pool.query(`
        DROP TABLE IF EXISTS product_UPC
        `);
        console.log('product_UPC table deleted');

        await pool.query(`
        DROP TABLE IF EXISTS product_brand
        `);
        console.log('product_brand table deleted');

        await pool.query(`
        DROP TABLE IF EXISTS product_cat
        `);
        console.log('product_cat table deleted');

        await pool.query(`
        DROP TABLE IF EXISTS product_sub_cat
        `);
        console.log('product_sub_cat table deleted');


        // EXTRA ATTRIBUTES
        await pool.query(`
        DROP TABLE IF EXISTS product_MSRP
        `);
        console.log('product_MSRP table deleted');

        await pool.query(`
        DROP TABLE IF EXISTS product_color
        `);
        console.log('product_color table deleted');

        await pool.query(`
        DROP TABLE IF EXISTS product_size
        `);
        console.log('product_size table deleted');

        await pool.query(`
        DROP TABLE IF EXISTS product_speed
        `);
        console.log('product_speed table product_speed');

    } catch (err) {
        console.error(err);
    }
};