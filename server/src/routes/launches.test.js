
const request = require('supertest');

const app = require('../app');
const {
    connectMongoDB,
    disconnectMongoDB,
} = require('../services/mongo.service');

describe('Launches API Tests', () => {
    
    beforeAll(async () => {
        await connectMongoDB();
    });

    afterAll(async () => {
        await disconnectMongoDB();
    });

    describe('Test GET /v1/launches', () => {
        test('It should respond with 200 success.', async () => {
            await request(app)
                .get('/v1/launches')
                .expect('Content-Type', /json/)
                .expect(200);
        });
    });
    
    describe('Test POST /v1/launches', () => {
        const completeLaunchData = {
            mission: 'NOA Tester Mission',
            target: 'Kepler-1652 b',
            rocket: 'NOA Tester Rocket',
            launchDate: 'October 1, 2028',
        };
    
        const launchDataWithoutDate = {
            mission: 'NOA Tester Mission',
            target: 'Kepler-1652 b',
            rocket: 'NOA Tester Rocket',
        };
    
        const launchDataWithoutMission = {
            target: 'Kepler-1652 b',
            rocket: 'NOA Tester Rocket',
            launchDate: 'October 1, 2028',
        };
    
        const launchDataWithoutTarget = {
            mission: 'NOA Tester Mission',
            rocket: 'NOA Tester Rocket',
            launchDate: 'October 1, 2028',
        };
    
        const launchDataWithoutRocket = {
            mission: 'NOA Tester Mission',
            target: 'Kepler-1652 b',
            launchDate: 'October 1, 2028',
        };
    
        const launchDataWithInvalidLaunchDate = {
            mission: 'NOA Tester Mission',
            target: 'Kepler-1652 b',
            rocket: 'NOA Tester Rocket',
            launchDate: 'Invalid Launch Date',
        };
    
        test('It should respond with 201 created.', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(completeLaunchData)
                .expect('Content-Type', /json/)
                .expect(201);
    
            const requestLaunchDate = new Date(completeLaunchData.launchDate).valueOf();
            const responseLaunchDate = new Date(response.body.launchDate).valueOf();
    
            expect(responseLaunchDate).toBe(requestLaunchDate);
            expect(response.body).toMatchObject(launchDataWithoutDate);
        });
    
        test('Request without launch date should respond with 400 missing launch property.', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(launchDataWithoutDate)
                .expect('Content-Type', /json/)
                .expect(400);
    
            expect(response.body).toStrictEqual({
                error: 'Missing launch property.',
            });
        });
    
        test('Request without mission should respond with 400 missing launch property.', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(launchDataWithoutMission)
                .expect('Content-Type', /json/)
                .expect(400);
    
            expect(response.body).toStrictEqual({
                error: 'Missing launch property.',
            });
        });
    
        test('Request without target should respond with 400 missing launch property.', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(launchDataWithoutTarget)
                .expect('Content-Type', /json/)
                .expect(400);
    
            expect(response.body).toStrictEqual({
                error: 'Missing launch property.',
            });
        });
    
        test('Request without rocket should respond with 400 missing launch property.', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(launchDataWithoutRocket)
                .expect('Content-Type', /json/)
                .expect(400);
    
            expect(response.body).toStrictEqual({
                error: 'Missing launch property.',
            });
        });
    
        test('Request with invalid launch date should respond with 400 invalid launch date.', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(launchDataWithInvalidLaunchDate)
                .expect('Content-Type', /json/)
                .expect(400);
    
            expect(response.body).toStrictEqual({
                error: 'Invalid launch date.',
            });
        });
    });    
});

