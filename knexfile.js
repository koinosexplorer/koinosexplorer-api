// add env
require('dotenv').config();

// ref: https://devhints.io/knex
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host:     process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      user:     process.env.DB_USER,
      password: process.env.DB_PASSWORD
    }
  },
  production: {
    client: 'pg',
    connection: {
      host:     process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      user:     process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    }
  }
}