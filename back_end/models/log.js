const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const LogsSchema = new mongoose.Schema({
    message: {
        type:String
    }
});

const Log = mongoose.model('Log', LogsSchema);

exports.Log = Log;