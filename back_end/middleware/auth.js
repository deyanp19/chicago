const jwt = require('jsonwebtoken');
const config = require("config");

module.exports = function(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(400).send("Access denied. Where is the token, its not provided");

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        
        next();
    } catch (err) {
        res.status(400).send('Invalid token')
    }
}