import {describe, expect, test} from '@jest/globals';
import { FragranceService } from '../../src/services';
import { jest } from '@jest/globals';
import { fragranceSchema } from '../../src/schemas'

// Mock the Prisma client
jest.mock('@prisma/client', () => {
    const mockFragrances = new Map(); // In-memory storage for fragrances
    let idCounter = 1; // Simulate auto-incrementing IDs

    return {
        PrismaClient: jest.fn(() => ({
            fragrance : {
                create: jest.fn(({ data }) => {
                    const fragrance = { id: idCounter++, ...data };
                    mockFragrances.set(fragrance.id, fragrance);
                    return fragrance;
                }),

                findMany: jest.fn(() => Array.from(mockFragrances.values())),

                findUnique: jest.fn(({ where: { id } }) => mockFragrances.get(id)),

                delete: jest.fn(({ where: { id } }) => {
                    const deletedFragrance = mockFragrances.get(id);
                    mockFragrances.delete(id);
                    return deletedFragrance;
                }),

                update: jest.fn(({ where: { id }, data }) => {
                    const updatedFragrance = { ...mockFragrances.get(id), ...data };
                    mockFragrances.set(id, updatedFragrance);
                    return updatedFragrance;
                }),
            },
        })),
    };
});

const fragranceService = new FragranceService();

// Create fragrance

describe('fragrance create', () => {

    const testcase_CreateFragrance = [
        {
            input: {
                name: 'fragrance1',
                description: 'description1',
                associatedColor: 'color1'
            },
            expected: {
                name: 'fragrance1',
                description: 'description1',
                associatedColor: 'color1'
            }
        },
        {
            input: {
                name: 'fragrance2',
                description: 'description2',
                associatedColor: 'color2'
            },
            expected: {
                name: 'fragrance2',
                description: 'description2',
                associatedColor: 'color2'
            }
        },
        {
            input: {
                name: 'fragrance3',
                description: 'description3',
                associatedColor: 'color3'
            },
            expected: {
                name: 'fragrance3',
                description: 'description3',
                associatedColor: 'color3'
            }
        }
    ];

    const testcase_FailedCreateFragrance = [
        {
            input: {
                name: '',
                description: 'description1',
                associatedColor: 'color1'
            },
            expected: 'Name cannot be empty'
        },
        {
            input: {
                name: 'fragrance2',
                description: '',
                associatedColor: 'color2'
            },
            expected: 'Description cannot be empty'
        },
        {
            input: {
                name: 'fragrance3',
                description: 'description3',
                associatedColor: ''
            },
            expected: 'Color cannot be empty'
        }
    ];

    for(const testcase of testcase_CreateFragrance){
        test ('Create fragrance', async () => {
            try {
                await fragranceSchema.parseAsync(testcase.input);
            } catch (error) {
                throw new Error('Invalid test data');
            }
            const newFragrance = await fragranceService.createFragrance(testcase.input);

            expect(newFragrance).toHaveProperty('id');
            expect(newFragrance.name).toBe(testcase.expected.name);
            expect(newFragrance.description).toBe(testcase.expected.description);
            expect(newFragrance.associatedColor).toBe(testcase.expected.associatedColor);
        });
    }

    for(const testcase of testcase_FailedCreateFragrance){
        test (`fails to create fragrance with missing ${Object.keys(testcase.input).find(key => !testcase.input[key])}`, async () => {
            await expect(fragranceSchema.parseAsync(testcase.input)).rejects.toThrow(testcase.expected);
        });
    }
});

// Find all fragrances

