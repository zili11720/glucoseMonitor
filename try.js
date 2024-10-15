const { DecisionTreeClassifier } = require('ml-cart');

// Your dataset from the database
const data = [
    { meal_type: 'breakfast', avg_glucose: 115, is_special_day: 'no', glucose_tag: 'average' },
    { meal_type: 'dinner', avg_glucose: 170, is_special_day: 'yes', glucose_tag: 'high' },
    { meal_type: 'lunch', avg_glucose: 90, is_special_day: 'no', glucose_tag: 'low' },
    { meal_type: 'dinner', avg_glucose: 130, is_special_day: 'no', glucose_tag: 'high' },
    { meal_type: 'breakfast', avg_glucose: 105, is_special_day: 'yes', glucose_tag: 'low' },
];

// Feature names and labels
const features = ['meal_type', 'avg_glucose', 'is_special_day'];

// Convert categorical data into numerical values
const encodeMealType = (mealType) => {
    switch (mealType) {
        case 'breakfast': return 0;
        case 'lunch': return 1;
        case 'dinner': return 2;
        default: return -1;
    }
};

const encodeSpecialDay = (isSpecialDay) => (isSpecialDay === 'yes' ? 1 : 0);

// Encode glucose tags into numerical values
const encodeGlucoseTag = (tag) => {
    switch (tag) {
        case 'low': return 0;
        case 'average': return 1;
        case 'high': return 2;
        default: return -1;
    }
};

// Decode glucose tag back into its original form
const decodeGlucoseTag = (tag) => {
    switch (tag) {
        case 0: return 'low';
        case 1: return 'average';
        case 2: return 'high';
        default: return 'unknown';
    }
};

// Prepare the feature data and encoded labels
const trainingData = data.map(row => [
    encodeMealType(row.meal_type),
    row.avg_glucose,
    encodeSpecialDay(row.is_special_day)
]);

const labels = data.map(row => encodeGlucoseTag(row.glucose_tag));

// Train the decision tree classifier
const decisionTree = new DecisionTreeClassifier({ gainFunction: 'gini', minNumSamples: 3, maxDepth: 10 });
decisionTree.train(trainingData, labels);

// Function to predict glucose level based on new input
const predictGlucoseLevel = (meal_type,avg_glucose, is_special_day) => {
    const input = [
        encodeMealType(meal_type),
        avg_glucose,
        encodeSpecialDay(is_special_day)
    ];
    const encodedPrediction = decisionTree.predict([input]); // Pass the input as a 2D array
    return decodeGlucoseTag(encodedPrediction[0]); // Decode the prediction
};

// Example of making a prediction
const newMeal = {
    meal_type: 'dinner',
   // glucose_after_meal:,
    avg_glucose: 140,
    is_special_day: 'yes'
};

const predictedGlucoseTag = predictGlucoseLevel(
    newMeal.meal_type,
    newMeal.avg_glucose,
    newMeal.is_special_day
);

console.log(`Predicted glucose tag: ${predictedGlucoseTag}`);
