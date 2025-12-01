const request = require('supertest');
const { User } = require('../../models/user');
const mongoose = require('mongoose');

let server;

describe('/api/users', () => {
  beforeEach(() => {
    server = require('../../index');
  });

  afterEach(async () => {
    await User.deleteMany({}); // Clean DB after each test
  });

  afterAll(async () => {
    await server.close();
    // await mongoose.connection.close(); // Optional: only if you start mongoose in tests
  });

  describe('GET /', () => {
    let token;
    let adminUser;

    const exec = async () => {
      return await request(server)
        .get('/api/users')
        .set('x-auth-token', token);
    };

    beforeEach(async () => {
      // Create an admin user to generate valid token
      adminUser = new User({
        name: 'admin',
        email: 'admin@example.com',
        password: '12345678',
        isAdmin: true // assuming only admins can list all users
      });
      await adminUser.save();

      token = adminUser.generateAuthToken();

      // Seed some regular users
      await User.insertMany([
        { name: 'ovcharcho', email: 'ovchar@example.com', password: '12345678' },
        { name: 'kravarcho', email: 'kravar@example.com', password: '12345678' },
        { name: 'glavcho',    email: 'glavcho@example.com', password: '12345678' }
      ]);
    });

    it('should return 401 if no token is provided', async () => {
      token = '';
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it('should return 403 if user is not admin', async () => {
      // Make non-admin user
      const regularUser = new User({ name: 'regular', email: 'reg@example.com', password: '12345678' });
      await regularUser.save();
      token = regularUser.generateAuthToken();

      const res = await exec();
      expect(res.status).toBe(403);
    });

    it('should return all users if user is admin', async () => {
      const res = await exec();

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
        password: '12345678'
      });
      await user.save();

      const res = await request(server).get('/api/users/' + user._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', user.name);
      expect(res.body).toHaveProperty('email', user.email);
      // Password should NOT be returned
      expect(res.body).not.toHaveProperty('password');
    });

    it('should return 404 if invalid id is passed', async () => {
      const res = await request(server).get('/api/users/1');

      expect(res.status).toBe(404);
    });

    it('should return 404 if no user with the given id exists', async () => {
      const id = new mongoose.Types.ObjectId();
      const res = await request(server).get('/api/users/' + id);

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
      expect(res.text).toMatch(/already registered/i);
    });

    it('should save the user if input is valid', async () => {
      const res = await exec();

      expect(res.status).toBe(200); // or 201

      const user = await User.find({ email: 'rambo@example.com' });
      expect(user).not.toBeNull();
    });

    it('should return the user in the response (without password)', async () => {
      const res = await exec();

      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', 'rambo');
      expect(res.body).toHaveProperty('email', 'rambo@example.com');
      expect(res.body).not.toHaveProperty('password');
    });

    it('should return a valid JWT in x-auth-token header', async () => {
      const res = await exec();

      expect(res.headers['x-auth-token']).toBeDefined();
      // Optional: verify token contains correct user ID
      const savedUser = await User.findOne({ email: 'rambo@example.com' });
      const payload = jwtDecode(res.headers['x-auth-token']);
      expect(payload._id).toBe(savedUser._id.toString());
    });
  });
});