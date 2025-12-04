const request = require('supertest');
const { User } = require('../../models/user');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

let server;

describe('/api/users', () => {
  beforeEach(() => {
    server = require('../../index');
    // require('../../models/user');
    
  });

  afterEach(async () => {
    await User.deleteMany({}); // Clean DB after each test
  });

  afterAll(async () => {
    // await server.close();
    await mongoose.connection.close(); // Optional: only if you start mongoose in tests
  });

  let token;
  let adminUser;

  const exec = async (token) => {
    return await request(server)
      .get('/api/users')
      .set('x-auth-token', token);
    };
  describe('GET /', () => {
    //the get method on the api/users route is authenticated only by the jw token so no username or password
  

    beforeEach(async () => {
      await User.insertMany([
        { name: 'ovcharcho', email: 'ovchar@example.com', password: '12345678' },
        { name: 'kravarcho', email: 'kravar@example.com', password: '12345678' },
        { name: 'glavcho',    email: 'glavcho@example.com', password: '12345678' }
      ]);
    });

    it('should return 401 if no token is provided', async () => {
      token = '';
      const res = await exec(token);
      expect(res.status).toBe(401);
    });

    it('should return one user if user is not admin', async () => {
      // Make non-admin user
      const regularUser = new User({ name: 'regular', email: 'reg@example.com', password: '12345678', isAdmin:false });
      await regularUser.save();
      token = regularUser.generateAuthToken();

      const res = await exec(token);
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body.some(u => u.name === 'regular')).toBeTruthy();// hard coded from the 4 inserted above
      expect(res.body.some(u => u.email === 'reg@example.com')).toBeTruthy();
    });

    it('should return all users if user is admin', async () => {
      //1. get real admin user token by creating admin user
      const adminUser = new User({ name: 'admin', email: 'reg@example.com', password: '12345678', isAdmin:true });
      await adminUser.save();
      token = adminUser.generateAuthToken();

      //2. use this token to sent the 
      const res = await exec(token);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(4); // 3 seeded + 1 admin
      expect(res.body.some(u => u.name === 'glavcho')).toBeTruthy();
      expect(res.body.some(u => u.email === 'glavcho@example.com')).toBeTruthy();
    });
  });

  describe('GET /:id', () => { 
    it('should return a user if valid id is passed', async () => {
      const user = new User({
        name: 'umoko',
        email: 'umoko@example.com',
        password: '12345678',
        isAdmin:false
      });
      await user.save();

      token = user.generateAuthToken();

      const res = await request(server)
            .get('/api/users/' + user._id.toString())
            .set('x-auth-token', token);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', user.name);
      expect(res.body).toHaveProperty('email', user.email);
      // Password should NOT be returned
      expect(res.body).not.toHaveProperty('password');
    });

    it('should return 404 if invalid id is passed', async () => {
      const user = new User({
        name: 'umoko',
        email: 'umoko@example.com',
        password: '12345678',
        isAdmin:false
      });
      await user.save();

      token = user.generateAuthToken();
      const res = await request(server)
          .get('/api/users/1')
          .set('x-auth-token', token);

      expect(res.status).toBe(404);
    });

    it('should return 404 if no user with the given id exists', async () => {
      const id = new mongoose.Types.ObjectId();
      const res = await request(server)
            .get('/api/users/' + id)
            .set('x-auth-token',token);

      expect(res.status).toBe(404);
    });
  });

  describe('POST /', () => {
    const exec = () => {
      return request(server)
        .post('/api/users')
        .send({
          name: 'rambo',
          email: 'rambo@example.com',
          password: 'ValidPass123'
        });
    };

    it('should return 400 if user is already registered (duplicate email)', async () => {
      await new User({
        name: 'existing',
        email: 'rambo@example.com',
        password: '12345678'
      }).save();

      const res = await exec();

      expect(res.status).toBe(400);
     });

    it('should save the user if input is valid', async () => {
      const res = await exec();

      expect(res.status).toBe(200); // or 201

      const user = await User.find({ email: 'rambo@example.com' });
      expect(user).not.toBeNull();
    });

    it('should return the user in the response (without password)', async () => {
      const res = await exec();

      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('name', 'rambo');
      expect(res.body).toHaveProperty('email', 'rambo@example.com');
      expect(res.body).not.toHaveProperty('password');
    });

    it('should return a valid JWT in x-auth-token header', async () => {
      const res = await exec();

      expect(res.headers['x-auth-token']).toBeDefined();
      // Optional: verify token contains correct user ID
      const savedUser = await User.findOne({ email: 'rambo@example.com' });
      const token = res.headers['x-auth-token'];
      const payload = jwt.verify(token, config.get('jwtPrivateKey'));
      expect(payload._id).toBe(savedUser._id.toString());
    });
  
});
});