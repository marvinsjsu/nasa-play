
const request = require('supertest');
const app = require('../app');


describe('Test GET /launches', () => {
    test('It should respond with 200 success.', async () => {
        await request(app)
            .get('/launches')
            .expect('Content-Type', /json/)
            .expect(200);
    });
});

describe('Test POST /launches', () => {
    const completeLaunchData = {
        mission: 'NOA Tester Mission',
        target: 'NOA Tester Target',
        rocket: 'NOA Tester Rocket',
        launchDate: 'October 1, 2028',
    };

    const launchDataWithoutDate = {
        mission: 'NOA Tester Mission',
        target: 'NOA Tester Target',
        rocket: 'NOA Tester Rocket',
    };

    const launchDataWithoutMission = {
        target: 'NOA Tester Target',
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
        target: 'NOA Tester Target',
        launchDate: 'October 1, 2028',
    };

    const launchDataWithInvalidLaunchDate = {
        mission: 'NOA Tester Mission',
        target: 'NOA Tester Target',
        rocket: 'NOA Tester Rocket',
        launchDate: 'Invalid Launch Date',
    };

    test('It should respond with 201 created.', async () => {
        const response = await request(app)
            .post('/launches')
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
            .post('/launches')
            .send(launchDataWithoutDate)
            .expect('Content-Type', /json/)
            .expect(400);

        expect(response.body).toStrictEqual({
            error: 'Missing launch property.',
        });
    });

    test('Request without mission should respond with 400 missing launch property.', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithoutMission)
            .expect('Content-Type', /json/)
            .expect(400);

        expect(response.body).toStrictEqual({
            error: 'Missing launch property.',
        });
    });

    test('Request without target should respond with 400 missing launch property.', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithoutTarget)
            .expect('Content-Type', /json/)
            .expect(400);

        expect(response.body).toStrictEqual({
            error: 'Missing launch property.',
        });
    });

    test('Request without rocket should respond with 400 missing launch property.', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithoutRocket)
            .expect('Content-Type', /json/)
            .expect(400);

        expect(response.body).toStrictEqual({
            error: 'Missing launch property.',
        });
    });

    test('Request with invalid launch date should respond with 400 invalid launch date.', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithInvalidLaunchDate)
            .expect('Content-Type', /json/)
            .expect(400);

        expect(response.body).toStrictEqual({
            error: 'Invalid launch date.',
        });
    });
});
