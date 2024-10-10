const newMealModel = require('../models/newMealModel');

exports.analyzeImage = async (req, res) => {
    try {
        // Get the image URL from the form
        const imageUrl = req.body.imageUrl;
        
        // Call the model to analyze the image
        const foodTag = await newMealModel.analyzeImage(imageUrl);
        // Send the tag result to the EJS page
        res.render('pages/home', { foodTag });

    } catch (error) {
        console.error('Error analyzing image:', error);
        res.status(500).send('Error analyzing the image');
    }
};
exports.getUSDAglucose = async (foodTag) => { // Change to accept foodTag directly
    try {
        
        let foodTag ="pasta"
        // Call the model to get the glucose level

        const glucoseLevel = await newMealModel.getUSDAglucose(foodTag);
        //console.log(glucoseLevel)
        
    } catch (error) {
        console.error('Error fetching glucose level:', error);
        throw error; // Rethrow the error for the analyzeImage function to handle
    }
};
