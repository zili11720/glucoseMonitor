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
