const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['cs9vj7hnu57hk0e3t22g.any.eu-central-1.mpx.prd.cloud.redpanda.com:9092'], 
  ssl: {},                      
  sasl: {                           
    mechanism: 'scram-sha-256',        
    username: 'Zili',
    password: 'sZeWm6Hffw5PwlWekB9HtVXphp8X8v',
  }
})

// Create a producer
const producer = kafka.producer()

// Create a consumer
const consumer = kafka.consumer({ groupId: 'test-group' })

// Produce a message
const runProducer = async () => {
  await producer.connect()
  await producer.send({
    topic: 'hello-world',    // Use your actual topic name
    messages: [
      { value: 'Hello Redpanda!' },
    ],
  })
  await producer.disconnect()
}

// Consume messages
const runConsumer = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic: 'hello-world', fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      })
    },
  })
}

// Run both producer and consumer
runProducer().catch(console.error)
runConsumer().catch(console.error)
