const request = require('supertest');
const app = require('../src/app');

describe('App basic routes', () => {
  test('GET / should return a message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Mini Inversiones API');
  });

  test('POST /login validation error when missing fields', async () => {
    const res = await request(app).post('/login').send({ username: 'onlyuser' });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Validation error');
    expect(Array.isArray(res.body.details)).toBe(true);
  });
});