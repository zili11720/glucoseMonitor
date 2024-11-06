// kafka/highGlucoseProducer.js
const kafka = require('../config/kafkaConfig');

const produceHighGlucoseAlert = async (userId, avgGlucose) => {
  const producer = kafka.producer();
  await producer.connect();

  await producer.send({
    topic: 'high-glucose',
    messages: [
      { value: JSON.stringify({ userId, avgGlucose, timestamp: new Date().toISOString() }) }
    ]
  });

  await producer.disconnect();
};

module.exports = { produceHighGlucoseAlert };
