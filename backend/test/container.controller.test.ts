import request from 'supertest';
import express from 'express';
import app from '../index.ts'; // Import the app instance from index.js
import {describe, expect, test, beforeEach} from '@jest/globals';
import { ContainerController } from '../src/controllers';
import { jest } from '@jest/globals';

// Mock the ContainerService
jest.mock('../src/services', () => {
    return {
        ContainerService: jest.fn().mockImplementation(() => ({
            createContainer: jest.fn(),
            findAll: jest.fn(),
            deleteContainer: jest.fn(),
            updateContainer: jest.fn(),
        })),
    };
});

const productRouter = express.Router();
const containerController = new ContainerController();

describe('POST /products/container', () => {
    const validContainer = {
        name: 'container1',
        material: 'material1',
        description: 'description1',
    };

    test('should respond with a 201 status code', async () => {
        const response = await request(app).post('/products/container').send(validContainer);
        expect(response.status).toBe(201);
    });
    
});