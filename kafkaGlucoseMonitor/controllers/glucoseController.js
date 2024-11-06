// controllers/glucoseController.js
const { getRecentGlucoseLevels } = require('../dataAccess/glucoseDataAccess');
const { isHighGlucose } = require('../models/glucoseModel');
const { produceHighGlucoseAlert } = require('../kafka/highGlucoseProducer');

const checkAndAlertHighGlucoseLevels = async () => {
  try {
    const glucoseLevels = await getRecentGlucoseLevels();
    for (const { user_id, avg_glucose } of glucoseLevels) {
      if (isHighGlucose(avg_glucose)) {
        await produceHighGlucoseAlert(user_id, avg_glucose);
        console.log(`Alert sent for user ${user_id} with avg glucose ${avg_glucose}`);
      }
    }
  } catch (error) {
    console.error("Error in processing high glucose alerts:", error);
  }
};

module.exports = { checkAndAlertHighGlucoseLevels };
