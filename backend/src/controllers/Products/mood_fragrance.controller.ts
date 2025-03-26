import { Request, Response } from 'express';
import { Mood_Fragrance_Service } from '../../services';

// Se crea una instancia del servicio para manejar la relación entre estados de ánimo y fragancias
const mood_Fragrance_Service = new Mood_Fragrance_Service();

// Controlador para gestionar la relación entre estados de ánimo y fragancias
export class Mood_Fragrance_Controller {

    // Método para obtener una fragancia junto con los estados de ánimo asociados
    public async getFragranceWithMoods(req: Request, res: Response): Promise<void>{
        try {
            const fragrance = await mood_Fragrance_Service.getFragranceWithMoods(Number(req.params.id)); // Obtiene la fragancia con sus estados de ánimo asociados
            res.status(200).json(fragrance); // Responde con la fragancia y sus relaciones
        } catch (error) {
            res.status(500).json({message: 'Internal server error', error}); // Manejo de error interno
        }
    }

    // Método para obtener un estado de ánimo junto con las fragancias asociadas
    public async getMoodWithFragrances(req: Request, res: Response): Promise<void>{
        try {
            const mood = await mood_Fragrance_Service.getMoodWithFragrances(Number(req.params.id)); // Obtiene el estado de ánimo con sus fragancias asociadas
            res.status(200).json(mood); // Responde con el estado de ánimo y sus relaciones
        } catch (error) {
            res.status(500).json({message: 'Internal server error', error}); // Manejo de error interno
        }
    }

    // Método para asociar un estado de ánimo con una fragancia
    public async linkMoodToFragrance(req: Request, res: Response): Promise<void>{
        try {
            const { moodId, fragranceId } = req.body; // Extrae los IDs del cuerpo de la petición
            
            // Verifica que los IDs sean enteros válidos
            if(!Number.isInteger(moodId) || !Number.isInteger(fragranceId)){
                res.status(400).json({ message: 'Invalid mood or fragranceId'}) // Retorna error si los IDs no son válidos
                return;
            }

            const relation = await mood_Fragrance_Service.linkMoodToFragrance(moodId, fragranceId); // Llama al servicio para crear la relación
            res.status(200).json(relation); // Responde con la relación creada
        } catch (error) {
            // Manejo de error si el estado de ánimo o la fragancia no existen
            if(error instanceof Error && error.message === 'Mood or Fragrance not found'){
                res.status(404).json({message: 'Mood or Fragrance not found'});
                return;
            }
            console.error('Error in method linkMoodToFragrance:', error);
            res.status(500).json({message: 'Internal server error', error}); // Manejo de error interno
        }
    }

    // Método para eliminar la relación entre un estado de ánimo y una fragancia
    public async unlinkMoodFromFragrance(req: Request, res: Response): Promise<void>{
        try {
            const { moodId, fragranceId } = req.body; // Extrae los IDs del cuerpo de la petición

            // Verifica que los IDs sean enteros válidos
            if(!Number.isInteger(moodId) || !Number.isInteger(fragranceId)){
                res.status(400).json({ message: 'Invalid moodId or fragranceId'}) // Retorna error si los IDs no son válidos
                return;
            }

            const relation = await mood_Fragrance_Service.unlinkMoodFromFragrance(moodId, fragranceId); // Llama al servicio para eliminar la relación
            res.status(200).json(relation); // Responde con la relación eliminada

        } catch (error) {
            console.error('Error en unlinkMoodFromFragrance:', error);
            // Manejo de error si la relación no existe
            if(error instanceof Error && error.message === 'Mood or Fragrance not found'){
                res.status(404).json({message: 'Mood or Fragrance not found'});
                return;
            }
            console.error('Error in method unlinkMoodFromFragrance:', error);
            res.status(500).json({message: 'Internal server error', error}); // Manejo de error interno
        }
    }
}