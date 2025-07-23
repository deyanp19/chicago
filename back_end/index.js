const winston = require('winston')
const express = require('express');
const app = express();
const config = require('config');


require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);

 

const port = process.env.PORT ||  config.get('PORT');
const server = app.listen(port, () => winston.info(`Backend App is listening on port ${port}...`)); 

module.exports = server;