import { PrismaClient } from '@prisma/client';

// Se crea una instancia del cliente de Prisma para interactuar con la base de datos
const prisma = new PrismaClient();

// Servicio para gestionar los contenedores de velas en la base de datos
export class ContainerService {

    // Método para crear un nuevo contenedor
    public async createContainer(UserInput: {
        name: string;
        material: string;
        description: string;
      }): Promise<any> {
        try {
          // Inserta un nuevo contenedor en la base de datos
          const newContainer = await prisma.container.create({
            data: {
                name: UserInput.name,
                material: UserInput.material,
                description: UserInput.description,
                },
            });
            return newContainer; // Retorna el contenedor creado
        } catch (error) {
            throw error; // Lanza el error si ocurre un problema
        }
    }

    // Método para obtener todos los contenedores almacenados en la base de datos
    public async findAll(): Promise<any[]> {
        try {
            const containers = await prisma.container.findMany(); // Obtiene todos los contenedores
            return containers; // Retorna la lista de contenedores
        } catch (error) {
            throw error; // Lanza el error en caso de fallo
        }
    }

    // Método para encontrar un contenedor por su ID
    public async findByID(id: number): Promise<any | null> {
        try {
            const container = await prisma.container.findUnique({
                where: {id}, // Busca un contenedor con el ID especificado
            });

            if(!container){
                throw new Error('Container not found'); // Lanza un error si el contenedor no existe
            }
            
            return container; // Retorna el contenedor encontrado
        } catch (error) {
            console.error('Error al buscar el contenedor:', error);
            throw error; // Lanza el error en caso de fallo
        }
    }

    // Método para eliminar un contenedor por su ID
    public async deleteContainer(id: number): Promise<any | null>{
        try {
            if(await this.findByID(id) === null){
                throw new Error('Container not found'); // Lanza un error si el contenedor no existe
            }
            
            const container = await prisma.container.delete({
                where: {
                    id: id // Elimina el contenedor con el ID especificado
                }
            });
            return container; // Retorna el contenedor eliminado
        } catch (error) {
            throw error; // Lanza el error en caso de fallo
        }
    }

    // Método para actualizar un contenedor existente
    public async updateContainer(id: number, UserInput: {
        name: string;
        material: string;
        description: string;
    }): Promise<any | null> {
        try {
            // Actualiza el contenedor con los datos proporcionados
            const container = await prisma.container.update({
                where: {id},
                data: {
                    name: UserInput.name,
                    material: UserInput.material,
                    description: UserInput.description,
                }
            });
            return container; // Retorna el contenedor actualizado
        } catch (error) {
            throw error; // Lanza el error en caso de fallo
        }
    }
}