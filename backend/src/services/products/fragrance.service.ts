import { PrismaClient } from '@prisma/client';

// Se crea una instancia del cliente de Prisma para interactuar con la base de datos
const prisma = new PrismaClient();

// Servicio para gestionar las fragancias en la base de datos
export class FragranceService {
    
    // Método para crear una nueva fragancia
    public async createFragrance(UserInput: {
        name: string;
        description: string;
        associatedColor: string;
    }): Promise<any> {
        try {
            // Inserta una nueva fragancia en la base de datos
            const newFragrance = await prisma.fragrance.create({
                data: {
                    name: UserInput.name,
                    description: UserInput.description,
                    associatedColor: UserInput.associatedColor,
                }
            });
            return newFragrance; // Retorna la fragancia creada
        } catch (error) {
            console.error('Error al crear la fragrance:', error);
            throw error; // Lanza el error si ocurre un problema
        }
    }

    // Método para obtener todas las fragancias almacenadas en la base de datos
    public async findAll(): Promise<any[]> {
        try {
            const fragrances = await prisma.fragrance.findMany(); // Obtiene todas las fragancias
            return fragrances; // Retorna la lista de fragancias
        } catch (error) {
            throw error; // Lanza el error en caso de fallo
        }
    }

    // Método para encontrar una fragancia por su ID
    public async findByID(id: number): Promise<any | null> {
        try {
            const fragrance = await prisma.fragrance.findUnique({
                where: {id}, // Busca una fragancia con el ID especificado
            });

            if(!fragrance){
                throw new Error('Fragrance not found'); // Lanza un error si la fragancia no existe
            }
            return fragrance; // Retorna la fragancia encontrada
        } catch (error) {
            console.error('Error al buscar la fragancia:', error);
            throw error; // Lanza el error en caso de fallo
        }
    }

    // Método para eliminar una fragancia por su ID
    public async deleteFragrance(id: number): Promise<any | null>{
        try {
            if(await this.findByID(id) === null){
                throw new Error('Fragrance not found'); // Lanza un error si la fragancia no existe
            }
            
            const fragrance = await prisma.fragrance.delete({
                where: {
                    id: id // Elimina la fragancia con el ID especificado
                }
            });
            return fragrance; // Retorna la fragancia eliminada
        } catch (error) {
            throw error; // Lanza el error en caso de fallo
        }
    }

    // Método para actualizar una fragancia existente
    public async updateFragrance(id: number, UserInput: {
        name: string;
        description: string;
        associatedColor: string;
    }): Promise<any | null>{
        try {
            // Actualiza la fragancia con los datos proporcionados
            const fragrance = await prisma.fragrance.update({
                where: {id},
                data: {
                    name: UserInput.name,
                    description: UserInput.description,
                    associatedColor: UserInput.associatedColor,
                }
            });
            return fragrance; // Retorna la fragancia actualizada
        } catch (error) {
            throw error; // Lanza el error en caso de fallo
        }
    }
}
