
const sql = require('mssql');
const dbConfig = require('../config/dbConfig');

//Get all glucose levels of the users from the past two month
const getRecentGlucoseLevels = async () => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request()
  .input('dateThreshold', sql.DateTime, new Date(new Date().setMonth(new Date().getMonth() - 2)))
  .query(`
    SELECT user_id, AVG(glucose_after_meal) AS avg_glucose
    FROM meals
    WHERE meal_date >= @dateThreshold
    GROUP BY user_id
  `);
  
    return result.recordset;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
};

module.exports = { getRecentGlucoseLevels };
