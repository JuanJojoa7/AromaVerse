import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export class MoodService {

    public async createMood(UserInput: {
        name: string;
        description: string;

    }): Promise<any> {
        try {
            const newMood = await prisma.mood.create({
                data: {
                    name: UserInput.name,
                    description: UserInput.description,
                }
            });

            return newMood;
        } catch (error) {
            throw error;
        }
    }

    public async findAll(): Promise<any[]> {
        try {
            const moods = await prisma.mood.findMany();
            return moods;
        } catch (error) {
            throw error;
        }
    }

    public async findByID(id: number): Promise<any | null> {
        try {
            const mood = await prisma.mood.findUnique({
                where: {id},
            });
            if(!mood){
                throw new Error('Mood not found');
            }
            return mood;
        } catch (error) {
            console.error('Error al buscar el mood:', error);
            throw error;
        }
    }

    public async deleteMood(id: number): Promise<any | null>{
        try {
            if(await this.findByID(id) === null){
                throw new Error('Mood not found');
            }
            const mood = await prisma.mood.delete({
                where: {
                    id: id
                }
            });
            return mood;
        } catch (error) {
            throw error;
        }
    }

    public async updateMood(id: number, UserInput: {
        name: string;
        description: string;
    }): Promise<any | null>{
        try {
            const mood = await prisma.mood.update({
                where: {id},
                data: {
                    name: UserInput.name,
                    description: UserInput.description,
                }
            });
            return mood;
        } catch (error) {
            throw error;
        }
    }


}