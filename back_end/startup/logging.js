require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const config = require('config');

module.exports = function() {
    winston.exceptions.handle(
        new winston.transports.Console({colorize: true, prettyPrint: true}),
        new winston.transports.File({ filename: 'exceptions.log' })
    );
    process.on('uncaughtRejection',ex=>{
        throw ex;
        process.exit(1);
      });

    winston.add(new winston.transports.MongoDB({db:`${config.get('db')}`, collection:'logs', capped: true, metaKey: 'meta'}));   
     
}

// Add this new function to log DB connection in db.js
function logDBConnection(db) {
    console.log(`Connected to the ${db} successfully`);  // Call this after DB connection is established in db.js or similar
}

module.exports.logDBConnection = logDBConnection;

// Add this new function to log server startup with the port in index.js
function logServerStart(port) {
    console.log(`Server has started on port ${port}`);  
}

module.exports.logServerStart = logServerStart;