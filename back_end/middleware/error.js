

// below is middleware to handle exceptions
module.exports = function(err, req,res, next){
    res.status(500).send('something happen with the server',ex)
  };