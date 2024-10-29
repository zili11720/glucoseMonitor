const axios = require("axios");
const sql = require("mssql");
const { db } = require("../config/dbConfig");

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
/*exports.getMealsByDateRange = async (startDate, endDate, userId) => {
  try {
    const query = `
      SELECT 
        meal_date,
        AVG(glucose_after_meal) AS avg_glucose,
        (
          SELECT meal_type, description, glucose_after_meal
          FROM meals AS m2
          WHERE m2.meal_date = m1.meal_date AND m2.user_id = @userId
          FOR JSON PATH
        ) AS meals
      FROM meals AS m1
      WHERE meal_date BETWEEN @startDate AND @endDate AND user_id = @userId
      GROUP BY meal_date
      ORDER BY meal_date ASC;
    `;

    const pool = await sql.connect(db);
    const result = await pool
      .request()
      .input("startDate", sql.Date, startDate)
      .input("endDate", sql.Date, endDate)
      .input("userId", sql.Int, userId)
      .query(query);

    console.log("dataAccess:", result.recordset);
    return result.recordset;
  } catch (error) {
    console.error(error);
    throw error;
  }
}; */
