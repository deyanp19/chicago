require('express-async-errors')
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

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: Backend app not authenticated jwt not present');
  process.exit(1);
}

mongoose.connect('mongodb://192.168.1.3/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(cors()); // Or: app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/users/', users);

app.use(error);// not calling the function error, just referencing



const port = process.env.PORT || config.get('PORT');
app.listen(port, () => console.log(`Backend App is listening on port ${port}...`));