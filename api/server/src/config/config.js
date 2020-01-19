require("dotenv").config();

module.exports = {
  // If using onine database
  // development: {
  //   use_env_variable: 'DATABASE_URL'
  // },

  development: {
    database: "zvzunwcc",
    username: "zvzunwcc",
    password: "PIemvPGOIYwyEP1pI8liGz4p5DQ-wAhG",
    host: "rajje.db.elephantsql.com",
    dialect: "postgres"
  },

  test: {
    database: "wxighsqe",
    username: "wxighsqe",
    password: "U6bC1y5SEKKNBowArC4-XTJDgyHp1Oem",
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
