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

    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({ email: 'grace@example.com', password: 'C0d3M0narch!' })
      .expect(200);

    expect(loginResponse.body).toEqual(
      expect.objectContaining({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
        expiresIn: expect.any(Number),
      }),
    );

    const refreshResponse = await request(app)
      .post('/api/auth/refresh')
      .send({ refreshToken: loginResponse.body.refreshToken })
      .expect(200);

    expect(refreshResponse.body.refreshToken).not.toEqual(loginResponse.body.refreshToken);

    await request(app)
      .post('/api/auth/logout')
      .send({ refreshToken: refreshResponse.body.refreshToken })
      .expect(204);

    await request(app)
      .post('/api/auth/refresh')
      .send({ refreshToken: refreshResponse.body.refreshToken })
      .expect(401);
  });
});
