// const asyncMiddleware = require('../middleware/async');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate} = require('../models/user');
const express = require('express');
const router = express.Router();
const validateObjectId = require('../middleware/validateObjectId');
const mongoose = require('mongoose');
const { log } = require('console');


router.get('/' , auth, admin, async (req,res) => {
       //if user isAdmin:true - get all the users if not return only the _id, name, email
       if (req.user.isAdmin) {
        const users = await User.find()
                       .select('-password').sort([['dateCreated', -1]]).limit(30);;
                       res.send(users); 
       } else {
        const user = await User.find({_id: req.user._id})
                       .select('-password');
                       res.send(user); 
       }
});

router.get('/:id',auth, validateObjectId, async (req,res)=>{
      
        const user = await User.findById(req.params.id)
                .select('-password');
                
         if(!user) return res.status(404).send('The given id is not valid');
         res.send(user);
});


router.post('/', async (req, res) => {

        const {error}  = validate(req.body);
        if (error) return res.status(400).send('+++ Invalid email or password');
        let user = await User.findOne({email: req.body.email});
        if (user) return res.status(400).send('+++ Invalid email ');
               

        user = new User(_.pick(req.body,['email','password','name','isAdmin']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();//saves to MongoDB with the field password in the document created with bcrypt from ln:36

        const token = user.generateAuthToken();
        res.header('x-auth-token',token).send(_.pick(user,['id','name','email','isAdmin']));
});

router.delete('/', auth, admin, async (req,res) => {
    const { ids } = req.body;
    console.log(ids)
    if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ message: 'ids must be a non-empty array' });
}

    const objectIds = ids.filter(id => mongoose.Types.ObjectId.isValid(id))
    .map(id => new mongoose.Types.ObjectId(id));
    
    const result = await User.updateMany(
        {
        _id: { $in: objectIds },
        status: { $ne: 'deleted' }
        },
        {
        $set: {
            status: 'deleted',
            deletedAt: new Date()
        }
        }
    );

    return res.status(204).json({
        matched: result.matchedCount,
        modified: result.modifiedCount
    });
})
module.exports = router;