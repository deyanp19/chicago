require('express-async-errors');// this will make the middleware async.js and error.js to be deleted from the code implimentation
const winston = require('winston');
// const error = require('./middleware/error');
require('winston-mongodb');

const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const auth = require('./routes/auth');
const users = require('./routes/users');
const express = require('express');
const app = express();
const cors = require('cors');

// winston.add(new winston.transports.File({filename:'logfile.log'}));
// winston.add(new winston.transports.MongoDB({db:'mongodb://localhost:21017/vidly', collection:'logs-barlogs', capped: true, metaKey: 'meta'}));

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: Backend app not authenticated jwt not present');
  process.exit(1);
}

mongoose.connect('mongodb://localhost:270197/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...',err));

app.use(cors()); // Or: app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/users/', users);

//app.use(error);// not calling the function error, just referencing



const port = process.env.PORT || config.get('PORT');
app.listen(port, () => console.log(`Backend App is listening on port ${port}...`));