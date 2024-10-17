const sql = require('mssql'); // Assuming you're using MSSQL based on somee.com
const {dbConfig} = require('../config'); // get connection string from config file

// Function to fetch user's meals by userId
const getUserMeals = async (userId) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('userId', sql.Int, userId)
            .query('SELECT meal_type, avg_glucose, is_special_day, glucose_tag FROM Meals WHERE user_id = @userId');
        return result.recordset; // Returns user's meals data
    } catch (error) {
        console.error('Error fetching user meals from DB:', error);
        throw error;
    }
};

module.exports = { getUserMeals };
