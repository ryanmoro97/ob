const pool = require('./db');
const products = require('./products');
  
const createProductTable = async () => {
try {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS product (
        id SERIAL PRIMARY KEY,
        description TEXT,
        sku TEXT,
        upc TEXT,
        msrp DECIMAL(10,2)
    )
    `);
    console.log('Product table created');
} catch (err) {
    console.error(err);
}
};

const deleteProductTable = async () => {
    try {
        await pool.query(`
        DROP TABLE IF EXISTS product
        `);
        console.log('Product table deleted');
    } catch (err) {
        console.error(err);
    }
    };

// populate data
const insertProducts = async () => {
try {
    const values = products.map((product) => `('${product.id}', '${product.description}', '${product.sku}', '${product.upc}', '${product.msrp}')`).join(',');
    await pool.query(`
    INSERT INTO product (id, description, sku, upc, msrp)
    VALUES 
        ${values}
    `);
    console.log('Products inserted');
} catch (err) {
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
    // await deleteProductTable();
    // await createProductTable();
    await insertProducts();
    pool.end();
};

setupDatabase();
