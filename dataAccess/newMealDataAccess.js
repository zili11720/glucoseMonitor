const axios = require('axios');
const fs = require('fs');
const sql = require('mssql');
const { dbConfig } = require('../config');



const insertMeal = async (mealData) => {
    try {
      const pool = await sql.connect(dbConfig);
  
    // Print the values being inserted for debugging
      console.log("Inserting meal data:", {
        userId: mealData.userId,
        description: mealData.foodTag,
        mealDate: mealData.mealDate,
        mealType: mealData.mealType,
        isSpecialDay: mealData.isSpecialDay,
        glucoseAfterMeal: mealData.glucoseAfterMeal,
        avgGlucose: mealData.avgGlucose,
        glucoseTag: mealData.glucoseTag,
      });
  
      const query = `
      INSERT INTO Meals (user_id, description, meal_date, meal_type, is_special_day, glucose_after_meal, avg_glucose, glucose_tag)
      VALUES (@userId, @description, @mealDate, @mealType, @isSpecialDay, @glucoseAfterMeal, @avgGlucose, @glucoseTag)
    `;

    // Set the input parameters
    await pool.request()
      .input('userId', sql.Int, mealData.userId)
      .input('description', sql.VarChar(50), mealData.foodTag)
      .input('mealDate', sql.Date, mealData.mealDate)
      .input('mealType', sql.VarChar(10), mealData.mealType)
      .input('isSpecialDay', sql.VarChar(3), mealData.isSpecialDay)
      .input('glucoseAfterMeal', sql.Float, mealData.glucoseAfterMeal)
      .input('avgGlucose', sql.Float, mealData.avgGlucose)
      .input('glucoseTag', sql.VarChar(10), mealData.glucoseTag)
      .query(query);

    } catch (error) {
      console.error('Database insertion error:', error);
      throw error;
    }
  };
  
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
      //console.log("Hebcal API response:", response.data); // Log the API response
  
      return response.data;
  
     
    } catch (error) {
      console.error("Error fetching day type from Hebcal:", error);
      throw new Error("Failed to fetch day type");
    }
  };
  
  



module.exports = {insertMeal, analyzeImage,getUSDAglucose,getDateType};
