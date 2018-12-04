/*********************************************************
Model for reviews in our database
*********************************************************/
var db = require("../db");
var sequelize = db.sequelize;
var Sequelize = db.Sequelize;

var Reviews = sequelize.define("reviews", {
  reviewId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  movieId: Sequelize.INTEGER,
  userId: Sequelize.INTEGER,
  stars: Sequelize.INTEGER,
  review: Sequelize.
});

module.exports = Reviews;
STRING