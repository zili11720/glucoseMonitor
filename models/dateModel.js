const dateDataAccess = require('../dataAccess/dateDataAccess');

/**
 * Retrieves the current day type (holiday, Hol Hamoed, or regular day).
 * @returns {Promise<{ date: string, dayType: string }>} - A promise that resolves to the current date and day type.
 */
const getDateType = async (userDate) => { 

    const hebcalData = await dateDataAccess.getDateType(userDate); 
    console.log(hebcalData)
    let dayType = "Regular Day"; // Default to "Regular Day"
    if (hebcalData.events) {
      const eventsCount = hebcalData.events.length;
  
      if (eventsCount === 1 && hebcalData.events[0].includes("Parashat")) {
        dayType = "Regular Day"; // Only "Parashat" - classified as "Regular Day"
      } else {
        dayType = "Holiday"; // More than one event or different events - classified as "Holiday"
      }
    }
  
    return {
      date: userDate,
      dayType: dayType,
    };
  };
  
  
  module.exports = {getDateType};
  