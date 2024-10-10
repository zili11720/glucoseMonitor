const newMealDataAccess = require('../dataAccess/newMealDataAccess');


const addMeal = async (userId, foodTag, mealDate, mealType, isSpecialDay, glucoseAfterMeal, avgGlucose) => {
  console.log("hi from model")
  const glucoseTag="high"
  try {
    await newMealDataAccess.insertMeal({
      userId:  parseInt(userId, 10),
      foodTag,
      mealDate,
      mealType,
      isSpecialDay,
      glucoseAfterMeal,
      avgGlucose,
      glucoseTag
    });
  } catch (error) {
    throw new Error('Error adding meal to the database');
  }
};

/**
 * Analyzes an image and returns the primary food tag.
 * @param {string} imagePath - The path of the uploaded image.
 * @returns {Promise<string>} - A promise that resolves to the primary food tag.
 */
const analyzeImage = async (imagePath) => {

  const tags = await newMealDataAccess.analyzeImage(imagePath); // Call the data access function

  if (isFoodImage(tags)) {
    // Get the first tag with confidence > 70
    const highConfidenceTag = tags.find(tag => tag.confidence > 70);
    return highConfidenceTag ? highConfidenceTag.tag.en : 'Unknown food';
  } else {
    return 'Not Food';
  }
};

/**
 * Checks if the image contains food-related tags.
 * @param {Array} tags - The list of tags from the Imagga API.
 * @returns {boolean} - True if the image contains food-related tags, otherwise false.
 */
const isFoodImage = (tags) => {
  // Define a list of common food-related keywords
  const foodKeywords = ['food', 'meal', 'dish', 'snack', 'breakfast', 'lunch', 'dinner', 'pasta', 'pizza', 'fruit', 'vegetable', 'drink'];

  // Check if any of the tags contain food-related keywords
  return tags.some(tag => foodKeywords.includes(tag.tag.en.toLowerCase()));
};

// Get USDA glucose level (new function)
const getUSDAglucose = async (foodTag) => {
  
  try {
    const foodData = await newMealDataAccess.getUSDAglucose(foodTag);
      
    // Find total sugars from the food's nutrients
    const totalSugars = foodData.foodNutrients.find(nutrient => nutrient.nutrientName.toLowerCase() === 'total sugars');
    // Return total sugars if found, else return null
    return totalSugars ? totalSugars.value : null;
  } catch (error) {
      console.error('Error fetching glucose data:', error);
      throw error;
  }
};

/**
 * Retrieves the current day type (holiday, Hol Hamoed, or regular day).
 * @returns {Promise<{ date: string, dayType: string }>} - A promise that resolves to the current date and day type.
 */
const getDateType = async (userDate) => { 

  const hebcalData = await newMealDataAccess.getDateType(userDate); // העברת התאריך לגישה לנתונים
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
};


module.exports = { addMeal, analyzeImage, getUSDAglucose,getDateType};
