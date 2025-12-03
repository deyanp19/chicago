// this middleware file is prepared for routes that need to be forbidden for non admin. currently 12/2/2025 there is no developed routes that need this. 

module.exports = function(req,res, next) {
    //401 unauthorized
    //403 Forbidden

    if (!req.user.isAdmin) return res.status(403).send('Access denied');
    next();
}