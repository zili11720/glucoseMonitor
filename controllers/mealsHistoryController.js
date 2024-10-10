// mealController.js
//const Meal = require("../models/mealsHistoryModel"); // Assuming you have a Meal model

// mealController.js
const { connectToDb, sql } = require("../config/db");
const moment = require("moment");

// פונקציה לשליפת הנתונים בין תאריכים מסוימים
exports.mealsHistoryPage = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // המרת תאריכים לפורמט הנדרש
    const start = moment(startDate).format("YYYY-MM-DD");
    const end = moment(endDate).format("YYYY-MM-DD");

    // חיבור ל-DB
    const pool = await connectToDb();

    // שאילתה לשליפת הנתונים
    const result = await pool
      .request()
      .input("startDate", sql.Date, start)
      .input("endDate", sql.Date, end)
      .query(
        "SELECT meal_date, glucose_after_meal FROM Meals WHERE meal_date BETWEEN @startDate AND @endDate ORDER BY meal_date"
      );

    const meals = result.recordset;

    // העברת הנתונים ל-EJS לצורך הצגה בגרף
    res.render("history", { meals });
  } catch (err) {
    console.error("Error fetching data from DB:", err);
    res.status(500).send("Error fetching data");
  }
};
