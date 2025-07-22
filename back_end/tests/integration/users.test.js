const request = require('supertest');
const {User} = require('../../models/user');
let server;

describe('/api/users',()=>{

    beforeEach(()=>{
        server = require('../../index');
    });

    afterEach(async ()=>{
        await server.close();// this closes the server
        await User.deleteMany({})//this cleans up the populated DB

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
})



