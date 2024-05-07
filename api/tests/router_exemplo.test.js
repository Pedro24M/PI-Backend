const supertest = require('supertest');

const app = require("../app");

const request = supertest(app);

describe('API rede social de festa', () => {
    test('Deve retornar CODIGO e CORPO no VERBO /ROTA', async () => {});
});