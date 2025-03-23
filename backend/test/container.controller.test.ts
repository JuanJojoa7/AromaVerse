import app from '../index.ts'; // Import the app instance from index.js
import {describe, expect, test, afterAll} from '@jest/globals';
import jwt from 'jsonwebtoken';
import { disconnect } from '../src/lib/DB';
import testServer from '../src/utils/testServer.ts';
import { after } from 'node:test';

const request = testServer(app);


describe('POST /products/container', () => {
    
    const validContainer = {
        name: 'container1',
        material: 'material1',
        description: 'description1',
    };
    const generateTestToken = (userId: number, role: string): string => {
        const payload = { user: { id: userId, role } };
        return jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1h'})
    }

    test('should respond with a 201 status code', async () => {
        const token = generateTestToken(1, 'admin');

        const response = await request
            .post('/products/container')
            .set('Authorization', `Bearer ${token}`)//Esto incluye el token en los encabezados
            .send(validContainer)
        expect(response.status).toBe(201);
    });

    /*Esto es para una funcion de jest que:
    es útil para realizar tareas de limpieza, como desconectar la base de datos o cerrar conexiones abiertas.
    */
    afterAll(async ()=>{
        await disconnect();
    });
});

