const jwt = require('jsonwebtoken');
const config = require("config");

module.exports = function(req, res, next) {
    // throw new Error('tests is express-async-errors is covering sucessfuly the application so it doesent hault the process');

    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send("Access denied. Where is the token, its not provided");

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
       
        req.user = decoded;
        
        next();
    } catch (err) {
        res.status(400).send('Invalid token')
    }
}