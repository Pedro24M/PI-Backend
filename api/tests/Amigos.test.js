const request = require('supertest');
const app = require('../app'); 
const Amigos = require('../models/Amigos');
const mongoose = require('mongoose');

// Configuração do Jest para conectar ao MongoDB
beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Amigos API', () => {
  let amigoId;

  // Teste para criação de um novo amigo
  it('POST /amigos - should create a new friend', async () => {
    const res = await request(app)
      .post('/amigos')
      .send({ name: 'Test Friend', age: 25 });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe('Test Friend');
    amigoId = res.body._id;
  });

  // Teste para obtenção de todos os amigos
  it('GET /amigos - should get all friends', async () => {
    const res = await request(app).get('/amigos');

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // Teste para obtenção de um amigo por ID
  it('GET /amigos/:id - should get a friend by id', async () => {
    const res = await request(app).get(`/amigos/${amigoId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body._id).toBe(amigoId);
  });

  // Teste para atualização de um amigo
  it('PUT /amigos/:id - should update a friend by id', async () => {
    const res = await request(app)
      .put(`/amigos/${amigoId}`)
      .send({ name: 'Updated Friend', age: 26 });

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe('Updated Friend');
  });

  // Teste para exclusão de um amigo
  it('DELETE /amigos/:id - should delete a friend by id', async () => {
    const res = await request(app).delete(`/amigos/${amigoId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body._id).toBe(amigoId);
  });
});
