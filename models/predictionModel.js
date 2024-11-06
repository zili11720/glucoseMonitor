const dataAccess = require('../dataAccess/predictionDataAccess');
const { DecisionTreeClassifier } = require('ml-cart');

// Utility functions for encoding/decoding categorical data
const encodeMealType = (mealType) => {
    switch (mealType) {
        case 'breakfast': return 0;
        case 'lunch': return 1;
        case 'dinner': return 2;
        default: return -1;
    }
};

const encodeSpecialDay = (isSpecialDay) => (isSpecialDay === 'yes' ? 1 : 0);

const encodeGlucoseTag = (tag) => {
    switch (tag) {
        case 'low': return 0;
        case 'average': return 1;
        case 'high': return 2;
        default: return -1;
    }
};

const decodeGlucoseTag = (tag) => {
    switch (tag) {
        case 0: return 'low';
        case 1: return 'average';
        case 2: return 'high';
        default: return 'unknown';
    }
};

// Function to train decision tree based on user meal data
const trainModel = async (userId) => {
     // Fetch user's meal data from the database
     const mealData = await dataAccess.getUserMeals(userId);
     
     if (!mealData.length) {
         throw new Error('No meal data found for the user.');
     }
    const trainingData = mealData.map(row => [
        encodeMealType(row.meal_type),
        row.avg_glucose,
        encodeSpecialDay(row.is_special_day)
    ]);

    const labels = mealData.map(row => encodeGlucoseTag(row.glucose_tag));

    const decisionTree = new DecisionTreeClassifier({ gainFunction: 'gini', minNumSamples: 3, maxDepth: 10 });
    decisionTree.train(trainingData, labels);

    return decisionTree;
};

// Function to predict glucose tag based on input
const predictGlucoseLevel = (decisionTree, meal_type, avg_glucose, is_special_day) => {
    const input = [
        encodeMealType(meal_type),
        avg_glucose,
        encodeSpecialDay(is_special_day)
    ];
    const encodedPrediction = decisionTree.predict([input]); // Pass the input as a 2D array
    return decodeGlucoseTag(encodedPrediction[0]); // Decode the prediction
};

module.exports = { trainModel, predictGlucoseLevel };
