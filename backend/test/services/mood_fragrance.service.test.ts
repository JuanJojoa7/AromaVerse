import {describe, expect, test, beforeAll} from '@jest/globals';
import { Mood_Fragrance_Service, MoodService, FragranceService } from '../../src/services';
import { jest } from '@jest/globals';
import { moodFragranceSchema } from '../../src/schemas'

// Mock the Prisma client
jest.mock('@prisma/client', () => {
    const mockMood_Fragrances = new Map();
    const mockFragrances = new Map();
    const mockMoods = new Map();

    return {
        PrismaClient: jest.fn(() => ({
            fragrance: {
                findUnique: jest.fn(({ where }) => {
                    const fragrance = mockFragrances.get(where.id);
                    if (!fragrance) return null;

                    // Simulate the `include` behavior
                    return {
                        ...fragrance,
                        moodFragrances: Array.from(mockMood_Fragrances.values()).filter(
                            mf => mf.fragranceId === fragrance.id
                        ).map(mf => ({
                            ...mf,
                            mood: mockMoods.get(mf.moodId) || null,
                        })),
                    };
                }),
                create: jest.fn(({ data }) => {
                    const newFragrance = { id: mockFragrances.size + 1, ...data };
                    mockFragrances.set(newFragrance.id, newFragrance);
                    return newFragrance;
                }),
            },
            mood: {
                findUnique: jest.fn(({ where }) => mockMoods.get(where.id)),
                create: jest.fn(({ data }) => {
                    const newMood = { id: mockMoods.size + 1, ...data };
                    mockMoods.set(newMood.id, newMood);
                    return newMood;
                }),
            },
            mood_Fragrance: {
                create: jest.fn(({ data }) => {
                    const moodFragrance = {
                        ...data
                    };
                    mockMood_Fragrances.set(`${data.moodId}_${data.fragranceId}`, moodFragrance);
                    return moodFragrance;
                }),
                delete: jest.fn(({ where }) => {
                    const moodFragrance = mockMood_Fragrances.get(`${where.moodId}_${where.fragranceId}`);
                    mockMood_Fragrances.delete(`${where.moodId}_${where.fragranceId}`);
                    return moodFragrance;
                }),
            },
        })),
    };
});

const moodFragranceService = new Mood_Fragrance_Service();
const moodService = new MoodService();
const fragranceService = new FragranceService();

// link mood to fragrance

describe('linkMoodToFragrance', () => {
    const testcase_Moods = [
        {
            input : {
                id: 1,
                name: 'Mood 1',
                description: 'Description 1',
            },
        },
        {
            input : {
                id: 2,
                name: 'Mood 2',
                description: 'Description 2',
            },
        },
        {
            input : {
                id: 3,
                name: 'Mood 3',
                description: 'Description 3',
            },
        }
    ];

    const testcase_Fragrances = {
        input : {
            id: 1,
            name: 'Fragrance 1',
            description: 'Description 1',
            associatedColor: 'Color 1'
        },
        
    };

    for(const mood of testcase_Moods){
        test('should link a mood to a fragrance', async () => {
            try{
                moodFragranceSchema.parse({
                    moodId: mood.input.id,
                    fragranceId: testcase_Fragrances.input.id
                });
            } catch (error) {
                throw error;
            }
            const mood1 = await moodService.createMood(mood.input);
            const fragrance = await fragranceService.createFragrance(testcase_Fragrances.input);
            const mood_fragrance = await moodFragranceService.linkMoodToFragrance(mood1.id, fragrance.id);
            expect(mood_fragrance).toEqual({
                moodId: mood1.id,
                fragranceId: fragrance.id,
            });
        });
    }

    test('should throw an error if the mood does not exist', async () => {
        try {
            await moodFragranceService.linkMoodToFragrance(999, testcase_Fragrances.input.id);
        } catch (error) {
            expect(error).toEqual(new Error('Mood not found'));
        }
    });

    test('should throw an error if the fragrance does not exist', async () => {
        try {
           await moodFragranceService.linkMoodToFragrance(testcase_Moods[0].input.id, 999);
        } catch (error) {
            expect(error).toEqual(new Error('Fragrance not found'));
        }
    });


});

