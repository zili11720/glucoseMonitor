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

module.exports = { analyzeImage };
