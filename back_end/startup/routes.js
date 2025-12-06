// in the function of the module will put everything to do with the routes and the middleware 
const error = require('../middleware/error');
const auth = require('../routes/auth');
const users = require('../routes/users');
const cors = require('cors');
const express = require('express');
const config = require('config');

module.exports = function(app) {
    app.use(cors({
         origin: config.get('URI') ,
         credentials: true ,
         methods: ['GET', 'POST', 'PUT', 'DELETE'] ,
         allowedHeaders: ['Content-Type', 'x-auth-token'],
        })); 
        // Or: app.use(cors({ origin: 'http://localhost:3001' ,credentials: true  })) for development until system is in place;include the Access-Control-Allow-Origin header in its responses, specifying your frontend's local development URL
    app.options('*', cors());
    app.use(express.json());
    app.use('/api/auth', auth);
    app.use('/api/users/', users);

    
    // not calling the function error, just referencing
    app.use(error);
}