const {User} = require('../../models/user');
const _ = require('lodash');
const request = require('supertest');

describe('auth middleware', () => {
  beforeEach(() => { 
    server = require('../../index'); 
    token = new User().generateAuthToken();
   
  });
 
  afterEach(async ()=>{
    await User.deleteMany({})//this cleans up the populated DB
    await server.close();// this closes the server

});

 

  const exec = () => {
    return request(server)
      .post('/api/auth')
      .set('x-auth-token', token)
      .send({ name: 'genre',email:'kyrdevel@mara.bg',password:'zombe' });
  }



  it('should return 400 if no token is provided', async () => {
    token = ''; 

    const res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 400 if token is invalid', async () => {
    token = 'a'; 

    const res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 200 if token is valid', async () => {
    let user = new User({ name: 'genre1',email:'kyrdevel@mara.bg',password:'zombe' });
    await user.save();
    const res = await request(server)
    .post('/api/users')
    .set('x-auth-token', token)
    .send({email:'kyrdevel7@mara.bg',password:'zombe',name:'pamarambo'});
    expect(res.status).toBe(200);
  });
});