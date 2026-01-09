const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {Post} = require('../models/post');
const express = require('express');
const router = express.Router();
const validateObjectId = require('../middleware/validateObjectId');

router.get('/',  async (req,res) => {
    const posts = await Post.find().sort([['dateCreated', -1]]).limit(30);
    res.send(posts);
});

router.get('/:id', auth, validateObjectId, async (req,res)=> {
    // here post refers to the article in the db
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).send('The given article id is not valid');
    res.send(post);
});

router.post('/', auth, admin, async (req,res) => {
    
    // here post refers to the article in the db
    
    let post = await Post.findOne({title: req.body.title});
    if (post) return res.status(400).send('There is article with this title');

    post = new Post(_.pick(req.body, ['title','content','author','image','tag']));
    
    await post.save();
    res.send(_.pick(post,['id','title','author','dateCreated']));
});

module.exports = router;