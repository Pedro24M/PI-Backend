const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

describe('Testes das rotas de serviço', () => {
    let serviceId; 
    it('Deve criar uma nova festa', async () => {
        const newService = {
            festa: 'Serviço de Teste',
            descricao: 'Este é um serviço de teste',
            preco: 100.00,
            imagem: 'https://exemplo.com/imagem.jpg'
        };

        const response = await request
            .post('/api/services')
            .send(newService)
            .expect(201);

        expect(response.body).toHaveProperty('msg', 'Festa criada com sucesso!');
        expect(response.body).toHaveProperty('response');
        expect(response.body.response).toMatchObject(newService);

        serviceId = response.body.response._id;
    });

    it('Deve obter todas as festa', async () => {
        const response = await request
            .get('/api/services')
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('Deve obter uma festa pelo ID', async () => {
        const response = await request
            .get(`/api/services/${serviceId}`)
            .expect(200);

        expect(response.body).toHaveProperty('_id', serviceId);
    });

    it('Deve atualizar uma festa pelo ID', async () => {
        const updatedService = {
            festa: 'Serviço de Teste Atualizado',
            descricao: 'Este é um serviço de teste atualizado',
            preco: 150.00,
            imagem: 'https://exemplo.com/imagem-atualizada.jpg'
        };
    
        const response = await request
            .put(`/api/services/${serviceId}`)
            .send(updatedService)
            .expect(200);
    
        expect(response.body).toHaveProperty('service._id', serviceId); 
        expect(response.body.service).toMatchObject(updatedService); 
    });

    it('Deve excluir uma festa pelo ID', async () => {
        const response = await request
            .delete(`/api/services/${serviceId}`)
            .expect(200);

        expect(response.body).toHaveProperty('deleteService._id', serviceId);
    });
});