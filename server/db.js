var Sequelize = require('sequelize');
const sequelize = new Sequelize('OMDB','ladmin','chiachiteng', {
    dialect:"mysql"
});
exports.sequelize = sequelize;
exports.Sequelize = Sequelize;