describe('find fragrance', () => {
    
    const testcase_FindFragrance = [
        {
            input: {
                name: 'fragrance1',
                description: 'description1',
                associatedColor: 'color1'
            },
        },
        {
            input: {
                name: 'fragrance2',
                description: 'description2',
                associatedColor: 'color2'
            },
        },
        {
            input: {
                name: 'fragrance3',
                description: 'description3',
                associatedColor: 'color3'
            },
        }
    ];

    const testcase_FailedFindFragrance = [
        {
            input: {
                id: 999
            },
            expected: 'Fragrance not found'
        },
        {
            input: {
                id: 9999
            },
            expected: 'Fragrance not found'
        },
        {
            input: {
                id: 99999
            },
            expected: 'Fragrance not found'
        }
    ];

    for(const testcase of testcase_FindFragrance){
        test('Find fragrance by id', async () => {
            const fragrance = await fragranceService.createFragrance(testcase.input);
            const foundFragrance = await fragranceService.findByID(fragrance.id);
            expect(foundFragrance).toEqual(fragrance);
        });
    }

    for(const testcase of testcase_FindFragrance){
        test('Find all fragrances', async () => {
            const fragrance = await fragranceService.createFragrance(testcase.input);
            const fragrances = await fragranceService.findAll();
            expect(fragrances).toContainEqual(fragrance);
        });
    }

    for(const testcase of testcase_FailedFindFragrance){
        test('fails to find fragrance', async () => {
            await expect(fragranceService.findByID(testcase.input.id)).rejects.toThrow(testcase.expected);
        });
    }

});

// Delete fragrace

describe(('delete fragrance'), () =>{

    const testscase_DeleteFragrance = [
        {
            input: {
                name: 'fragrance1',
                description: 'description1',
                associatedColor: 'color1'
            }
        },
        {
            input: {
                name: 'fragrance2',
                description: 'description2',
                associatedColor: 'color2'
            }
        },
        {
            input: {
                name: 'fragrance3',
                description: 'description3',
                associatedColor: 'color3'
            }
        }
    ];

    const testcase_FailedDeleteFragrance = [
        {
            input: {
                id: 999
            },
            expected: 'Fragrance not found'
        },
        {
            input: {
                id: 9999
            },
            expected: 'Fragrance not found'
        },
        {
            input: {
                id: 99999
            },
            expected: 'Fragrance not found'
        }
    ];

    for(const testcase of testscase_DeleteFragrance){
        test('Delete fragrance', async () => {
            const fragrance = await fragranceService.createFragrance(testcase.input);
            await fragranceService.deleteFragrance(fragrance.id);
            const fragrances = await fragranceService.findAll();
            expect(fragrances).not.toContainEqual(fragrance);
        });
    }

    for(const testcase of testcase_FailedDeleteFragrance){
        test('fails to delete fragrance', async () => {
            await expect(fragranceService.deleteFragrance(testcase.input.id)).rejects.toThrow(testcase.expected);
        });
    }
});

// Update fragrance

describe(('update fragrance'), () =>{

    const testscase_UpdateFragrance = [
        {
            input: {
                name: 'fragrance1',
                description: 'description1',
                associatedColor: 'color1'
            },
            update: {
                name: 'fragrance1_updated',
                description: 'description1_updated',
                associatedColor: 'color1_updated'
            }
        },
        {
            input: {
                name: 'fragrance2',
                description: 'description2',
                associatedColor: 'color2'
            },
            update: {
                name: 'fragrance2_updated',
                description: 'description2_updated',
                associatedColor: 'color2_updated'
            }
        },
        {
            input: {
                name: 'fragrance3',
                description: 'description3',
                associatedColor: 'color3'
            },
            update: {
                name: 'fragrance3_updated',
                description: 'description3_updated',
                associatedColor: 'color3_updated'
            }
        }
    ];

    for(const testcase of testscase_UpdateFragrance){
        test('Update fragrance', async () => {
            const fragrance = await fragranceService.createFragrance(testcase.input);
            const updatedFragrance = await fragranceService.updateFragrance(fragrance.id, testcase.update);
            expect(updatedFragrance).toHaveProperty('id');
            expect(updatedFragrance.name).toBe(testcase.update.name);
            expect(updatedFragrance.description).toBe(testcase.update.description);
            expect(updatedFragrance.associatedColor).toBe(testcase.update.associatedColor);
        });
    }
});