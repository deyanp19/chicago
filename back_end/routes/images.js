const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate} = require('../models/user');
const express = require('express');
const router = express.Router();
const validateObjectId = require('../middleware/validateObjectId');
const mongoose = require('mongoose');


router.get('/:id',auth, async (req,res)=>{
      
        const user = await User.findById(req.params.id)
                .select('-password');
                
         if(!user) return res.status(404).send('The given id is not valid');
         res.send(user);
});