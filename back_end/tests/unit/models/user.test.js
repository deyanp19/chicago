const {User} =require('../../../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

// jest.mock('jsonwebtoken');



describe('user.generateAuthToken',()=>{
    it('should return a valid JWT',()=>{
        const payload = {
            _id: new mongoose.Types.ObjectId().toHexString(),
            isAdmin:true
            }
        const user = new User(payload);
        //generate token from the generateAuthToken function
        const token = user.generateAuthToken();

        //test the token is it good token
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        expect(decoded).toMatchObject(payload);
    });
})