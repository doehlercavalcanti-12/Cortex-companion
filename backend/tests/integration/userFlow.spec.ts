import request from 'supertest';
import app from '../../src/infrastructure/api/server';

describe('User registration flow', () => {
  it('creates a new user with sanitized payload', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        name: 'Grace Hopper',
        email: 'grace@example.com',
        password: 'C0d3M0narch!'
      })
      .expect(201);

    expect(response.body).toMatchObject({ email: 'grace@example.com' });
  });
});
