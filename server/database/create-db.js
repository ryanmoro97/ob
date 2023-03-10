const { createTables } = require('./create-tables');
const deleteTables = require('./delete-tables');
const { insertTaxonomyData, insertProductsData, insertAttributesData } = require('./insert-values');
const db = require('./db');

const setupDatabase = async () => {
    await db.authenticate();
    console.log('Connection has been established successfully.');
    
    await deleteTables();
    await createTables();
    await db.sync();

    await insertTaxonomyData();
    await insertProductsData();
    await insertAttributesData();
};

setupDatabase();
