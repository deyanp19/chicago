require('express-async-errors');

const winston = require('winston');
require('winston-mongodb');
const error = require('./middleware/error');

const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const auth = require('./routes/auth');
const users = require('./routes/users');
const express = require('express');
const app = express();
const cors = require('cors');

winston.add(new winston.transports.File({filename:'logfile.log'}));
winston.add(new winston.transports.MongoDB({db:'mongodb://localhost/vidly', collection:'logs', capped: true, metaKey: 'meta'}));

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: Backend app not authenticated jwt not present');
  process.exit(1);
}

mongoose.connect('mongodb://localhost:27017/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...',err));

app.use(cors()); // Or: app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/users/', users);

// not calling the function error, just referencing
app.use(error);

// app.use((err, req, res, next)=> {
//   console.log('deyna',err);
//   // winston.log('verbose');
//   winston.error( err.message, {metadata: {prop: err}});
//   // error
//   res.status(500).send( {error: 'Big wrong from express-async-error'})
// })



const port = process.env.PORT || config.get('PORT');
app.listen(port, () => console.log(`Backend App is listening on port ${port}...`));