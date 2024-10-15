const mealsHistoryDataAccess = require("../dataAccess/mealsHistoryDataAccess");

exports.getMealsByDateRange = async (startDate, endDate) => {
  try {
    return await mealsHistoryDataAccess.getMealsByDateRange(startDate, endDate);
  } catch (error) {
    throw error;
  }
};
