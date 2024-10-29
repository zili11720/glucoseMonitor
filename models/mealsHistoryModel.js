const mealsHistoryDataAccess = require("../dataAccess/mealsHistoryDataAccess");

const getMealsByDateRange = async (startDate, endDate, userId) => {
  try {
    return await mealsHistoryDataAccess.getMealsByDateRange(
      startDate,
      endDate,
      userId
    );
  } catch (error) {
    throw error;
  }
};

// Function to process meal data and return unique dates and average glucose levels
const processMealsData = (mealsData) => {
  const dailyGlucoseMap = {};

  mealsData.forEach((meal) => {
    const dateKey = new Date(meal.meal_date).toISOString().split('T')[0]; // Format as YYYY-MM-DD

    // Initialize entry for the date if it doesn't exist
    if (!dailyGlucoseMap[dateKey]) {
      dailyGlucoseMap[dateKey] = { totalGlucose: 0, count: 0 };
    }

    // Accumulate glucose levels and count
    dailyGlucoseMap[dateKey].totalGlucose += meal.glucose_after_meal;
    dailyGlucoseMap[dateKey].count += 1;
  });

  // Prepare unique dates and average glucose levels arrays
  const dates = Object.keys(dailyGlucoseMap).sort((a, b) => new Date(a) - new Date(b)); // Sort by date
  const averageGlucoseLevels = dates.map((date) => {
    const avg = (
      dailyGlucoseMap[date].totalGlucose / dailyGlucoseMap[date].count
    ).toFixed(1);
    return parseFloat(avg); // Convert to float
  });

  return { dates, averageGlucoseLevels }; // Return both arrays
};

module.exports = { getMealsByDateRange, processMealsData };
