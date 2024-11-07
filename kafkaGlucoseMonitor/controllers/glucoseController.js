// controllers/glucoseController.js
const { getRecentGlucoseLevels } = require('../dataAccess/glucoseDataAccess');
const { isHighGlucose } = require('../models/glucoseModel');
const { produceHighGlucoseAlert } = require('../kafka/highGlucoseProducer');

const checkAndAlertHighGlucoseLevels = async () => {
  try {
    const glucoseLevels = await getRecentGlucoseLevels();
    for (const { user_id, avg_glucose } of glucoseLevels) {
      // Limit avg_glucose to 2 decimal places
      const roundedGlucose = parseFloat(avg_glucose.toFixed(2));

      if (isHighGlucose(roundedGlucose)) {
        await produceHighGlucoseAlert(user_id, roundedGlucose);
        console.log(`Alert sent for user ${user_id} with avg glucose ${roundedGlucose}`);
      }
    }
  } catch (error) {
    console.error("Error in processing high glucose alerts:", error);
  }
};

module.exports = { checkAndAlertHighGlucoseLevels };
