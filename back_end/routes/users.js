const asyncMiddleware = require('../middleware/async');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate} = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/me' , auth,asyncMiddleware( async (req,res, next) => {

        const user = await User.findById(req.body._id).select('-password');
        res.send(user);
  
}));

router.post('/',asyncMiddleware( async (req, res, next) => {

           const {error}  = validate(res.body);
    if (error) return res.status(400).send('+++ Invalid email or password');
    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send('+++ Invalid email ');

    user = new User(_.pick(req.body,['email','password','name']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token',token).send(_.pick(user,['id','name','email']));

 
}));

module.exports = router;