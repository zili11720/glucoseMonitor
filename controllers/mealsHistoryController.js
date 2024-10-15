const mealsHistoryModel = require('../models/mealsHistoryModel');

exports.getMealsHistory = async (req, res) => {
  const { startDate, endDate } = req.query;
  const userId = req.session.userId;//Get current user id from id session

  try {
    let mealsData = null;
    console.log("userId:", userId)
    console.log({ startDate, endDate })
    // Fetch data only if both dates are provided
    if (startDate && endDate) {
      mealsData = await mealsHistoryModel.getMealsByDateRange(startDate, endDate, userId);
    }
    console.log("data:", mealsData)
    // Render the page with mealsData (either null or the fetched data)
    res.render("pages/history", { mealsData });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
