const Sequelize = require("sequelize");
const logger = require("../logger/index")
const {pool} =  require('pg')

let database_name = 'netprime';
let database_role = 'aswinkumar';
let database_password = 'postgres';
let database_host = 'host.docker.internal';  //0.0.0.0

const sequelize = new Sequelize(database_name, database_role, database_password, {
  host: "host.docker.internal",
  dialect: "postgres",
  pool:{
  max: 20,
  connectionTimeoutMillis: 0,
  idleTimeoutMillis: 0,
  }

});
try {
  sequelize.authenticate();
 console.log('Connection has been established successfully.');
 logger.log("info","Connection has been established successfully.")

} catch (error) {
 console.error('Unable to connect to the database:', error);
 logger.log("error",'Unable to connect to the database:', error)
 process.exit(1)
}
module.exports = {sequelize,database_name};