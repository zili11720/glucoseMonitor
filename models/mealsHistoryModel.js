const mealsHistoryDataAccess = require("../dataAccess/mealsHistoryDataAccess");

exports.getMealsByDateRange = async (startDate, endDate) => {
  try {
    return await mealsHistoryDataAccess.getMealsByDateRange(startDate, endDate);

    //Do all the logic here
  } catch (error) {
    throw error;
  }
};
