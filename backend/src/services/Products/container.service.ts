import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ContainerService {

    public async createContainer(UserInput: {
        name: string;
        material: string;
        description: string;
    
      }): Promise<any> {
        try {
          const newContainer = await prisma.container.create({
            data: {
                name: UserInput.name,
                material: UserInput.material,
                description: UserInput.description,
                },
            });
            return newContainer;
        }catch (error) {
            console.error('Error al crear el contenedor:', error);
            throw error;
        }
    }

    public async findAll(): Promise<any[]> {
        try {
            const containers = await prisma.container.findMany();
            return containers;
        } catch (error) {
            throw error;
        }
    }

    public async findByID(id: number): Promise<any | null> {
        try {
            const container = await prisma.container.findUnique({
                where: {id},
            });
            return container;
        } catch (error) {
            console.error('Error al buscar el contenedor:', error);
            throw error;
        }
    }

    public async deleteContainer(id: number): Promise<any | null>{
        try {
            const container = await prisma.container.delete({
                where: {
                    id: id
                }
            });
            return container;
        } catch (error) {
            throw error;
        }
    }

    public async updateContainer(id: number, UserInput: {
        name: string;
        material: string;
        description: string;
    }): Promise<any | null> {
        try {
            const containerExists = await this.findByID(id);
            if(containerExists === null){
                throw new Error('Container not found');
            }
            const container = await prisma.container.update({
                where: {id},
                data: {
                    name: UserInput.name,
                    material: UserInput.material,
                    description: UserInput.description,
                }
            });
            return container;
        } catch (error) {
            throw error;
        }
    }


}