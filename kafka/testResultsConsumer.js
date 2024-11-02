const kafka = require('../config/kafkaConfig');
const messageService = require('./messageService');

let consumer;

// Initialize the consumer
const consumeTestResult = async () => {
    consumer = kafka.consumer({ groupId: 'results-consumer-group' });

    await consumer.connect();
    await consumer.subscribe({ topic: 'test-results', fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const receivedMessage = JSON.parse(message.value.toString());
        messageService.broadcastMessage(receivedMessage.message);
      },
    });
  return consumer; // Return the consumer instance
};

module.exports = { consumeTestResult };
