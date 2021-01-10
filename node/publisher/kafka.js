const kafka = require('kafka-node');
const config = require('./config');

const Producer = kafka.Producer;
console.log(`Attempting to create client for ${config.kafka_server_host}:${config.kafka_server_port}`);
const client = new kafka.KafkaClient({kafkaHost: `${config.kafka_server_host}:${config.kafka_server_port}`});
const producer = new Producer(client);
const kafka_topic = config.kafka_topic;
const KeyedMessage = kafka.KeyedMessage;

function initializeKafkaProducer(attempt) {
    try {
        console.log(`Initializing Kafka Producer for topic ${kafka_topic}`);
        let payloads = [
            {
                topic: kafka_topic,
                messages: [
                    new KeyedMessage('TestTopicEvent', JSON.stringify({"test":"We are doing some test here"})),
                    new KeyedMessage('TestTopicEvent', JSON.stringify({"more test":"Still testing","final test":"Man, so much test"}))
                ]
            }
        ];

        producer.on('ready', async () => {
            let push_status = producer.send(payloads, (err, data) => {
                if(err) {
                    console.log('[kafka-producer -> '+kafka_topic+']: broker update failed');
                } else {
                    console.log('[kafka-producer -> '+kafka_topic+']: broker update success');
                }
            });
        });

        producer.on('error', (err) => {
            console.log(err);
            console.log('[kafka-producer -> '+kafka_topic+']: connection errored');
            throw err;
        });
    } catch(error) {
        console.log(error);
    }
}

function publishEvent(event) {
    km = new KeyedMessage('TestTopicEvent', JSON.stringify(event));
    payloads = [
        { 
            topic: kafka_topic,
            messages: [km],
            partition: 0
        }
    ];
    producer.send(payloads, (err, data) => {
        if (err)
            console.log(`Error in publishing event to topic ${kafka_topic} : ${JSON.stringify(err)}`);
        else
            console.log("Published event to topic " + kafka_topic + " :" + JSON.stringify(data));
    });
}

module.exports = {
    initializeKafkaProducer,
    publishEvent
}