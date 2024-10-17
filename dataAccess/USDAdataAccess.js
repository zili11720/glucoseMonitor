const axios = require('axios');

const getUSDAglucose = async (foodTag) => {
    const apiKey = 'ADb3Bwhl88Im15E6P0fu320AkpSFaXZkw6gaZBil';
    const apiUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${foodTag}&api_key=${apiKey}`;
  
    try {
        const response = await axios.get(apiUrl);
        return response.data.foods[0];
    
    } catch (error) {
        console.error('Error fetching glucose data:', error);
        throw error;
    }
  };

  module.exports = {getUSDAglucose};