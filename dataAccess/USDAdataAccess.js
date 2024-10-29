const axios = require("axios");
const { usdaConfig } = require("../config/usdaConfig");

const getUSDAglucose = async (foodTag) => {
  try {
    const apiUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${foodTag}&api_key=${usdaConfig.apiKey}`;

    const response = await axios.get(apiUrl);
    return response.data.foods[0];
  } catch (error) {
    console.error("Error fetching glucose data:", error);
    throw error;
  }
};

module.exports = { getUSDAglucose };
