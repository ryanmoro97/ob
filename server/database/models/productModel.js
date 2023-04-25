const { DataTypes } = require('sequelize');
const db = require('../db');

const CreateProductTable = () => {
    return db.define('product', {
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description: DataTypes.TEXT,
        model_id: DataTypes.TEXT,
        sku: DataTypes.TEXT,
    });
};

module.exports = CreateProductTable;