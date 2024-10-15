const mealsHistoryModel = require("../models/mealsHistoryModel");

exports.getMealsHistory = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    // Fetch data from the model
    const mealsData = await mealsHistoryModel.getMealsByDateRange(
      startDate,
      endDate
    );

    // Render the history page with the fetched data
    res.render("pages/history", { mealsData });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
