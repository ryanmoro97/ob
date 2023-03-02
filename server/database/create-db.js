const pool = require('./db');
const { Products, UPC, MSRP } = require('./entities');
  
const createTables = async () => {
    try {
        await pool.query(`
        CREATE TABLE IF NOT EXISTS product (
            id SERIAL PRIMARY KEY,
            description TEXT,
            sku TEXT
        )
        `);
        console.log('Product table created');

        await pool.query(`
        CREATE TABLE IF NOT EXISTS UPC (
            id SERIAL PRIMARY KEY,
            value TEXT
        )
        `);
        console.log('UPC table created');

        await pool.query(`
        CREATE TABLE IF NOT EXISTS MSRP (
            id SERIAL PRIMARY KEY,
            value DECIMAL(10,2)
        )
        `);
        console.log('MSRP table created');
    } catch (err) {
        console.error(err);
    }
};

const deleteTables = async () => {
    try {
        await pool.query(`
        DROP TABLE IF EXISTS product
        `);
        console.log('Product table deleted');

        await pool.query(`
        DROP TABLE IF EXISTS UPC
        `);
        console.log('UPC table deleted');

        await pool.query(`
        DROP TABLE IF EXISTS MSRP
        `);
        console.log('MSRP table deleted');
    } catch (err) {
        console.error(err);
    }
};

// populate data
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

// populate data
const insertAttributes = async () => {
    try {
        const valuesUPC = UPC.map((upc) => `('${upc.id}', '${upc.value}')`).join(',');
        await pool.query(`
        INSERT INTO UPC (id, value)
        VALUES ${valuesUPC}
        `);
        console.log('UPC values inserted');

        const valuesMSRP = MSRP.map((msrp) => `('${msrp.id}', '${msrp.value}')`).join(',');
        await pool.query(`
            INSERT INTO MSRP (id, value)
            VALUES ${valuesMSRP}
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
    await insertProducts();
    await insertAttributes();
    pool.end();
};

setupDatabase();
