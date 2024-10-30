const { consumeGlucoseData } = require('./highGlucoseConsumer');
const { consumeTestResult } = require('./testResultsConsumer');

let glucoseConsumer; // Declare the glucose consumer
let testResultConsumer; // Declare the test result consumer

const startKafkaConsumer = async (req, res) => {
  const userId = req.session.userId; // Get userId from session after login
  if (userId) {

    glucoseConsumer = await consumeGlucoseData(userId);
    testResultConsumer = await consumeTestResult();
  }

};

const disconnectKafkaConsumer = async (req, res, next) => {
  console.log("loging out")
  // Disconnect glucose consumer if it exists
  if (glucoseConsumer) {
    await glucoseConsumer.disconnect();
    glucoseConsumer = null; // Reset the consumer to allow reconnecting later
  }

  // Disconnect test result consumer if it exists
  if (testResultConsumer) {
    await testResultConsumer.disconnect();
    testResultConsumer = null; // Reset the consumer to allow reconnecting later
  }

  // Clear user session
  req.session.destroy(); // Destroy session to log the user out

  res.render('pages/index'); //redirect to the home page or login page
};

module.exports = { startKafkaConsumer, disconnectKafkaConsumer };
