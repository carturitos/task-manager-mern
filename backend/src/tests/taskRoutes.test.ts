import request from 'supertest';
import app from '../app';

const userPayload = {
  nombre: 'Task Owner',
  email: 'owner@example.com',
  password: 'password123',
};

const getAuthToken = async () => {
  const response = await request(app).post('/api/users/register').send(userPayload);
  return response.body.token as string;
};

describe('Task routes', () => {
  it('should block access without token', async () => {
    const response = await request(app).get('/api/tasks');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'Token no proporcionado' });
  });

  it('should create a new task for the authenticated user', async () => {
    const token = await getAuthToken();

    const response = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        titulo: 'Nueva tarea',
        descripcion: 'Descripción de prueba',
        prioridad: 'alta',
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: 'Tarea creada exitosamente',
        task: expect.objectContaining({
          titulo: 'Nueva tarea',
          descripcion: 'Descripción de prueba',
          prioridad: 'alta',
          completada: false,
        }),
      })
    );
  });

  it('should list tasks for the authenticated user', async () => {
    const token = await getAuthToken();

    await Promise.all([
      request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({ titulo: 'Tarea 1' }),
      request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({ titulo: 'Tarea 2' }),
    ]);

    const response = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body.map((task: any) => task.titulo)).toEqual(
      expect.arrayContaining(['Tarea 1', 'Tarea 2'])
    );
  });

  it('should fetch a task by id only for its owner', async () => {
    const token = await getAuthToken();
    const createResponse = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ titulo: 'Detalle' });

    const taskId = createResponse.body.task._id;

    const response = await request(app)
      .get(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({ titulo: 'Detalle' }));
  });

  it('should update a task when user owns it', async () => {
    const token = await getAuthToken();
    const createResponse = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ titulo: 'Actualizar', prioridad: 'baja' });

    const taskId = createResponse.body.task._id;

    const response = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ titulo: 'Actualizada', completada: true });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: 'Tarea actualizada exitosamente',
        task: expect.objectContaining({ titulo: 'Actualizada', completada: true }),
      })
    );
  });

  it('should delete a task when user owns it', async () => {
    const token = await getAuthToken();
    const createResponse = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ titulo: 'Eliminar' });

    const taskId = createResponse.body.task._id;

    const response = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Tarea eliminada exitosamente' });
  });
});
