import request from 'supertest';
import app from '../app';

const userPayload = {
  nombre: 'Test User',
  email: 'test@example.com',
  password: 'password123',
};

describe('User routes', () => {
  it('should register a new user successfully', async () => {
    const response = await request(app).post('/api/users/register').send(userPayload);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: 'Usuario registrado exitosamente',
        token: expect.any(String),
        user: expect.objectContaining({
          nombre: userPayload.nombre,
          email: userPayload.email,
        }),
      })
    );
  });

  it('should reject duplicate user registration', async () => {
    await request(app).post('/api/users/register').send(userPayload);

    const response = await request(app).post('/api/users/register').send(userPayload);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'El usuario ya existe' });
  });

  it('should login an existing user', async () => {
    await request(app).post('/api/users/register').send(userPayload);

    const response = await request(app).post('/api/users/login').send({
      email: userPayload.email,
      password: userPayload.password,
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: 'Sesión iniciada',
        token: expect.any(String),
        user: expect.objectContaining({
          email: userPayload.email,
        }),
      })
    );
  });

  it('should reject login with invalid credentials', async () => {
    await request(app).post('/api/users/register').send(userPayload);

    const response = await request(app).post('/api/users/login').send({
      email: userPayload.email,
      password: 'wrong-password',
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'Credenciales inválidas' });
  });

  it('should return user profile when token is valid', async () => {
    const registerResponse = await request(app).post('/api/users/register').send(userPayload);

    const response = await request(app)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${registerResponse.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        nombre: userPayload.nombre,
        email: userPayload.email,
      })
    );
  });

  it('should block profile access without token', async () => {
    const response = await request(app).get('/api/users/profile');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'Token no proporcionado' });
  });
});
