const pool = require('./db');

module.exports = createTables = async () => {
    try {
        // TAXONOMY
        await pool.query(`
        CREATE TABLE IF NOT EXISTS taxonomy_brand (
            id SERIAL PRIMARY KEY,
            value TEXT
        )
        `);
        console.log('taxonomy_brand table created');
        
        await pool.query(`
        CREATE TABLE IF NOT EXISTS taxonomy_cat (
            id SERIAL PRIMARY KEY,
            value TEXT
        )
        `);
        console.log('taxonomy_cat table created');

        await pool.query(`
        CREATE TABLE IF NOT EXISTS taxonomy_sub_cat (
            id SERIAL PRIMARY KEY,
            value TEXT
        )
        `);
        console.log('taxonomy_sub_cat table created');


        // MAIN PRODUCT TABLE
        await pool.query(`
        CREATE TABLE IF NOT EXISTS product (
            id SERIAL PRIMARY KEY,
            description TEXT,
            model TEXT,
            sku TEXT
        )
        `);
        console.log('Product table created');


        // CORE ATTRIBUTES
        await pool.query(`
        CREATE TABLE IF NOT EXISTS product_UPC (
            id SERIAL PRIMARY KEY,
            value TEXT
        )
        `);
        console.log('product_UPC table created');

        await pool.query(`
        CREATE TABLE IF NOT EXISTS product_brand (
            id SERIAL PRIMARY KEY,
            value INTEGER
        )
        `);
        console.log('product_brand table created');
        
        await pool.query(`
        CREATE TABLE IF NOT EXISTS product_cat (
            id SERIAL PRIMARY KEY,
            value INTEGER
        )
        `);
        console.log('product_cat table created');

        await pool.query(`
        CREATE TABLE IF NOT EXISTS product_sub_cat (
            id SERIAL PRIMARY KEY,
            value INTEGER
        )
        `);
        console.log('product_sub_cat table created');


        // EXTRA ATTRIBUTES
        await pool.query(`
        CREATE TABLE IF NOT EXISTS product_MSRP (
            id SERIAL PRIMARY KEY,
            value DECIMAL(10,2)
        )
        `);
        console.log('product_MSRP table created');

        await pool.query(`
        CREATE TABLE IF NOT EXISTS product_size (
            id SERIAL PRIMARY KEY,
            value TEXT
        )
        `);
        console.log('product_size table created');

        await pool.query(`
        CREATE TABLE IF NOT EXISTS product_color (
            id SERIAL PRIMARY KEY,
            value TEXT
        )
        `);
        console.log('product_color table created');

        await pool.query(`
        CREATE TABLE IF NOT EXISTS product_speed (
            id SERIAL PRIMARY KEY,
            value TEXT
        )
        `);
        console.log('product_speed table created');

    } catch (err) {
        console.error(err);
    }
};