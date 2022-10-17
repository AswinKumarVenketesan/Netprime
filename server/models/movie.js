const Sequelize = require("sequelize");
const {sequelize} = require("../database/db");

const Movie = sequelize.define("movie", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  moviename: {
    type: Sequelize.STRING,
  },
  year: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  imdb: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  genre:{
    type: Sequelize.STRING,
  },
  director:{
    type: Sequelize.STRING,
    allowNull: false
  },
  image_url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  youtube_url:{
    type: Sequelize.STRING,
    allowNull: false
  }
  
},{
  freezeTableName: true,
  timestamps: false
});

module.exports = Movie;