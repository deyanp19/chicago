const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const auth = require('./routes/auth');
const users = require('./routes/users');
const express = require('express');
const app = express();

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: Backend app not authenticated jwt not present');
  process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/users/', users);


const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Backend App is listening on port ${port}...`));