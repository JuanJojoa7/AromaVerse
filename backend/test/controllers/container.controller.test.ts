import app from '../../index.ts'; // Import the app instance from index.js
import {describe, expect, test, afterAll, beforeAll} from '@jest/globals';
import jwt from 'jsonwebtoken';
import { disconnect } from '../../src/lib/DB.ts';
import testServer from '../../src/utils/testServer.ts';

const request = testServer(app);
describe('POST /products/container', () => {

    const testcase_CreateContainer = [
        {
            input: {
                name: 'container1',
                material: 'material1',
                description: 'description1'
            },
            expected: {
                name: 'container1',
                material: 'material1',
                description: 'description1'
            }
        },
        {
            input: {
                name: 'container2',
                material: 'material2',
                description: 'description2'
            },
            expected: {
                name: 'container2',
                material: 'material2',
                description: 'description2'
            }
        },
        {
            input: {
                name: 'container3',
                material: 'material3',
                description: 'description3'
            },
            expected: {
                name: 'container3',
                material: 'material3',
                description: 'description3'
            }
        }
    ];

    const testcase_FailedCreateContainer = [
        {
            input: {
                name: '',
                material: 'material1',
                description: 'description1'
            },
            expected: 'Name is required'
        },
        {
            input: {
                name: 'container2',
                material: '',
                description: 'description2'
            },
            expected: 'Material is required'
        },
        {
            input: {
                name: 'container3',
                material: 'material3',
                description: ''
            },
            expected: 'Description is required'
        }
    ];

    const generateTestToken = (userId: number, role: string): string => {
        const payload = { user: { id: userId, role } };
        return jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1h'})
    }

    for (const testcase of testcase_CreateContainer) {
        test('should respond with a 201 status code', async () => {
            const token = generateTestToken(1, 'admin');

            const response = await request
                .post('/products/container')
                .set('Authorization', `Bearer ${token}`)//Esto incluye el token en los encabezados
                .send(testcase.input)
            expect(response.status).toBe(201);
        });
    }
    /*Esto es para una funcion de jest que:
    es útil para realizar tareas de limpieza, como desconectar la base de datos o cerrar conexiones abiertas.
    */
   afterAll(async ()=>{
    await disconnect();
});

    
});

describe('GET /products/container', () => {
    const testcase_GetContainers = [
      {
        input: {
          name: 'container1',
          material: 'material1',
          description: 'description1',
        },
        expected: {
          name: 'container1',
          material: 'material1',
          description: 'description1',
        },
      },
      {
        input: {
          name: 'container2',
          material: 'material2',
          description: 'description2',
        },
        expected: {
          name: 'container2',
          material: 'material2',
          description: 'description2',
        },
      },
    ];

    const generateTestToken = (userId: number, role: string): string => {
        const payload = { user: { id: userId, role } };
        return jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1h'})
    }
  
    beforeAll(async () => {
      // Crear contenedores antes de ejecutar las pruebas
      const token = generateTestToken(1, 'admin');
      for (const testcase of testcase_GetContainers) {
        await request
          .post('/products/container')
          .set('Authorization', `Bearer ${token}`)
          .send(testcase.input);
        }
    });
  
    test('should respond with a 200 status code', async () => {
      const token = generateTestToken(2, 'admin');

      const response = await request.get('/products/container').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

    afterAll(async () => {
      await disconnect();
    });
});

