const mealsHistoryModel = require("../models/mealsHistoryModel");

async function getMealsHistory  (req, res) {
  const { startDate, endDate } = req.query;

  const userId = req.session.userId;//get user id from the session

  try {
    let mealsData = null;
    if (startDate && endDate) {
      mealsData = await mealsHistoryModel.getMealsByDateRange(startDate, endDate, userId);
    }

    // Process data for the graph only if mealsData is available
    const dataForGraph = mealsData ? mealsHistoryModel.processMealsData(mealsData) : { dates: [], averageGlucoseLevels: [] }
    res.render("pages/history", { mealsData, dates: dataForGraph.dates, averageGlucoseLevels: dataForGraph.averageGlucoseLevels });

  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

module.exports = {getMealsHistory};


