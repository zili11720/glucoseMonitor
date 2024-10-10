// db.js
const sql = require("mssql");
const { dbConfig } = require("./config");

// פונקציה להתחבר ל-DB
const connectToDb = async () => {
  try {
    const pool = await sql.connect(dbConfig);
    console.log("Connected to the database");
    return pool;
  } catch (err) {
    console.error("Database connection failed", err);
    throw err;
  }
};

module.exports = { connectToDb, sql };
