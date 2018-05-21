require('dotenv').config();

module.exports = {
  development: {
    username: process.env.USERNAME_DEV,
    password: process.env.PASSWORD_DEV,
    database: process.env.DB_DEV,
    dialect: 'postgres'
  },
  test: {
    username: process.env.USERNAME_TEST,
    password: process.env.PASSWORD_TEST,
    database: process.env.DB_TEST,
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL'
  }
};
