const dateDataAccess = require("../dataAccess/dateDataAccess");

/**
 * Retrieves the current day type (holiday, Hol Hamoed, or regular day).
 * @returns {Promise<{ date: string, dayType: string }>} - A promise that resolves to the current date and day type.
 */
const getDateType = async (userDate) => {
  const dayTypeData = await dateDataAccess.getDateType(userDate); // העברת התאריך לגישה לנתונים
  return dayTypeData;
};

module.exports = { getDateType };
