// backend/config/db.js

const { Sequelize } = require('sequelize');
const config = require('config');

// Retrieve MySQL configuration from default.json
const dbConfig = config.get('mysql');

// Initialize Sequelize
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  logging: true, // Disable SQL query logging; set to true for debugging
});

module.exports = sequelize;
