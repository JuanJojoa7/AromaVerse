import { PrismaClient } from '@prisma/client';

// Se crea una instancia del cliente de Prisma para interactuar con la base de datos
const prisma = new PrismaClient();

// Servicio para gestionar la relación entre estados de ánimo y fragancias
export class Mood_Fragrance_Service {

    // Método para obtener la lista de estados de ánimo asociados a una fragancia
    public async getFragranceWithMoods(fragranceId: number): Promise<any> {
        try {
            // Busca la fragancia por su ID e incluye los estados de ánimo relacionados
            const fragrance = await prisma.fragrance.findUnique({
                where: { id: fragranceId },
                include: {
                    moodFragrances: {
                        include: {
                            mood: true, // Incluye los detalles del estado de ánimo
                        },
                    },
                },
            });

            // Si la fragancia no existe o no tiene estados de ánimo asociados, retorna null
            if (!fragrance || !fragrance.moodFragrances || fragrance.moodFragrances.length === 0) return null;

            // Retorna la lista de estados de ánimo asociados a la fragancia
            return fragrance.moodFragrances.map(mf => mf.mood);
        } catch (error) {
            throw error; // Lanza el error en caso de fallo
        }
    }

    // Método para obtener la lista de fragancias asociadas a un estado de ánimo
    public async getMoodWithFragrances(moodId: number): Promise<any> {
        try {
            // Busca el estado de ánimo por su ID e incluye las fragancias relacionadas
            const mood = await prisma.mood.findUnique({
                where: { id: moodId },
                include: {
                    moodFragrances: {
                        include: {
                            fragrance: true, // Incluye los detalles de la fragancia
                        },
                    },
                },
            });
            
            // Si el estado de ánimo no existe o no tiene fragancias asociadas, retorna null
            if (!mood || !mood.moodFragrances) return null;
            
            // Retorna la lista de fragancias asociadas al estado de ánimo
            return mood.moodFragrances.map(mf => mf.fragrance);
        } catch (error) {
            throw error; // Lanza el error en caso de fallo
        }
    }

    // Método para vincular un estado de ánimo con una fragancia
    public async linkMoodToFragrance(moodId: number, fragranceId: number): Promise<any> {
        try {
            // Verifica si el estado de ánimo existe en la base de datos
            const mood = await prisma.mood.findUnique({
                where: { id: moodId },
            });
            if(!mood){
                throw new Error('Mood not found'); // Lanza un error si no existe
            }
            
            // Verifica si la fragancia existe en la base de datos
            const fragrance = await prisma.fragrance.findUnique({
                where: { id: fragranceId },
            });
            if (!fragrance) {
                throw new Error('Fragrance not found'); // Lanza un error si no existe
            }
            
            // Crea la relación entre estado de ánimo y fragancia en la base de datos
            const relation = await prisma.mood_Fragrance.create({
                data: {
                    moodId,
                    fragranceId,
                },
            });
            return relation; // Retorna la relación creada
        } catch (error) {
            console.error('Error en linkMoodToFragrance:', error);
            throw error; // Lanza el error en caso de fallo
        }
    }

    // Método para desvincular un estado de ánimo de una fragancia
    public async unlinkMoodFromFragrance(moodId: number, fragranceId: number): Promise<any> {
        try {
            // Verifica si el estado de ánimo existe en la base de datos
            const mood = await prisma.mood.findUnique({
                where: { id: moodId },
            });
            if (!mood) {
                throw new Error('Mood not found'); // Lanza un error si no existe
            }
            
            // Verifica si la fragancia existe en la base de datos
            const fragrance = await prisma.fragrance.findUnique({
                where: { id: fragranceId },
            });
            if(!fragrance){
                throw new Error('Fragrance not found'); // Lanza un error si no existe
            }

            // Elimina la relación entre estado de ánimo y fragancia en la base de datos
            const relation = await prisma.mood_Fragrance.delete({
                where: {
                    moodId_fragranceId: {
                        moodId,
                        fragranceId,
                    },
                },
            });
            return relation; // Retorna la relación eliminada
        } catch (error) {
            console.error('Error en unlinkMoodFromFragrance:', error);
            throw error; // Lanza el error en caso de fallo
        }
    }
}
