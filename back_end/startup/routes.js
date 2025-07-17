// in the function of the module will put everything to do with the routes and the middleware 
const error = require('../middleware/error');
const auth = require('../routes/auth');
const users = require('../routes/users');
const cors = require('cors');
const express = require('express');

module.exports = function(app) {
    app.use(cors()); // Or: app.use(cors({ origin: 'http://localhost:3000' }))
    app.use(express.json());
    app.use('/api/auth', auth);
    app.use('/api/users/', users);
    
    // not calling the function error, just referencing
    app.use(error);
}