// Unlink mood from fragrance

describe ('unlinkMoodFromFragrance', () => {
    const testcase_Moods = [
        {
            input : {
                id: 1,
                name: 'Mood 1',
                description: 'Description 1',
            },
        },
        {
            input : {
                id: 2,
                name: 'Mood 2',
                description: 'Description 2',
            },
        },
        {
            input : {
                id: 3,
                name: 'Mood 3',
                description: 'Description 3',
            },
        }
    ];

    const testcase_Fragrances = {
        input : {
            id: 1,
            name: 'Fragrance 1',
            description: 'Description 1',
            associatedColor: 'Color 1'
        },
        
    };

    for (const mood of testcase_Moods) {
        test('should unlink a mood from a fragrance', async () => {
            const mood1 = await moodService.createMood(mood.input);
            const fragrance = await fragranceService.createFragrance(testcase_Fragrances.input);
    
            await moodFragranceService.linkMoodToFragrance(mood1.id, fragrance.id);
            const moods = await moodFragranceService.getFragranceWithMoods(fragrance.id);
            expect(moods).toContainEqual(mood1);
    
            await moodFragranceService.unlinkMoodFromFragrance(mood1.id, fragrance.id);
            const updatedMoods = await moodFragranceService.getFragranceWithMoods(fragrance.id);
            expect(mood1).not.toContainEqual(updatedMoods);
        });
    }
});

// Gets a list of Fragrances / Moods associated with a Mood / Fragrance

describe('getFragranceWithMoods', () => {

    const testcase_Fragrances = {
        input : {
            id: 1,
            name: 'Fragrance 1',
            description: 'Description 1',
            associatedColor: 'Color 1'
        },
    };

    const testcase_Moods = [
        {
            input : {
                id: 1,
                name: 'Mood 1',
                description: 'Description 1',
            },
        },
        {
            input : {
                id: 2,
                name: 'Mood 2',
                description: 'Description 2',
            },
        },
        {
            input : {
                id: 3,
                name: 'Mood 3',
                description: 'Description 3',
            },
        }
    ];

    for (const mood of testcase_Moods) {
        test('should return a fragrance with its associated mood', async () => {
            const mood1 = await moodService.createMood(mood.input);
            const fragrance = await fragranceService.createFragrance(testcase_Fragrances.input);
            await moodFragranceService.linkMoodToFragrance(mood1.id, fragrance.id);
            const moods = await moodFragranceService.getFragranceWithMoods(fragrance.id);
            expect(moods).toContainEqual(mood1);
        });
    }
    
    test ('should return fragrances associated moods', async () => {
        const fragrance = await fragranceService.createFragrance(testcase_Fragrances.input);
        const mappedMoods: any[] = [];
        for(const mood of testcase_Moods){
            const mood1 = await moodService.createMood(mood.input);
            mappedMoods.push(mood1);
            await moodFragranceService.linkMoodToFragrance(mood1.id, fragrance.id);
        }
        const moods = await moodFragranceService.getFragranceWithMoods(fragrance.id);
        expect(moods).toHaveLength(3);
        expect(moods).toEqual(mappedMoods);
    });

    test('should return null if the fragrance does not exist', async () => {
        const moods = await moodFragranceService.getFragranceWithMoods(999);
        expect(moods).toBeNull();
    });

    test('should return null if the fragrance has no associated moods', async () => {
        const fragrance = await fragranceService.createFragrance(testcase_Fragrances.input);
        const moods = await moodFragranceService.getFragranceWithMoods(fragrance.id);
        expect(moods).toBeNull();
    });
});