import app from '../index.ts'; // Import the app instance from index.js
import {describe, expect, test} from '@jest/globals';

import testServer from '../src/utils/testServer.ts';

const request = testServer(app);


describe('POST /products/container', () => {
    const validContainer = {
        name: 'container1',
        material: 'material1',
        description: 'description1',
    };

    test('should respond with a 201 status code', async () => {
        const response = await request.post('/products/container').send(validContainer);
        expect(response.status).toBe(201);
    });
});

