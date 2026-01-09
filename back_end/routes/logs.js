const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const _ = require('lodash');
const {Log} = require('../models/log');
const express = require('express');
const router = express.Router();

//always do auth middleware first so it decodes the token and sends it to the admin middleware for confiming or denaying
router.post('/', auth, admin, async (req,res) => {
    const logs = await Log.find();
    res.send(logs);
});

module.exports = router;