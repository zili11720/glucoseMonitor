const { produceTestResultsReady } = require('../kafka/testResultsProducer');

const AlertTestResults = async () => {
    try {
        await produceTestResultsReady ();
      
    } catch (error) {
      console.error("Error in processing test results ready alerts:", error);
    }
  };
  
  module.exports = { AlertTestResults };