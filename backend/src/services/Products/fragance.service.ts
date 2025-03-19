import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class FragranceService {
    
    public async createFragrance(UserInput: {
        name: string;
        description: string;
        associatedColor: string;

    }): Promise<any> {
        try {
            const newFragrance = await prisma.fragrance.create({
                data: {
                    name: UserInput.name,
                    description: UserInput.description,
                    associatedColor: UserInput.associatedColor,
                }
            });

            return newFragrance;
        } catch (error) {
         
            throw error;
        }
    }

    public async findAll(): Promise<any[]> {
        try {
            const fragrances = await prisma.fragrance.findMany();
            return fragrances;
        } catch (error) {
            throw error;
        }
    }

    public async findByID(id: number): Promise<any | null> {
        try {
            const fragrance = await prisma.fragrance.findUnique({
                where: {id},
            });
            return fragrance;
        } catch (error) {
            console.error('Error al buscar la fragancia:', error);
            throw error;
        }
    }

    public async deleteFragrance(id: number): Promise<any | null>{
        try {
            const fragrance = await prisma.fragrance.delete({
                where: {
                    id: id
                }
            });
            return fragrance;
        } catch (error) {
            throw error;
        }
    }

    public async updateFragrance(id: number, UserInput: {
        name: string;
        description: string;
        associatedColor: string;
    }): Promise<any | null>{
        try {
            const fragrance = await prisma.fragrance.update({
                where: {id},
                data: {
                    name: UserInput.name,
                    description: UserInput.description,
                    associatedColor: UserInput.associatedColor,
                }
            });
            return fragrance;
        } catch (error) {
            throw error;
        }
    }
}