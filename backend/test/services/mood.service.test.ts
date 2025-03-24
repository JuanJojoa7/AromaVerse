import {describe, expect, test} from '@jest/globals';
import { MoodService } from '../../src/services';
import { jest } from '@jest/globals';
import { moodSchema } from '../../src/schemas'

// Mock the Prisma client
jest.mock('@prisma/client', () => {
    const mockMoods = new Map(); // In-memory storage for moods
    let idCounter = 1; // Simulate auto-incrementing IDs

    return {
        PrismaClient: jest.fn(() => ({
            mood : {
                create: jest.fn(({ data }) => {
                    const mood = { id: idCounter++, ...data };
                    mockMoods.set(mood.id, mood);
                    return mood;
                }),

                findMany: jest.fn(() => Array.from(mockMoods.values())),

                findUnique: jest.fn(({ where: { id } }) => mockMoods.get(id)),

                delete: jest.fn(({ where: { id } }) => {
                    const deletedMood = mockMoods.get(id);
                    mockMoods.delete(id);
                    return deletedMood;
                }),

                update: jest.fn(({ where: { id }, data }) => {
                    const updatedMood = { ...mockMoods.get(id), ...data };
                    mockMoods.set(id, updatedMood);
                    return updatedMood;
                }),
            },
        })),
    };
});

const moodService = new MoodService();

// Create mood

describe(('mood create'), () => {

    const testcase_CreateMood = [
        {
            input: {
                name: 'mood1',
                description: 'description1'
            },
            expected: {
                name: 'mood1',
                description: 'description1'
            }
        },
        {
            input: {
                name: 'mood2',
                description: 'description2'
            },
            expected: {
                name: 'mood2',
                description: 'description2'
            }
        },
        {
            input: {
                name: 'mood3',
                description: 'description3'
            },
            expected: {
                name: 'mood3',
                description: 'description3'
            }
        }
    ];

    const testcase_FailedCreateMood = [
        {
            input: {
                name: '',
                description: 'description1'
            },
            expected: 'Name cannot be empty'
        },
        {
            input: {
                name: 'mood2',
                description: ''
            },
            expected: 'Description cannot be empty'
        }
    ];

    for(const testcase of testcase_CreateMood){
        test('Create mood', async () => {
            try{
               await moodSchema.parseAsync(testcase.input);
            }catch(error){
                throw new Error('Invalid test data');
            }
            const mood = await moodService.createMood(testcase.input);

            expect(mood).toHaveProperty('id');
            expect(mood.name).toBe(testcase.expected.name);
            expect(mood.description).toBe(testcase.expected.description);
        });
    }

    for(const testcase of testcase_FailedCreateMood){
        test (`fails to create fragrance with missing ${Object.keys(testcase.input).find(key => !testcase.input[key])}`, async () => {
            await expect(moodSchema.parseAsync(testcase.input)).rejects.toThrow(testcase.expected);
        });
    }
});

// Find all moods
describe('find mood', () => {

    const testcase_FindMood = [
        {
            input: {
                name: 'mood1',
                description: 'description1'
            }
        },
        {
            input: {
                name: 'mood2',
                description: 'description2'
            }
        },
        {
            input: {
                name: 'mood3',
                description: 'description3'
            }
        }
    ];

    const testcase_FailedFindMood = [
        {
            input: {
                id: 999
            },
            expected: 'Mood not found'
        },
        {
            input: {
                id: 9999
            },
            expected: 'Mood not found'
        },
        {
            input: {
                id: 99999
            },
            expected: 'Mood not found'
        }
    ];

    for(const testcase of testcase_FindMood){
        test('Find mood by id', async () => {
            const mood = await moodService.createMood(testcase.input);
            const foundMood = await moodService.findByID(mood.id);
            expect(foundMood).toEqual(mood);
        });
    }

    for(const testcase of testcase_FindMood){
        test('Find all moods', async () => {
            const mood = await moodService.createMood(testcase.input);
            const moods = await moodService.findAll();
            expect(moods).toContainEqual(mood);
        });
    }

    for(const testcase of testcase_FailedFindMood){
        test('Find mood by id', async () => {
            await expect(moodService.findByID(testcase.input.id)).rejects.toThrow(testcase.expected);
        });
    }
});

// Delete mood
describe('delete mood', () => {
    const testcase_DeleteMood = [
        {
            input: {
                name: 'mood1',
                description: 'description1'
            }
        },
        {
            input: {
                name: 'mood2',
                description: 'description2'
            }
        },
        {
            input: {
                name: 'mood3',
                description: 'description3'
            }
        }
    ];

    const testcase_FailedDeleteMood = [
        {
            input: {
                id: 999
            },
            expected: 'Mood not found'
        },
        {
            input: {
                id: 9999
            },
            expected: 'Mood not found'
        },
        {
            input: {
                id: 99999
            },
            expected: 'Mood not found'
        }
    ];

    for(const testcase of testcase_DeleteMood){
        test('Delete mood', async () => {
            const mood = await moodService.createMood(testcase.input);
            await moodService.deleteMood(mood.id);
            const moods = await moodService.findAll();
            expect(moods).not.toContainEqual(mood);
        });
    }

    for(const testcase of testcase_FailedDeleteMood){
        test('Delete mood', async () => {
            await expect(moodService.deleteMood(testcase.input.id)).rejects.toThrow(testcase.expected);
        });
    }
});

// Update mood
describe('update mood', () => {
    const testcase_UpdateMood = [
        {
            input: {
                name: 'mood1',
                description: 'description1'
            },
            update: {
                name: 'mood1_updated',
                description: 'description1_updated'
            }
        },
        {
            input: {
                name: 'mood2',
                description: 'description2'
            },
            update: {
                name: 'mood2_updated',
                description: 'description2_updated'
            }
        },
        {
            input: {
                name: 'mood3',
                description: 'description3'
            },
            update: {
                name: 'mood3_updated',
                description: 'description3_updated'
            }
        }
    ];

    for(const testcase of testcase_UpdateMood){
        test('Update mood', async () => {
            const mood = await moodService.createMood(testcase.input);
            const updatedMood = await moodService.updateMood(mood.id, testcase.update);
            expect(updatedMood).toHaveProperty('id');
            expect(updatedMood.name).toBe(testcase.update.name);
            expect(updatedMood.description).toBe(testcase.update.description);
        });
    }
});