const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['csjrjrm921nrmk52n3p0.any.us-east-1.mpx.prd.cloud.redpanda.com:9092'], 
  ssl:true,
  retry: {
    initialRetryTime: 300,  // Initial delay before the first retry
    retries: 2              // Maximum number of retry attempts
  }, 
  sasl: { 
    mechanism: 'scram-sha-256',        
    username: 'Zili',
    password: 'anI32PsnwJM2bv7VpvRISmkgctuTVN',
  },
  connectionTimeout: 30000, // 30 seconds
  requestTimeout: 30000,
});

module.exports = kafka;  // Export the Kafka instance for use in your producers and consumers
