const request = require('supertest');
const app = require('../src/app');
const connectDB = require('../src/config/db');
const mongoose = require('mongoose');
const Errors = require('../src/constants/Error');
const Success = require('../src/constants/Success');
const StatusCodes = require('../src/constants/StatusCodes');
const jwt = require('jsonwebtoken');

let validToken = "";
const baseHeaders = {
    'Authorization' : ''
}
const JWT_SECRET = process.env.JWT_SECRET;
validToken = jwt.sign({ id : "6773ab11b15cc1f9281b9c0a" }, JWT_SECRET);
baseHeaders['Authorization'] = `Bearer ${validToken}`;

describe('Create a new blog post', () => {
    beforeAll(async () => {
        await connectDB(globalThis.__MONGO_URI__);
    })

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    })
    
    it('Should create a blog post with the specified data', async () => {
        const res = await request(app).post('/api/blogs').set(baseHeaders).send({
            title : "Test title",
            content : "This is a test blog"
        });

        expect(res.statusCode).toBe(StatusCodes.SUCCESS_CREATED);
    });
});

describe('Fetch all blog posts', () => {
    beforeAll(async () => {
        await connectDB(globalThis.__MONGO_URI__);
    })

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    })

    it('Should fetch all blog posts', async () => {
        const res = await request(app).get('/api/blogs').set(baseHeaders).send();
        expect(res.statusCode).toBe(StatusCodes.SUCCESS_OK);
    });
});

describe('Fetch a single blog post by ID', () => {
    let created_id = "";

    beforeAll(async () => {
        await connectDB(globalThis.__MONGO_URI__);
    })

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    })

    it('Should create a blog post with the specified data', async () => {
        const res = await request(app).post('/api/blogs').set(baseHeaders).send({
            title : "Test title",
            content : "This is a test blog"
        });

        expect(res.statusCode).toBe(StatusCodes.SUCCESS_CREATED);
        expect(res.body).toHaveProperty('id');
        created_id = res.body.id;
    });

    it('Should fetch a single blog post by ID', async () => {
        const res = await request(app).get(`/api/blogs/${created_id}`).set(baseHeaders).send();
        expect(res.statusCode).toBe(StatusCodes.SUCCESS_CREATED);
        expect(res.body).toHaveProperty('id');
        expect(res.body.id).toBe(created_id);
    });
});

describe('Update a blog post', () => {
    let created_id = "";
    
    beforeAll(async () => {
        await connectDB(globalThis.__MONGO_URI__);
    })

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    })

    it('Should create a blog post with the specified data', async () => {
        const res = await request(app).post('/api/blogs').set(baseHeaders).send({
            title : "Test title",
            content : "This is a test blog"
        });

        expect(res.statusCode).toBe(StatusCodes.SUCCESS_CREATED);
        expect(res.body).toHaveProperty('id');
        created_id = res.body.id;
    });

    it('Should update a single blog post by specified ID', async () => {
        const res = await request(app).put(`/api/blogs/${created_id}`).set(baseHeaders).send({
            title : "Updated title",
            content : "Updated content"
        });
        expect(res.statusCode).toBe(StatusCodes.SUCCESS_CREATED);
        expect(res.body).toHaveProperty('id');
        expect(res.body.id).toBe(created_id);
    });


});

describe('Delete a blog post', () => {
    let created_id = "";
    
    beforeAll(async () => {
        await connectDB(globalThis.__MONGO_URI__);
    })

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    })

    it('Should create a blog post with the specified data', async () => {
        const res = await request(app).post('/api/blogs').set(baseHeaders).send({
            title : "Test title",
            content : "This is a test blog"
        });

        expect(res.statusCode).toBe(StatusCodes.SUCCESS_CREATED);
        expect(res.body).toHaveProperty('id');
        created_id = res.body.id;
    });

    it('Should delete a blog post by specified ID', async () => {
        const res = await request(app).delete(`/api/blogs/${created_id}`).set(baseHeaders).send();
        expect(res.statusCode).toBe(StatusCodes.SUCCESS_OK);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe(Success.BLOG_DELETED_SUCCESSFULLY);
    });
});