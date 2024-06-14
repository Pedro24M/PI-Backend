const supertest = require('supertest');
const app = require('../app'); // Certifique-se de que seu arquivo app.js exporta a instância do express
const User = require('../models/user'); // Modelo do usuário
const jwt = require('jsonwebtoken');
require('dotenv').config();

const request = supertest(app);

describe("API User", () => {
    let id;
    let token;

    beforeAll(() => {
        // Gere um token JWT válido para testes
        token = jwt.sign({ userId: 'testuser' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    });

    test("Deve retornar 201 e um JSON para POST /users", async () => {
        const result = await request.post("/users").send({
            name: "John Doe",
            email: "john@example.com",
            password: "password123"
        });
        id = result.body.user._id; // Armazena o ID do usuário criado para testes posteriores
        expect(result.status).toBe(201);
        expect(result.type).toBe("application/json");
        expect(result.body.msg).toBe('Usuário criado com sucesso!');
    });

    test("Deve retornar 422 e um JSON para POST /users", async () => {
        const result = await request.post("/users").send({});
        expect(result.status).toBe(422);
        expect(result.type).toBe("application/json");
    });

    test("Deve retornar 200 e um JSON array para GET /users", async () => {
        const result = await request.get("/users").set('Authorization', `Bearer ${token}`);
        expect(result.status).toBe(200);
        expect(result.type).toBe("application/json");
        expect(result.body).toBeInstanceOf(Array);
        if (result.body.length > 0) {
            id = result.body[0]._id.toString(); // Atualiza o ID do usuário se necessário
        }
    });

    test("Deve retornar 200 e um JSON para GET /users/:id", async () => {
        const result = await request.get(`/users/${id}`).set('Authorization', `Bearer ${token}`);
        expect(result.status).toBe(200);
        expect(result.type).toBe("application/json");
    });

    test("Deve retornar 404 e um JSON para GET /users/:id", async () => {
        const result = await request.get("/users/60f7189b2e8f4b5248e5a5d4").set('Authorization', `Bearer ${token}`); // ID que não existe no banco de dados
        expect(result.status).toBe(404);
        expect(result.type).toBe("application/json");
        expect(result.body.error).toBe('Usuário não encontrado');
    });

    test("Deve retornar 200 e um JSON para PUT /users/:id", async () => {
        const result = await request.put(`/users/${id}`).set('Authorization', `Bearer ${token}`).send({
            name: "John Smith",
            email: "johnsmith@example.com",
            password: "newpassword123"
        });
        expect(result.status).toBe(200);
        expect(result.type).toBe("application/json");
        expect(result.body.msg).toBe('Usuário atualizado com sucesso!');
    });

    test("Deve retornar 404 e um JSON para PUT /users/:id", async () => {
        const result = await request.put("/users/60f7189b2e8f4b5248e5a5d4").set('Authorization', `Bearer ${token}`).send({
            name: "John Smith",
            email: "johnsmith@example.com",
            password: "newpassword123"
        });
        expect(result.status).toBe(404);
        expect(result.type).toBe("application/json");
        expect(result.body.error).toBe('Usuário não encontrado');
    });

    test("Deve retornar 422 e um JSON para PUT /users/:id", async () => {
        const result = await request.put(`/users/${id}`).set('Authorization', `Bearer ${token}`).send({});
        expect(result.status).toBe(422);
        expect(result.type).toBe("application/json");
    });

    test("Deve retornar 204 e um JSON para DELETE /users/:id", async () => {
        const result = await request.delete(`/users/${id}`).set('Authorization', `Bearer ${token}`);
        expect(result.status).toBe(204);
        expect(result.type).toBe("");
    });

    test("Deve retornar 404 e um JSON para DELETE /users/:id", async () => {
        const result = await request.delete("/users/60f7189b2e8f4b5248e5a5d4").set('Authorization', `Bearer ${token}`);
        expect(result.status).toBe(404);
        expect(result.type).toBe("application/json");
        expect(result.body.error).toBe('Usuário não encontrado');
    });
});
