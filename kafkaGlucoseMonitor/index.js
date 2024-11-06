//To execute use: node kafkaGlucoseMonitor/index.js

const { checkAndAlertHighGlucoseLevels } = require('./controllers/glucoseController');
const { AlertTestResults } = require('./controllers/testResultsController');

// Helper function to add a delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Run the functions with a 5-second delay between them
const runMonitoringWithDelay = async () => {
  try {
    await checkAndAlertHighGlucoseLevels();
    await delay(10000); // Wait 10 seconds
    await AlertTestResults();
  } catch (error) {
    console.error(error);
  }
};

// Run once when starting the app
runMonitoringWithDelay();
