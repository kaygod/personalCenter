const { Sequelize } = require('sequelize');

const { db } = require('../config');

const seq = new Sequelize('personCenter', db.username, db.password, {
  host: db.host,
  dialect: db.dialect,
  pool: {
    max: 20,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  timezone: '+08:00' //东八时区
});

module.exports = seq;
