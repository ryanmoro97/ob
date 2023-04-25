const { DataTypes } = require('sequelize');
const db = require('../db');

const CreateVendorProductTable = (tablename) => {
    return db.define(tablename, {
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description: DataTypes.TEXT,
        brand: DataTypes.TEXT,
        upc: DataTypes.TEXT,
        msrp: DataTypes.TEXT,
        size: DataTypes.TEXT,
        color: DataTypes.ARRAY(DataTypes.STRING),
        speed: DataTypes.TEXT
    });
};

module.exports = CreateVendorProductTable;