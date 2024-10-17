const predictionModel = require('../models/predictionModel');
const USDAmodel = require('../models/USDAmodel');
const dateModel = require('../models/dateModel');

exports.predictGlucose = async (req, res) => {
    try {
        // Get userId from session (you already have this in your session)
        const userId = req.session.userId;
        // Train the model using user's meal data
        const decisionTree = await predictionModel.trainModel(userId);

        // Get new meal info
        const avgGlucose=await USDAmodel.getUSDAglucose(req.body.mealDescription)
        console.log("avg usda:",avgGlucose)
        let  mealType = req.body.mealType;
        let isSpecialDay=await dateModel.getDateType(req.body.mealDate)
        console.log("date:",isSpecialDay)

        // Predict glucose level for the new meal
        const predictedGlucoseTag = predictionModel.predictGlucoseLevel(
            decisionTree,
            mealType,
            parseFloat(avgGlucose), // Ensure avgGlucose is a number
            isSpecialDay
        );

        // Render the result page or send the result as JSON
        res.render('pages/prediction', { predictedGlucoseTag });
    } catch (error) {
        console.error('Error during glucose prediction:', error);
        res.status(500).send('An error occurred during prediction.');
    }
};
