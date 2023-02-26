const pool = require('./db');
const products = require('./products');

// drop database if it exists
const dropDatabase = async () => {
    try {
      await pool.query('DROP DATABASE IF EXISTS ${process.env.DB_NAME}');
      console.log('Database dropped');
    } catch (err) {
      console.error(err);
    }
  };
  
// create a new database
const createDatabase = async () => {
    try {
    await pool.query('CREATE DATABASE ${process.env.DB_NAME}');
    console.log('Database created');
} catch (err) {
    console.error(err);
    }
};
  
// connect and create a table named "product"
const createProductTable = async () => {
try {
    await pool.query('USE postgres');
    await pool.query(`
    CREATE TABLE IF NOT EXISTS product (
        id SERIAL PRIMARY KEY,
        description TEXT
    )
    `);
    console.log('Product table created');
} catch (err) {
    console.error(err);
}
};

// populate data
const insertProducts = async () => {
try {
    const values = products.map((product) => `('${product.description}')`).join(',');
    await pool.query(`
    INSERT INTO product (model_description)
    VALUES 
        ${values}
    `);
    console.log('Products inserted');
} catch (err) {
    console.error(err);
}
};
  

const setupDatabase = async () => {
// await dropDatabase();
// await createDatabase();
// await createProductTable();
await insertProducts();
pool.end();
};

setupDatabase();
