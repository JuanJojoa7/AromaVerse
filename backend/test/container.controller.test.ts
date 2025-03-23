import request from 'supertest';
import express from 'express';
import app from '../index.ts'; // Import the app instance from index.js
import {describe, expect, test, beforeEach} from '@jest/globals';
import { ContainerService } from '../src/services';
import { jest } from '@jest/globals';

const containerService = new ContainerService();

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

    test('should respond with ', async () => {
        const response = await request(app).get('/products/container');
        expect(response.status).toBe(200);
    
    });
});

