// controller
const mealsHistoryModel = require("../models/mealsHistoryModel");

exports.getMealsHistory = async (req, res) => {
  const { startDate, endDate } = req.query;
  const userId = req.session.userId;

  try {
    let mealsData = null;
    if (startDate && endDate) {
      mealsData = await mealsHistoryModel.getMealsByDateRange(startDate, endDate, userId);
    }

    // Process data for the graph only if mealsData is available
    const dataForGraph = mealsData ? mealsHistoryModel.processMealsData(mealsData) : { dates: [], averageGlucoseLevels: [] };
    console.log(dataForGraph)
    res.render("pages/history", { mealsData, dates: dataForGraph.dates, averageGlucoseLevels: dataForGraph.averageGlucoseLevels });

  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
