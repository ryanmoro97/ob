const { DataTypes } = require('sequelize');
const db = require('../db');

const CreateTaxonomyTable = (tableName) => { 
    return db.define(tableName, {
        taxonomyId: { type: DataTypes.INTEGER, primaryKey: true },
        value: DataTypes.TEXT,
    });
};

module.exports = CreateTaxonomyTable;