const axios = require("axios");
const sql = require("mssql");
const { db } = require("../config/dbConfig");

//Get all meals of a specific user between two given dates
const getMealsByDateRange = async (startDate, endDate, userId) => {
  try {
    console.log(userId);
    const pool = await sql.connect(db);
    const result = await pool
      .request()
      .input("startDate", sql.Date, startDate)
      .input("endDate", sql.Date, endDate)
      .input("userId", sql.Int, userId).query(`SELECT 
    meal_date,
    meal_type,
    description,
    glucose_after_meal
FROM meals
WHERE meal_date BETWEEN @startDate AND @endDate 
      AND user_id = @userId
ORDER BY meal_date ASC;
    `);

    return result.recordset;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { getMealsByDateRange };

