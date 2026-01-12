const winston = require('winston')
const express = require('express');
const app = express();
const logging = require('./startup/logging');

// winston.add(new winston.transports.File({filename:'logfile.log'}));
// winston.add(new winston.transports.MongoDB({db:'mongodb://localhost:21017/vidly', collection:'logs-barlogs', capped: true, metaKey: 'meta'}));

const config = require('config');


require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);

 



//app.use(error);// not calling the function error, just referencing



const port = process.env.PORT || config.get('PORT');

// Only actually start listening when we are NOT running tests
if (process.env.NODE_ENV !== 'test') {
    const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));
    logging.logServerStart(port);
  }
  
  // Export the Express app so supertest can use it directly
  module.exports = app;   //
// app.listen(port, () => console.log(`Backend App is listening on port ${port}...`));
