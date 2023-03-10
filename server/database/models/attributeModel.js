const { DataTypes } = require('sequelize');
const db = require('../db');

const CreateAttributeTable = (tableName, valueDataType) => {
    return db.define(tableName, {
      productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      value: valueDataType
    });
};    
  
module.exports = CreateAttributeTable;