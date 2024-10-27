// Import the Kafka configuration
const kafka = require('./kafkaConfig');

// Initialize the consumer
const consumeTestResult = async () => {
  const consumer = kafka.consumer({ groupId: 'results-consumer-group' });

  await consumer.connect();
  await consumer.subscribe({ topic: 'test-results', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
    const receivedMessage = message.value.toString();
    console.log(`Received message: ${receivedMessage}`);
    },
  });
};

module.exports = { consumeTestResult  };
