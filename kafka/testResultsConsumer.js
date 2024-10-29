const kafka = require('../config/kafkaConfig');

let consumer;

// Initialize the consumer
const consumeTestResult = async () => {
    consumer = kafka.consumer({ groupId: 'results-consumer-group' });

    await consumer.connect();
    await consumer.subscribe({ topic: 'test-results', fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const receivedMessage = message.value.toString();
        console.log("consumer running")
        console.log(`Received message: ${receivedMessage}`);
      },
    });
  return consumer; // Return the consumer instance
};

module.exports = { consumeTestResult };
