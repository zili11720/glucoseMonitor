const kafka = require("../config/kafkaConfig");

let consumer;

// Initialize the consumer
const consumeGlucoseData = async (sessionUserId) => {
  consumer = kafka.consumer({ groupId: "glucose-consumer-group" });

  await consumer.connect();
  await consumer.subscribe({ topic: "high-glucose", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const glucoseData = JSON.parse(message.value.toString());
      // Check if the message userId matches the session userId
      if (glucoseData.userId === sessionUserId) {
        console.log(
          `Received message for user ${sessionUserId}: ${JSON.stringify(
            glucoseData,
            null,
            2
          )}`
        );
      }
    },
  });
  return consumer; // Return the consumer instance
};

module.exports = { consumeGlucoseData };
