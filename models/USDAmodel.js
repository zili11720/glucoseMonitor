const USDADataAccess = require('../dataAccess/USDAdataAccess');

// Get USDA glucose level 
const getUSDAglucose = async (foodTag) => {
  
    try {
      const foodData = await USDADataAccess.getUSDAglucose(foodTag);
      // Find total sugars from the food's nutrients
      const totalSugars = foodData.foodNutrients.find(nutrient => nutrient.nutrientName.toLowerCase() === 'total sugars');
      // Return total sugars if found, else return null
      return totalSugars ? totalSugars.value : 0;
    } catch (error) {
        console.error('Error fetching glucose data:', error);
        throw error;
    }
  };

  module.exports = { getUSDAglucose};