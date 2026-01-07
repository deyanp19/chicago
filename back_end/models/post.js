const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
const { time } = require('console');

const AuthorsSchema = new mongoose.Schema({
        name:String,
        avatar: String
    });

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 255
    },
    content: {
        type: String,
        required: true,
        minlength: 10
    },
    author: {
        type: [AuthorsSchema],
        default: undefined,
        required: true
    },
    // {{change 1}} Add image field
    image: {
        type: String,  // Stores the path or URL to the image, e.g., '/uploads/post.jpg'
        default: null  // Optional, can be null if no image is uploaded
    },
    tag: {
        type: String,
        default: null
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    timeCreated: {
        type: String,
        default: new Date().toLocaleTimeString()
    }
});

const Post = mongoose.model('Post', PostSchema);

exports.Post = Post;