const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const kafka = require('kafka-node');
const config = require('./config');

const PORT = process.env.APP_PORT || 3000;
const APP_VERSION = "0.1";
const APP_NAME = "testPublisher";


const app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.get('/about', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`About ${APP_NAME}, Version ${APP_VERSION}\n`);
    res.write("Supported URLs:\n");
    res.write("/ping (GET)\n;");
    res.write("NodeJS runtime version " + process.version);
    res.write("incoming headers" + JSON.stringify(req.headers));
    res.end();
})

app.listen(PORT, () => {
    console.log(`Running ${APP_NAME} with version ${APP_VERSION}`);
})