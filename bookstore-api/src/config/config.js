require('dotenv').config({ path: __dirname + '/../../.env' });
const { DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_DIALECT } =
  process.env;

console.log(DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_DIALECT);

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOST,
    dialect: DB_DIALECT,
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
