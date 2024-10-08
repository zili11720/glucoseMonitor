const newMealDataAccess = require('../dataAccess/newMealDataAccess');

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

module.exports = { analyzeImage};
