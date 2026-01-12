const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {Post} = require('../models/post');
const express = require('express');
const router = express.Router();
const validateObjectId = require('../middleware/validateObjectId');
const mongoose = require('mongoose');

router.get('/',  async (req,res) => {
    const posts = await Post.find({ status: { $ne: 'deleted' } }).sort([['dateCreated', -1]]).limit(30);
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

router.delete('/', auth, admin, async (req,res) => {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ message: 'ids must be a non-empty array' });
}

    const objectIds = ids.filter(id => mongoose.Types.ObjectId.isValid(id))
    .map(id => new mongoose.Types.ObjectId(id));
    
    console.log(objectIds);
    const result = await Post.updateMany(
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