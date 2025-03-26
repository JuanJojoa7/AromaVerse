// import app from '../../index';
// import { describe, expect, test, afterAll, beforeAll } from '@jest/globals';
// import jwt from 'jsonwebtoken';
// import prisma from '../../src/lib/DB';
// import { disconnect } from '../../src/lib/DB';
// import testServer from '../../src/utils/testServer';

// const request = testServer(app);

// const generateTestToken = (userId: number, role: string): string => {
//   const payload = { user: { id: userId, role } };
//   return jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
// };

// describe('UserController', () => {
//   beforeAll(async () => {
//     // Limpia la tabla de usuarios antes de las pruebas
//     await prisma.userAccount.deleteMany();
//   });

//   afterAll(async () => {
//     // Desconecta la base de datos después de las pruebas
//     await disconnect();
//   });

//   describe('POST /users', () => {
//     test('should create a new user and return 201 status', async () => {
//       const response = await request.post('/users').send({
//         name: 'John Doe',
//         email: 'john.doe@example.com',
//         password: 'password123',
//       });
//       expect(response.status).toBe(201);
//       expect(response.body).toHaveProperty('id');
//       expect(response.body.name).toBe('John Doe');
//     });

//     test('should return 400 if user already exists', async () => {
//       await prisma.userAccount.create({
//         data: {
//           name: 'Jane Doe',
//           email: 'jane.doe@example.com',
//           password: 'password123',
//         },
//       });

//       const response = await request.post('/users').send({
//         name: 'Jane Doe',
//         email: 'jane.doe@example.com',
//         password: 'password123',
//       });
//       expect(response.status).toBe(400);
//       expect(response.body.message).toBe('User already exists');
//     });
//   });

//   describe('GET /users', () => {
//     test('should return all users with 200 status', async () => {
//       await prisma.userAccount.create({
//         data: {
//           name: 'Alice',
//           email: 'alice@example.com',
//           password: 'password123',
//         },
//       });

//       const response = await request.get('/users');
//       expect(response.status).toBe(200);
//       expect(Array.isArray(response.body)).toBe(true);
//       expect(response.body.length).toBeGreaterThan(0);
//     });
//   });

//   describe('DELETE /users/:id', () => {
//     test('should delete a user and return 200 status', async () => {
//       const user = await prisma.userAccount.create({
//         data: {
//           name: 'Bob',
//           email: 'bob@example.com',
//           password: 'password123',
//         },
//       });

//       const response = await request.delete(`/users/${user.id}`);
//       expect(response.status).toBe(200);
//       expect(response.body).toHaveProperty('id', user.id);
//     });

//     test('should return 404 if user not found', async () => {
//       const response = await request.delete('/users/999');
//       expect(response.status).toBe(404);
//       expect(response.body.message).toBe('User not found');
//     });
//   });

//   describe('PUT /users/:id', () => {
//     test('should update a user and return 200 status', async () => {
//       const user = await prisma.userAccount.create({
//         data: {
//           name: 'Charlie',
//           email: 'charlie@example.com',
//           password: 'password123',
//         },
//       });

//       const response = await request.put(`/users/${user.id}`).send({
//         name: 'Charlie Updated',
//       });
//       expect(response.status).toBe(200);
//       expect(response.body.name).toBe('Charlie Updated');
//     });

//     test('should return 404 if user not found', async () => {
//       const response = await request.put('/users/999').send({
//         name: 'Nonexistent User',
//       });
//       expect(response.status).toBe(404);
//       expect(response.body.message).toBe('User not found');
//     });
//   });

//   describe('POST /users/login', () => {
//     test('should login a user and return 200 status', async () => {
//       const user = await prisma.userAccount.create({
//         data: {
//           name: 'David',
//           email: 'david@example.com',
//           password: 'password123',
//         },
//       });

//       const response = await request.post('/users/login').send({
//         username: 'david@example.com',
//         password: 'password123',
//       });
//       expect(response.status).toBe(200);
//       expect(response.body).toHaveProperty('token');
//     });

//     test('should return 401 for invalid credentials', async () => {
//       const response = await request.post('/users/login').send({
//         username: 'invalid@example.com',
//         password: 'wrongpassword',
//       });
//       expect(response.status).toBe(401);
//       expect(response.body.message).toBe('Invalid credentials');
//     });
//   });
// });