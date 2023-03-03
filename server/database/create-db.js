const pool = require('./db');
const { Products, product_UPC, product_MSRP, product_brand } = require('./entities');
const { taxonomy_brand } = require('./taxonomy');
  
const createTables = async () => {
    try {
        //taxonomy
        await pool.query(`
        CREATE TABLE IF NOT EXISTS taxonomy_brand (
            id SERIAL PRIMARY KEY,
            value TEXT
        )
        `);
        console.log('taxonomy_brand table created');

        // main product table
        await pool.query(`
        CREATE TABLE IF NOT EXISTS product (
            id SERIAL PRIMARY KEY,
            description TEXT,
            sku TEXT
        )
        `);
        console.log('Product table created');

        // attributes
        await pool.query(`
        CREATE TABLE IF NOT EXISTS product_UPC (
            id SERIAL PRIMARY KEY,
            value TEXT
        )
        `);
        console.log('product_UPC table created');

        await pool.query(`
        CREATE TABLE IF NOT EXISTS product_MSRP (
            id SERIAL PRIMARY KEY,
            value DECIMAL(10,2)
        )
        `);
        console.log('product_MSRP table created');

        await pool.query(`
        CREATE TABLE IF NOT EXISTS product_brand (
            id SERIAL PRIMARY KEY,
            value INTEGER
        )
        `);
        console.log('product_brand table created');
    } catch (err) {
        console.error(err);
    }
};

const deleteTables = async () => {
    try {
        await pool.query(`
        DROP TABLE IF EXISTS taxonomy_brand
        `);
        console.log('taxonomy_brand table deleted');

        await pool.query(`
        DROP TABLE IF EXISTS product
        `);
        console.log('Product table deleted');

        await pool.query(`
        DROP TABLE IF EXISTS product_UPC
        `);
        console.log('UPC table deleted');

        await pool.query(`
        DROP TABLE IF EXISTS product_MSRP
        `);
        console.log('MSRP table deleted');

        await pool.query(`
        DROP TABLE IF EXISTS product_brand
        `);
        console.log('product_brand table deleted');
    } catch (err) {
        console.error(err);
    }
};

const insertTaxonomy = async () => {
    try {
        const valuesTaxonomyBrand = taxonomy_brand.map((brand) => `('${brand.id}', '${brand.value}')`).join(',');
        await pool.query(`
        INSERT INTO taxonomy_brand (id, value)
        VALUES ${valuesTaxonomyBrand}
        `);
        console.log('taxonomy_brand values inserted');
    }catch (err) {
        console.error(err);
    }
};

const insertProducts = async () => {
    try {
        const valuesProduct = Products.map((product) => `('${product.id}', '${product.description}', '${product.sku}')`).join(',');
        await pool.query(`
        INSERT INTO product (id, description, sku)
        VALUES ${valuesProduct}
        `);
        console.log('Products inserted');
    } catch (err) {
        console.error(err);
    }
};

const insertAttributes = async () => {
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
        console.log('MSRP values inserted');
    }catch (err) {
        console.error(err);
    }
};

const dropDatabase = async () => {
    pool.query('DROP DATABASE obsession', (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Database deleted successfully');
    });
};

const createDatabase = async () => {
    pool.query('CREATE DATABASE obsession', (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Database created successfully');
    });
};
  

const setupDatabase = async () => {
    // await dropDatabase();
    // await createDatabase();
    await deleteTables();
    await createTables();
    await insertTaxonomy();
    await insertProducts();
    await insertAttributes();
    pool.end();
};

setupDatabase();
