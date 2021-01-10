module.exports = {
    kafka_topic: 'test-topic',
    kafka_server_host: process.env.KAFKA_HOST || "zookeeper-service.kafka-ca1",
    kafka_server_port: process.env.ZOOKEEPER_PORT || "2181",
  };