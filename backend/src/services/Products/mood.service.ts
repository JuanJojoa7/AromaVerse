import { PrismaClient } from '@prisma/client';

// Se crea una instancia del cliente de Prisma para interactuar con la base de datos
const prisma = new PrismaClient();

// Servicio para gestionar los estados de ánimo en la base de datos
export class MoodService {

    // Método para crear un nuevo estado de ánimo
    public async createMood(UserInput: {
        name: string;
        description: string;
    }): Promise<any> {
        try {
            // Inserta un nuevo estado de ánimo en la base de datos
            const newMood = await prisma.mood.create({
                data: {
                    name: UserInput.name,
                    description: UserInput.description,
                }
            });
            return newMood; // Retorna el estado de ánimo creado
        } catch (error) {
            throw error; // Lanza el error en caso de fallo
        }
    }

    // Método para obtener todos los estados de ánimo almacenados en la base de datos
    public async findAll(): Promise<any[]> {
        try {
            const moods = await prisma.mood.findMany(); // Obtiene todos los estados de ánimo
            return moods; // Retorna la lista de estados de ánimo
        } catch (error) {
            throw error; // Lanza el error en caso de fallo
        }
    }

    // Método para encontrar un estado de ánimo por su ID
    public async findByID(id: number): Promise<any | null> {
        try {
            const mood = await prisma.mood.findUnique({
                where: {id}, // Busca un estado de ánimo con el ID especificado
            });
            if(!mood){
                throw new Error('Mood not found'); // Lanza un error si el estado de ánimo no existe
            }
            return mood; // Retorna el estado de ánimo encontrado
        } catch (error) {
            console.error('Error al buscar el mood:', error);
            throw error; // Lanza el error en caso de fallo
        }
    }

    // Método para eliminar un estado de ánimo por su ID
    public async deleteMood(id: number): Promise<any | null>{
        try {
            if(await this.findByID(id) === null){
                throw new Error('Mood not found'); // Lanza un error si el estado de ánimo no existe
            }
            
            const mood = await prisma.mood.delete({
                where: {
                    id: id // Elimina el estado de ánimo con el ID especificado
                }
            });
            return mood; // Retorna el estado de ánimo eliminado
        } catch (error) {
            throw error; // Lanza el error en caso de fallo
        }
    }

    // Método para actualizar un estado de ánimo existente
    public async updateMood(id: number, UserInput: {
        name: string;
        description: string;
    }): Promise<any | null>{
        try {
            // Actualiza el estado de ánimo con los datos proporcionados
            const mood = await prisma.mood.update({
                where: {id},
                data: {
                    name: UserInput.name,
                    description: UserInput.description,
                }
            });
            return mood; // Retorna el estado de ánimo actualizado
        } catch (error) {
            throw error; // Lanza el error en caso de fallo
        }
    }
}