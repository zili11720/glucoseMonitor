const axios = require("axios");
/**
 * Calls the Hebcal API to determine if the given date is a holiday or a regular day.
 * @returns {Promise<{ date: string, dayType: string }>} - A promise that resolves to the current date and day type.
 */
const getDateType = async (userDate) => {
  try {
    // Split the date into year, month, and day
    const [year, month, day] = userDate.split("-");

    // Call the Hebcal API with the user's date
    const response = await axios.get(
      `https://www.hebcal.com/converter?cfg=json&gy=${year}&gm=${month}&gd=${day}&g2h=1`
    );
    console.log("Hebcal API response:", response.data); // Log the API response

    const hebcalData = response.data;

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
  } catch (error) {
    console.error("Error fetching day type from Hebcal:", error);
    throw new Error("Failed to fetch day type");
  }
};

module.exports = { getDateType };
