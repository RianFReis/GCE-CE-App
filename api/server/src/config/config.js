require("dotenv").config();

module.exports = {
  // If using onine database
  // development: {
  //   use_env_variable: 'DATABASE_URL'
  // },

  development: {
    database: "qdivjqjv",
    username: "qdivjqjv",
    password: "9vJYNWTcrB-wRgQv1-92qXI_CqFSu3_G",
    host: "rajje.db.elephantsql.com",
    dialect: "postgres"
  },

  test: {
    database: "qdivjqjv",
    username: "qdivjqjv",
    password: "9vJYNWTcrB-wRgQv1-92qXI_CqFSu3_G",
    host: "rajje.db.elephantsql.com",
    dialect: "postgres"
  },

  production: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: "postgres"
  }
};
