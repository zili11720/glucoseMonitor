const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['csjrjrm921nrmk52n3p0.any.us-east-1.mpx.prd.cloud.redpanda.com:9092'], 
  ssl: true, 
  sasl: { 
    mechanism: 'scram-sha-256',        
    username: 'Zili',
    password: 'anI32PsnwJM2bv7VpvRISmkgctuTVN',
  }
});

module.exports = kafka;  // Export the Kafka instance for use in your producers and consumers
