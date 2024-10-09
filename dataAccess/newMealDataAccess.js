const axios = require('axios');
const fs = require('fs');

// Imagga API credentials
const API_KEY = 'acc_b9e774d772f2046';
const API_SECRET = 'bb87b2f25f6e144ec0c11ddff9a732bc';
// Imagga endpoint for tag generation
const endpoint ='https://api.imagga.com/v2/tags';

/**
 * Analyzes an image using the Imagga API and returns the tags.
 * @param {string} imagePath - The path of the uploaded image.
 * @returns {Promise<Array>} - A promise that resolves to an array of food tags.
 */
const analyzeImage = async (imagePath) => {
  try {
    const response = await axios.get(endpoint, {
        params: { image_url: imagePath },
        auth: {
            username:  API_KEY,
            password: API_SECRET,
        },
    });
    return response.data.result.tags;
} catch (error) {
    console.error('Error fetching tags:', error);
}
};

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
  



module.exports = { analyzeImage,getUSDAglucose};
