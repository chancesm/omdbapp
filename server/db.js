var Sequelize = require('sequelize');
const sequelize = new Sequelize('OMDB','ladmin','chiachiteng');
exports.sequelize = sequelize;
exports.Sequelize = Sequelize;