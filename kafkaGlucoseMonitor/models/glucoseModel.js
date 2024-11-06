// models/glucoseModel.js

const HIGH_GLUCOSE_THRESHOLD = 120;  // mg/dL - High threshold based on diabetes guidelines

const isHighGlucose = (avgGlucose) => {
  return avgGlucose >= HIGH_GLUCOSE_THRESHOLD;
};

module.exports = { isHighGlucose };
