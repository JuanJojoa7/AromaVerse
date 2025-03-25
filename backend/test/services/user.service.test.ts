import { describe, expect, test, beforeEach } from '@jest/globals';
import { UserService } from '../../src/services';
import { jest } from '@jest/globals';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userSchema } from '../../src/schemas';

// Mock the Prisma client
jest.mock('@prisma/client', () => {
    const mockUsers = new Map(); // In-memory storage for users
    let idCounter = 1; // Simulate auto-incrementing IDs
    return {
        PrismaClient: jest.fn(() => ({
            userAccount: {
                create: jest.fn(({ data }) => {
                    if (mockUsers.size > 0 && Array.from(mockUsers.values()).some(user => user.email === data.email)) {
                        throw new Error('User already exists');
                    }
                    const user = { id: idCounter++, ...data };
                    mockUsers.set(user.id, user);
                    return user;
                }),
                findMany: jest.fn(() => Array.from(mockUsers.values())),
                findUnique: jest.fn(({ where }) => {
                    if (where.email) {
                        // Find by email
                        return Array.from(mockUsers.values()).find(user => user.email === where.email) || null;
                    }
                    if (where.id) {
                        // Find by ID
                        return mockUsers.get(where.id) || null;
                    }
                    return null;
                }),
                delete: jest.fn(({ where: { id } }) => {
                    const deletedUser = mockUsers.get(id);
                    mockUsers.delete(id);
                    return deletedUser;
                }),
                update: jest.fn(({ where: { id }, data }) => {
                    const updatedUser = { ...mockUsers.get(id), ...data };
                    mockUsers.set(id, updatedUser);
                    return updatedUser;
                }),
            },
        })),
    };
});

const userService = new UserService();

// Reset mockUsers before each test
let mockUsers;
beforeEach(() => {
    jest.resetModules();
    mockUsers = new Map(); // Clear the in-memory storage
});

// Create user
describe('user create', () => {
    const testcase_CreateUser = [
        {
            input: {
                name: 'John Dow',
                email: 'john.doe1@example.com',
                password: 'password123',
                phone: '1234567890',
                address: '123 Main St',
            },
            expected: {
                name: 'John Dow',
                email: 'john.doe1@example.com',
            },
        },
        {
            input: {
                name: 'Jane Dow',
                email: 'jane.doe2@example.com',
                password: 'password456',
                phone: '9876543210',
                address: '456 Elm St',
            },
            expected: {
                name: 'Jane Dow',
                email: 'jane.doe2@example.com',
            },
        },
    ];

    const testcase_FailedCreateUser = [
        {
            input: {
                name: '',
                email: 'invalid.email@example.com',
                password: 'password123',
                phone: '123456789',
                address: '123 Main St',
            },
            expected: 'Name cannot be empty',
        },
        {
            input: {
                name: 'John Doe',
                email: '',
                password: 'password123',
                phone: '1234567890',
                address: '123 Main St',
            },
            expected: 'Email cannot be empty',
        },
        {
            input: {
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: '',
                phone: '1234567890',
                address: '123 Main St',
            },
            expected: 'Password must be at least 5 characters long',
        },
        {
            input: {
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: 'password123',
                phone: '',
                address: '123 Main St'
            },
            expected: 'Number must be at least 10 characters long',
        },
        {
            input: {
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: 'password123',
                phone: '1234567890',
                address: '',
            },
            expected: 'Address cannot be empty',
        },


    ];

    for (const testcase of testcase_CreateUser) {
        test('creates user', async () => {
            try {
                await userSchema.parseAsync(testcase.input); // Validate input
            } catch (error) {
                throw new Error('Invalid test data');
            }
            const user = await userService.createUser(testcase.input);
            expect(user).toHaveProperty('id');
        });
    }

    for (const testcase of testcase_FailedCreateUser) {
        test(`throws an error if the input is invalid: ${testcase.expected}`, async () => {
            await expect(userSchema.parseAsync(testcase.input)).rejects.toThrowError(testcase.expected);
        });
    }
    

});

