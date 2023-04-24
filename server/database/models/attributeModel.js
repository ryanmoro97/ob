const { DataTypes } = require('sequelize');
const db = require('../db');

const CreateAttributeTable = (tableName, valueDataType, valueLength = null, isValueUnique = false) => {
  return db.define(tableName, {
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    value: {
      type: valueDataType,
      validate: {
        len: {
          args: [valueLength || 0, valueLength || Infinity],
          msg: `Value must be ${valueLength} characters long`,
        },
      },
    },
  }, {
    indexes: isValueUnique ? [{ unique: true, fields: ['value'] }] : [],
  });
};

module.exports = CreateAttributeTable;

