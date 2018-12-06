/*********************************************************
Model for users in our database
*********************************************************/
var db = require("../db");
var sequelize = db.sequelize;
var Sequelize = db.Sequelize;

var Users = sequelize.define("users", {
  userId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  userName: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING
});

module.exports = Users;
