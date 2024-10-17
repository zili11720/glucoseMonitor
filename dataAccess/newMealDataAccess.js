const axios = require('axios');
const fs = require('fs');
const sql = require('mssql');
const FormData = require('form-data');
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
      const form = new FormData();
      form.append('image', fs.createReadStream(imagePath)); // Upload the image as a file stream
  
      const response = await axios.post(endpoint, form, {
        headers: {
          ...form.getHeaders(),
        },
        auth: {
          username: API_KEY,
          password: API_SECRET,
        },
      });
  
      return response.data.result.tags;
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

 

module.exports = {insertMeal, analyzeImage};
