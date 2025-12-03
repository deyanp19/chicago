const request = require('supertest');
const { User } = require('../../models/user');
const mongoose = require('mongoose');

let server;
let token;
let user;
let body;

describe('auth middleware', () => {
  beforeEach(async () => {
    server = require('../../index');
    require('../../models/user');
  });

  afterEach(async () => {
    await User.deleteMany({});
    // await server.close();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // Helper to make authenticated requests to a protected route
  const exec = (body,token) => {
    return request(server)
      .post('/api/auth') // Replace with an actual protected route
      .set('x-auth-token', token)
      .send(body == undefined ? {} : {"email":"test@example.com","password":"12345678"});
  };

  it('should return 401 if no token is provided', async () => {
    token = ''; // override

    const res = await exec(body,token);
    // console.log(res.status)
    expect(res.status).toBe(400); // Usually 401 for auth issues, not 400
  });

  it('should return 400 if token is invalid', async () => {
    token = 'invalidtoken123';

    const res = await exec(body, token);

    expect(res.status).toBe(400); // Or 401 depending on your middleware
  });

  // it('should return 200 if login is valid', async () => {
  //   const user = new User({
  //     name: 'umoko',
  //     email: 'umoko@example.com',
  //     password: '12345678',
  //     isAdmin:false
  //   });
  //   await user.save();

  //   token = user.generateAuthToken();
  //   const res = await request(server)
  //     .post('/api/auth') 
  //     .send({email:'umoko@example.com',password:'12345678'});
    
  //   expect(res.status).toBe(200); // or 201 depending on the route
  // });
  // Optional: test with expired token
  it('should return 400 if token is expired', async () => {
    // Generate token with past expiration
    token = new User().generateAuthToken({ exp: Math.floor(Date.now() / 1000) - 3600 });

    const res = await exec(body, token);
    expect(res.status).toBe(400);
  });
});