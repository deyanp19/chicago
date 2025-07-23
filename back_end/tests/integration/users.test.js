const request = require('supertest');
const {User} = require('../../models/user');
let server;

describe('/api/users',()=>{

    beforeEach(()=>{
        server = require('../../index');
    });

    afterEach(async ()=>{
        await User.deleteMany({})//this cleans up the populated DB
        await server.close();// this closes the server

    });

    describe('GET /',() => {

        const user = new User({ name: 'test', email: 'test@example.com', password: '12345' });//create instance to have access to generateAuthToken()
            it('should return all users with get', async () => {
                    await user.collection.insertMany([
                    {name:"ovcharcho",email:"kofa"},
                    {name:"kravarcho",email:"zele"},
                    {name: "glavcho",email:"bokluk"} 
                ]);

                const token = user.generateAuthToken();
                const res = await request(server).get('/api/users').set('x-auth-token',token);

                expect(res.status).toBe(200);
                expect(res.body.length).toBeGreaterThan(2);
                expect(res.body.some(user=>user.name==='glavcho')).toBeTruthy();

            })
        });

    describe('GET /:id', ()=>{
        it('shold return a single user by the provided id in the path ',async ()=>{
            const user = new User({name:'umoko',email:'zarabana' ,password:'chombo'});
            await user.save();

            const res = await request(server).get(`/api/users/${user._id}`);
           
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name',user.name);
        });

        it('shold return 404 if invalid id is passed',async ()=>{
            const res = await request(server).get(`/api/users/1`);
           
            expect(res.status).toBe(404);
        });
    });

    describe('POST /',  ()=> {
        it('should return 401 if client is not logged in', async ()=> {
            const res = await request(server).post('/api/users').send({name:"rambo", email:'zoko',password:'chomba' });

            expect(res.status).toBe(400);//this check the login crudentials to register user on this path. Its not authenticating, because on this path you save new users and also login.
        
        
        });
    })
})



