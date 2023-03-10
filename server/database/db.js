const { Sequelize } = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  port: config.PORT,
  dialect: config.dialect,
});

module.exports = sequelize;
