import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../app';
import createConnection from '../database';

describe("Surveys",  () => {

    // Antes de tudo... Rodar as migrations
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    })

    afterAll(async () => {
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close()
    })

    it("Should be able to create a new survey!", async() => {

        // O Supertest que fará a requisição
        const response = await request(app).post('/surveys').send({
            // Corpo da requisição
            title: "Title example!",
            description: " Description example?"
        });

        expect(response.status).toBe(201); // Esperamos que o status do (response) no Survey controller seja igual a 201
        expect(response.body).toHaveProperty("id");

    });
    
    it("Should be able to get all the surveys", async () => {

         // O Supertest que fará a requisição
          await request(app).post('/surveys').send({
            title: "Title example2!",
            description: " Description example2?"
        });

        const response = await request(app).get('/surveys');

        expect(response.body.length).toBe(2);

    })

}); 