// Find user
describe('user find', () => {
    const testcase_FindUser = [
        {
            input: {
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: 'password123',
                phone: '1234567890',
                address: '123 Main St',
            },
        },
        {
            input: {
                name: 'Jane Doe',
                email: 'jane.doe@example.com',
                password: 'password456',
                phone: '9876543210',
                address: '456 Elm St',
            },
        },
    ];

    const testcase_FindAllUsers = [
        {
            input: {
                name: 'John Doe',
                email: 'john.doe5@example.com',
                password: 'password123',
                phone: '1234567890',
                address: '123 Main St',
            },
        },
        {
            input: {
                name: 'Jane Doe',
                email: 'jane.doe5@example.com',
                password: 'password456',
                phone: '9876543210',
                address: '456 Elm St',
            },
        },
    ];

    const testcase_FindUserFail = [
        {
            input: {
                id: 999,
            },
            expected: 'User not found',
        },
        {
            input: {
                id: 9999,
            },
            expected: 'User not found',
        },
        {
            input: {
                id: 99999,
            },
            expected: 'User not found',
        }
    ];

    for (const testcase of testcase_FindUser) {
        test('finds user by id', async () => {
            const createdUser = await userService.createUser(testcase.input);
            const foundUser = await userService.findById(createdUser.id);
            expect(foundUser).toEqual(createdUser);
        });
    }

    for(const testcase of testcase_FindAllUsers){
        test('finds all users', async () => {
            const createdUser = await userService.createUser(testcase.input);
            const foundUsers = await userService.findAll();
            expect(foundUsers).toContainEqual(createdUser);
        });
    }

    for(const testcase of testcase_FindUserFail){
        test('throws an error if the user does not exist', async () => {
            try {
                await userService.findById(testcase.input.id);
            } catch (error) {
                expect(error).toEqual(new Error('User not found'));
            }
        });
    }
    
});

// Delete user
describe('user delete', () => {
    const testcase_DeleteUser = [
        {
            input: {
                name: 'John Doe',
                email: 'john.doe6@example.com',
                password: 'password123',
                phone: '1234567890',
                address: '123 Main St',
            },
        },
        {
            input: {
                name: 'Jane Doe',
                email: 'jane.doe6@example.com',
                password: 'password456',
                phone: '9876543210',
                address: '456 Elm St',
            },
        },
        {
            input: {
                name: 'Jake Doe',
                email: 'jake.doe6@example.com',
                password: 'password456234',
                phone: '9876543453',
                address: '456 Elm St',
            },
        }
    ];

    const testcase_DeleteUserFail = [
        {
            input: {
                id: 999,
            },
            expected: 'User not found',
        },
        {
            input: {
                id: 9999,
            },
            expected: 'User not found',
        },
        {
            input: {
                id: 99999,
            },
            expected: 'User not found',
        }
    ];

    for (const testcase of testcase_DeleteUser) {
        test('deletes user', async () => {
            const createdUser = await userService.createUser(testcase.input);
            await userService.deleteUser(createdUser.id);
            const users = await userService.findAll();
            expect(users).not.toContainEqual(createdUser);
        });
    }

    for (const testcase of testcase_DeleteUserFail) {
        test('fails to delete user', async () => {
            await expect(userService.deleteUser(testcase.input.id)).rejects.toThrow(testcase.expected);
        });
    }
});

