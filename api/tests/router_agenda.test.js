const supertest = require("supertest");

const app = require("../app");

const request = supertest(app);

describe("API Agenda", () => {
   test("Deve retornar 201 e um JSON para POST /agenda", async () => {
    const result = await request.post("/agenda").send({nome: "Festa Pedro", anfitriao: "Pedro", participantes: 20, data: "24/05/24"});
    id = result._id;
    expect(result.status).toBe(201);
    expect(result.type).toBe("application/json");
   });

  test("Deve retornar 422 e um JSON para POST /agenda", async () => {
    const result = await request.post("/agenda").send({});
    expect(result.status).toBe(422);
    expect(result.type).toBe("application/json");
  });
  
  test("Deve retornar 200 e um JSON array para GET /agenda", async () => {
    const result = await request.get("/agenda");
    expect(result.status).toBe(200);
    expect(result.type).toBe("application/json");
    if (result.body.length > 0) {
      id = result.body[0]._id.toString();
    };
  });

  test("Deve retornar 200 e um JSON para GET /agenda/id", async () => {
    const result = await request.get(`/agenda/${id}`);
    expect(result.status).toBe(200);
    expect(result.type).toBe("application/json");
  });

  test("Deve retornar 404 e um JSON para GET /agenda/id", async () => {
    const result = await request.get("/agenda/id");
    expect(result.status).toBe(404);
    expect(result.type).toBe("application/json");
  });

  test("Deve retornar 200 e um JSON para PUT /agenda/id", async () => {
    const result = await request.put(`/agenda/${id}`).send({});
    expect(result.status).toBe(200);
    expect(result.type).toBe("application/json");
  });

  test("Deve retornar 404 e um JSON para PUT /agenda/id", async () => {
    const result = await request.put(`/agenda/id`);
    expect(result.status).toBe(404);
    expect(result.type).toBe("application/json");
  });

  test("Deve retornar 422 e um JSON para PUT /agenda/id", async () => {
    const result = await request.put(`/agenda/${id}`).send({});
    expect(result.status).toBe(422);
    expect(result.type).toBe("application/json");
  });

  test("Deve retornar 204 e um JSON para DELETE /agenda/id", async () => {
    const result = await request.delete(`/agenda/${id}`)
    expect(result.status).toBe(204);
    expect(result.type).toBe("");
  });

  test("Deve retornar 404 e um JSON para DELETE /agenda/id", async () => {
    const result = await request.delete(`/agenda/id`)
    expect(result.status).toBe(404);
    expect(result.type).toBe("application/json");
  });
});

