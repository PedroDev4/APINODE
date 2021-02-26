import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../app';
import createConnection from '../database';

describe("Users",  () => {

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

    it("Should be able to create a new user", async() => {

        // O Supertest que fará a requisição
        const response = await request(app).post('/users').send({
            // Corpo da requisição
            email: "user@example.com",
            name: "User Example"
        });

        expect(response.status).toBe(201); // Esperamos que o status do (response) no User controller seja igual a 201
        expect(response.body).toHaveProperty("id");
    });

    it("Should not be able to create a user with exits email", async() => {

        // O Supertest que fará a requisição
        const response = await request(app).post('/users').send({
            // Corpo da requisição
            email: "user@example.com",
            name: "User Example"
        });

        expect(response.status).toBe(400); // Esperamos que o status do (response) no User controller seja igual a 400
        
    });
    
}); 