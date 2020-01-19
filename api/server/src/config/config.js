require("dotenv").config();

module.exports = {
  // If using onine database
  // development: {
  //   use_env_variable: 'DATABASE_URL'
  // },

  development: {
    environment: "development",
    database: "zvzunwcc",
    username: "zvzunwcc",
    password: "PIemvPGOIYwyEP1pI8liGz4p5DQ-wAhG",
    host: "rajje.db.elephantsql.com",
    dialect: "postgres"
  },

  test: {
    environment: "test",
    database: "wxighsqe",
    username: "wxighsqe",
    password: "U6bC1y5SEKKNBowArC4-XTJDgyHp1Oem",
    host: "rajje.db.elephantsql.com",
    dialect: "postgres"
  },

  production: {
    environment: "production",
    database: "jxgukpse",
    username: "jxgukpse",
    password: "vxl9faatBYRyDfp3VFo9kCBKv14LjME5",
    host: "rajje.db.elephantsql.com",
    dialect: "postgres"
  }
};
