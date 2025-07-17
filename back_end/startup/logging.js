require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');

module.exports = function() {
    winston.exceptions.handle(
        new winston.transports.Console({colorize: true, prettyPrint: true}),
        new winston.transports.File({ filename: 'exceptions.log' })
    );
    process.on('uncaughtRejection',ex=>{
        throw ex;
        process.exit(1);
      });

    winston.add(new winston.transports.MongoDB({db:'mongodb://localhost/vidly', collection:'logs', capped: true, metaKey: 'meta'}));    
}