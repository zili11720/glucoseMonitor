// kafkaMiddleware.js
const { consumeGlucoseData } = require('./highGlucoseConsumer');
const { consumeTestResult  } = require('./testResultsConsumer');

const startKafkaConsumer = async (req, res, next) => {
   console.log("hi")
  const userId = req.session.userId; // Assuming userId is set in session after login
  if (userId) {
    await consumeGlucoseData(userId);
    await consumeTestResult();
  }
  next();
};

module.exports = startKafkaConsumer;
