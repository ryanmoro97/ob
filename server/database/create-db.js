const pool = require('./db');

const createTables = require('./create-tables');
const deleteTables = require('./delete-tables');
const { insertTaxonomy, insertProducts, insertAttributes } = require('./insert-values');

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
