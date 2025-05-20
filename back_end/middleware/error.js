const { metadata } = require('@/app/layout');
const winston = require('winston');



// below is middleware to handle exceptions
module.exports = function(err, req,res, next){

  winston.error( err.message, {metadata: {prop: err}});
  //error
  //worn
  //info - inside mongod
  //debug
  //silly
    res.status(500).send('something happen with the server',err)
  };