 
const winston = require('winston');

// below is middleware to handle exceptions
module.exports = function(err, req, res, next){
  // winston.log('error');
  winston.error( err.message, err);
  //error
  //warn
  //info - inside mongod
  // verbose
  //debug
  //silly
  res.status(500).send( {error: 'Big wrong from express-async-error; '+err})
  next(err);
  };