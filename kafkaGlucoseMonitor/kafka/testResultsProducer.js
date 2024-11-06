// kafka/testResultsProducer.js
const kafka = require('../config/kafkaConfig');

const produceTestResultsReady = async () => {
  const producer = kafka.producer();
  await producer.connect();

  await producer.send({
    topic: 'test-results',
    messages: [
      { value: JSON.stringify({ message: 'Test results are ready', timestamp: new Date().toISOString() }) }
    ]
  });
  await producer.disconnect();
};

module.exports = { produceTestResultsReady };
