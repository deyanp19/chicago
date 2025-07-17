//this route is called when logging in and controlls server response to http requrests in the machine that will come with   POST header for requrest and the route will go to the database and look for user if found registered with email will compare the provided password with the stored hashed password.

// const asyncMiddleware = require('../middleware/async');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  
    const {error} =  validateAuth(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');

    const token = user.generateAuthToken();
    res.header('x-auth-token',token).send(_.pick(user,['id','name','email'])); 
 
});

function validateAuth(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    })
    return schema.validate(req)
};

module.exports = router;