// Update user
describe('user update', () => {
    const testcase_UpdateUser = [
        {
            input: {
                name: 'John Doe',
                email: 'john.doe7@example.com',
                password: 'password123',
                phone: '1234567890',
                address: '123 Main St',
            },
            expected: {
                name: 'Updated John',
                email: 'updated.john@example.com',
                phone: '0987654321',
                address: '789 New St',
            },
        },
        {
            input: {
                name: 'Jane Doe',
                email: 'jane.doe7@example.com',
                password: 'password456',
                phone: '9876543210',
                address: '456 Elm St',
            },
            expected: {
                name: 'Updated Jane',
                email: 'updated.jane@example.com',
                phone: '1234567890',
                address: '123 Old St',
            },
        },
        {
            input: {
                name: 'Jake Doe',
                email: 'jake.doe7@example.com',
                password: 'password456314',
                phone: '9876543534',
                address: '456 Elm St',
            },
            expected: {
                name: 'Updated Jake',
                email: 'updated.jake@example.com',
                phone: '1234567890',
                address: '123 Old St',
            },
        }
    ];

    const testcase_UpdateUserFail = [
        {
            input: {
                id: 999,
                data: { name: 'New Name' },
            },
            expected: 'User not found',
        },
        {
            input: {
                id: 9999,
                data: { email: 'nonexistent@example.com' },
            },
            expected: 'User not found',
        },
        {
            input: {
                id: 99999,
                data: { phone: '0000000000' },
            },
            expected: 'User not found',
        },
    ];

    for (const testcase of testcase_UpdateUser) {
        test('updates user', async () => {
            const createdUser = await userService.createUser(testcase.input);
            const updatedUser = await userService.updateUser(createdUser.id, testcase.expected);
            expect(updatedUser).toHaveProperty('id');
            expect(updatedUser.name).toBe(testcase.expected.name);
            expect(updatedUser.email).toBe(testcase.expected.email);
            expect(updatedUser.phone).toBe(testcase.expected.phone);
            expect(updatedUser.address).toBe(testcase.expected.address);
        });
    }

    for (const testcase of testcase_UpdateUserFail) {
        test('fails to update user', async () => {
            await expect(userService.updateUser(testcase.input.id, testcase.input.data)).rejects.toThrow(testcase.expected);
        });
    }
    
});

// Login user
describe('user login', () => {
    const testcase_LoginUser = [
        {
            input: {
                email: 'john.doe8@example.com',
                password: 'password123',
            },
        },
        {
            input: {
                email: 'jane.doe8@example.com',
                password: 'password456',
            },
        },
    ];

    const testcase_LoginUserFail = {
            input: {
                email: 'nonexistent@example.com',
                password: 'password123',
            },
            expected: 'User not found',
    };

    const testcase_LoginUserFailPassword = {
        input: {
            email: 'johnm@example.com',
            password: 'password1234',
        },
        expected: 'Invalid password',
    };

    for (const testcase of testcase_LoginUser) {
        test('logs in user', async () => {
            const user = await userService.createUser({
                name: 'John Doe',
                email: testcase.input.email,
                password: testcase.input.password,
                phone: '1234567890',
                address: '123 Main St',
            });
            const loginResult = await userService.login(testcase.input);
            expect(loginResult.user.id).toBe(user.id);
            expect(loginResult.user.email).toBe(user.email);

            // Verify the token
            const decodedToken = jwt.verify(
                loginResult.token,
                process.env.JWT_SECRET || 'secret'
            );
            expect(decodedToken).toHaveProperty('user');
            if (typeof decodedToken !== 'string' && 'user' in decodedToken) {
                expect(decodedToken.user.email).toBe(user.email);
            }
        });
    }

    test('throws an error if the user does not exist', async () => {
        await expect(userService.login(testcase_LoginUserFail.input)).rejects.toThrow(testcase_LoginUserFail.expected);
    });

    test("should fail login with incorrect password", async () => {
        const user = await userService.createUser({
            name: 'John Doe',
            email: testcase_LoginUserFailPassword.input.email,
            password: 'password123',
            phone: '1234567890',
            address: '123 Main St',
        });
        await expect(userService.login(testcase_LoginUserFailPassword.input)).rejects.toThrow(testcase_LoginUserFailPassword.expected);
    });
    
    
});

