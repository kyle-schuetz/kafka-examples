const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const { initializeKafkaProducer } = require('./kafka');

const PORT = process.env.APP_PORT || 8091;
const APP_VERSION = "0.1";
const APP_NAME = "testPublisher";


const app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.get('/about', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`About ${APP_NAME}, Version ${APP_VERSION}\n`);
    res.write("Supported URLs:\n");
    res.write("/ping (GET)\n");
    res.write(`NodeJS runtime version ${process.version}\n`);
    res.write(`incoming headers ${JSON.stringify(req.headers)}\n`);
    res.end();
})

app.get('/ping', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`Reply from ${APP_NAME}\n`);
    res.write(`incoming headers ${JSON.stringify(req.headers)}\n`);
})

app.listen(PORT, () => {
    console.log(`Running ${APP_NAME} with version ${APP_VERSION}`);
    initializeKafkaProducer(1);
})