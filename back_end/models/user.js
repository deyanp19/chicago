const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        minlength:5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1024
    },
    isAdmin: Boolean
})


userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this.id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema =Joi.object( {
        name: Joi.string().min(5).max(255).required,
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(3).max(1024).required()
    })

    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;