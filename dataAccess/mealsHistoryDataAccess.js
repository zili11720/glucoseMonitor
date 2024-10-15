const sql = require("mssql");
const db = require("../config"); // Assuming you have a config file to connect to somee DB

exports.getMealsByDateRange = async (startDate, endDate) => {
  try {
    const query = `
            SELECT meal_date, glucose_after_meal
            FROM meals
            WHERE meal_date BETWEEN ? AND ?
        `;
    const [rows] = await db.execute(query, [startDate, endDate]);
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
