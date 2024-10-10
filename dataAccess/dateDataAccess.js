const axios = require("axios");
/**
 * Calls the Hebcal API to determine if the given date is a holiday or a regular day.
 *@returns {Promise<{ gy: number, gm: number, gd: number, hebrew: string, events?: string[] }>} 
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

    return response.data;

   
  } catch (error) {
    console.error("Error fetching day type from Hebcal:", error);
    throw new Error("Failed to fetch day type");
  }
};

module.exports = { getDateType };
