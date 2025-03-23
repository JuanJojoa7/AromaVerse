import {describe, expect, test} from '@jest/globals';
import { ContainerService } from '../src/services';
import { jest } from '@jest/globals';

// Mock the Prisma client
jest.mock('@prisma/client', () => {
    const mockContainers = new Map(); // In-memory storage for containers
    let idCounter = 1; // Simulate auto-incrementing IDs

    return {
        PrismaClient: jest.fn(() => ({
            container: {
                create: jest.fn(({ data }) => {
                    const container = { id: idCounter++, ...data };
                    mockContainers.set(container.id, container);
                    return container;
                }),

                findMany: jest.fn(() => Array.from(mockContainers.values())),

                findUnique: jest.fn(({ where: { id } }) => mockContainers.get(id)),

                delete: jest.fn(({ where: { id } }) => {
                    const deletedContainer = mockContainers.get(id);
                    mockContainers.delete(id);
                    return deletedContainer;
                }),

                update: jest.fn(({ where: { id }, data }) => {
                    const updatedContainer = { ...mockContainers.get(id), ...data };
                    mockContainers.set(id, updatedContainer);
                    return updatedContainer;
                }),
            },
        })),
    };
});

const containerService = new ContainerService();

// Create container

describe('container create', () => {

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

    for (const testcase of testcase_CreateContainer) {
        test('creates container', async () => {
            const container = await containerService.createContainer(testcase.input);
            expect(container).toHaveProperty('id');
            expect(container.name).toBe(testcase.expected.name);
            expect(container.material).toBe(testcase.expected.material);
            expect(container.description).toBe(testcase.expected.description);
        });
    }

    for (const testcase of testcase_FailedCreateContainer) {
        test('fails to create container with missing name', async () => {
            await expect(containerService.createContainer(testcase.input))
            .rejects
            .toThrow(testcase.expected);
        });
    }

});

// Find container

describe('container find', () => {

    const testcase_FindContainer = [
        {
            input: {
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
            }
        },
        {
            input: {
                name: 'container3',
                material: 'material3',
                description: 'description3'
            }
        }
    ];

    const testcase_FindAllContainers = [
        {
            input: {
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
            }
        },
        {
            input: {
                name: 'container3',
                material: 'material3',
                description: 'description3'
            }
        }
    ];

    const testcase_FindContainerFailed = [
        {
            input: {
                name: 'container1',
                material: 'material1',
                description: 'description1'
            },
            expected: 'ID is required'
        }
    ];

    for (const testcase of testcase_FindContainer) {
        test('finds container by id', async () => {
            const container = await containerService.createContainer(testcase.input);
            const foundContainer = await containerService.findByID(container.id);
            expect(foundContainer).toEqual(container);
        });
    }

    for (const testcase of testcase_FindAllContainers) {
        test('finds all containers', async () => {
            const container = await containerService.createContainer(testcase.input);
            const containers = await containerService.findAll();
            expect(containers).toContain(container);
        });
    }

    for (const testcase of testcase_FindContainerFailed) {
        test('fails to find container with missing id', async () => {
            await expect(containerService.findByID(0))
            .rejects
            .toThrow(testcase.expected);
        });
    }
});

// Delete container

describe('container delete', () => {

    const testcase_DeleteContainer = [
        {
            input: {
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
            }
        },
        {
            input: {
                name: 'container3',
                material: 'material3',
                description: 'description3'
            }
        }
    ];

    for (const testcase of testcase_DeleteContainer) {
        test('deletes container', async () => {
            const container = await containerService.createContainer(testcase.input);
            await containerService.deleteContainer(container.id);
            const containers = await containerService.findAll();
            expect(containers).not.toContain(container);
        });
    }
});

// Update container

describe('container update', () => {
    const testcase_UpdateContainer = [
        {
            input: {
                name: 'container1',
                material: 'material1',
                description: 'description1'
            },
            expected: {
                name: 'updatedContainer',
                material: 'updatedMaterial',
                description: 'updatedDescription'
            }
        },
        {
            input: {
                name: 'container2',
                material: 'material2',
                description: 'description2'
            },
            expected: {
                name: 'updatedContainer2',
                material: 'updatedMaterial2',
                description: 'updatedDescription2'
            }
        },
        {
            input: {
                name: 'container3',
                material: 'material3',
                description: 'description3'
            },
            expected: {
                name: 'updatedContainer3',
                material: 'updatedMaterial3',
                description: 'updatedDescription3'
            }
        }
    ];

    for (const testcase of testcase_UpdateContainer) {
        test('updates container', async () => {
            const container = await containerService.createContainer(testcase.input);
            const updatedContainer = await containerService.updateContainer(container.id, testcase.expected);
            expect(updatedContainer).toHaveProperty('id');
            expect(updatedContainer.name).toBe(testcase.expected.name);
            expect(updatedContainer.material).toBe(testcase.expected.material);
            expect(updatedContainer.description).toBe(testcase.expected.description);
        });
    };
});
