import app from '../../index.ts'; // Import the app instance from index.js
import {describe, expect, test, afterAll, beforeAll} from '@jest/globals';
import jwt from 'jsonwebtoken';
import prisma from '../../src/lib/DB.ts'
import { disconnect } from '../../src/lib/DB.ts';
import testServer from '../../src/utils/testServer.ts';

const request = testServer(app);



//Create container

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

    const testcase_ServerErrorCreateContainer = [
        {
            input: {
                name: 'container1',
                material: 'material1',
                description: 'description1'
            },
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

    for(const testcase of testcase_FailedCreateContainer){
        test('should respond with invalid input and status 400', async () => {
            const token = generateTestToken(1, 'admin');
            const response = await request.post('/products/container').set('Authorization', `Bearer ${token}`).send(testcase.input);
            expect(response.status).toBe(400);
        });
    }


   afterAll(async ()=>{
    await disconnect();
   });
});


//Get container

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
      await prisma.container.deleteMany()
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

        response.body.forEach((container: any, index: number) => {
            expect(container.name).toBe(testcase_GetContainers[index].expected.name);
            expect(container.material).toBe(testcase_GetContainers[index].expected.material);
            expect(container.description).toBe(testcase_GetContainers[index].expected.description);

        });
    });

    

    afterAll(async () => {
      await disconnect();
    });
});

//Delete container

describe('DELETE /products/container/:id', () => {
    const testcase_DeleteContainer = [
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

    const testcase_FailedDeleteContainer = [
        {
            input: {
                name: 'container1',
                material: 'material1',
                description: 'description1',
            },
            expected: 'Container not found',
        },
    ];

    const generateTestToken = (userId: number, role: string): string => {
        const payload = { user: { id: userId, role } };
        return jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1h'})
    }

    beforeAll(async () => {
        // Crear contenedores antes de ejecutar las pruebas
        await prisma.container.deleteMany()
        const token = generateTestToken(1, 'admin');
        for (const testcase of testcase_DeleteContainer) {
            await request
                .post('/products/container')
                .set('Authorization', `Bearer ${token}`)
                .send(testcase.input);
        }
    });

    for (const testcase of testcase_DeleteContainer) {
        test('should respond with a 200 status code', async () => {
            const token = generateTestToken(1, 'admin');

            const container = await prisma.container.findFirst({
                where: {
                    name: testcase.input.name,
                },
            });

            const response = await request
                .delete(`/products/container/${container?.id}`)
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
        });
    }

    test('should respond with a 404 status code', async () => {
        const token = generateTestToken(1, 'admin');

        const response = await request
            .delete('/products/container/999')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(404);
    });

    afterAll(async () => {
        await disconnect();
    });

    test('should respond with a 400 status code', async () => {
        const token = generateTestToken(1, 'admin');
        const response = await request.delete('/products/container/y').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(400);
    }
    );


});

//Update container

describe('PUT /products/container/:id', () => {

    const generateTestToken = (userId: number, role: string): string => {
        const payload = { user: { id: userId, role } };
        return jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1h'})
    }

    const testcase_UpdateContainer = [
        {
            input: {
                name: 'container1',
                material: 'material1',
                description: 'description1',
            },
            update: {
                name: 'container1 updated',
                material: 'material1 updated',
                description: 'description1 updated',
            },
            expected: {
                name: 'container1 updated',
                material: 'material1 updated',
                description: 'description1 updated',
            },
        },
        {
            input: {
                name: 'container2',
                material: 'material2',
                description: 'description2',
            },
            update: {
                name: 'container2 updated',
                material: 'material2 updated',
                description: 'description2 updated',
            },
            expected: {
                name: 'container2 updated',
                material: 'material2 updated',
                description: 'description2 updated',
            },
        },
    ];

    const testcase_FailedUpdateContainer = [
        {
            input: {
                name: 'container1',
                material: 'material1',
                description: 'description1',
            },
            update: {
                name: '',
                material: 'material1 updated',
                description: 'description1 updated',
            },
            expected: 'Name is required',
        },
        {
            input: {
                name: 'container2',
                material: 'material2',
                description: 'description2',
            },
            update: {
                name: 'container2 updated',
                material: '',
                description: 'description2 updated',
            },
            expected: 'Material is required',
        },
        {
            input: {
                name: 'container3',
                material: 'material3',
                description: 'description3',
            },
            update: {
                name: 'container3 updated',
                material: 'material3 updated',
                description: '',
            },
            expected: 'Description is required',
        },
    ];

    for(const testcase of testcase_UpdateContainer){
        test('should respond with a 200 status code', async () => {
            const token = generateTestToken(1, 'admin');

            await prisma.container.create({
                data: testcase.input,
            });

            const container = await prisma.container.findFirst({
                where: {
                    name: testcase.input.name,
                },
            });

            const response = await request
                .put(`/products/container/${container?.id}`)
                .set('Authorization', `Bearer ${token}`)
                .send(testcase.update);
            expect(response.status).toBe(200);
            expect(response.body.name).toBe(testcase.expected.name);
            expect(response.body.material).toBe(testcase.expected.material);
            expect(response.body.description).toBe(testcase.expected.description);
        });
    }

    test('should respond with a 500 status code', async () => {
        const token = generateTestToken(1, 'admin');

        const response = await request.put('/products/container/999').set('Authorization', `Bearer ${token}`).send(testcase_FailedUpdateContainer[0].update);
        expect(response.status).toBe(500);
    });

    for(const testcase of testcase_FailedUpdateContainer){
        test('should respond with a 404 status code', async () => {
            const token = generateTestToken(1, 'admin');
            const response = await request.put('/products/container/').set('Authorization', `Bearer ${token}`).send(testcase.update);
            expect(response.status).toBe(404);
        });
    }
});

