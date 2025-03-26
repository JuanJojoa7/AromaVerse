import { Request, Response } from 'express';
import { MoodService } from '../../services';

// Se crea una instancia del servicio de estados de ánimo
const moodService = new MoodService();

// Controlador para gestionar los estados de ánimo en la API
export class MoodController {

    // Método para crear un nuevo estado de ánimo
    public async create(req: Request, res: Response): Promise<void>{
        try {
            console.log("mood controller") // Log para verificar la ejecución del método
            const newMood = await moodService.createMood(req.body); // Crea un nuevo estado de ánimo con los datos recibidos
            res.status(201).json(newMood); // Responde con el estado de ánimo creado
        } catch (error) {
            // Manejo de error si el estado de ánimo ya existe
            if(error instanceof Error && error.message === 'Mood already exists'){
                res.status(400).json({message: 'Mood already exists'});
                return;
            }
            res.status(500).json({message: 'Internal server error', error}); // Manejo de error interno
        }
    }

    // Método para obtener todos los estados de ánimo registrados
    public async getAllMoods(req: Request, res: Response): Promise<void>{
        try {
            const moods = await moodService.findAll(); // Obtiene todos los estados de ánimo
            res.status(200).json(moods); // Responde con la lista de estados de ánimo
        } catch (error) {
            res.status(500).json({message: 'Internal server error', error}); // Manejo de error interno
        }
    }

    // Método para eliminar un estado de ánimo por su ID
    public async deleteMood(req: Request, res: Response): Promise<void>{
        try {
            const mood = await moodService.deleteMood(Number(req.params.id)); // Elimina el estado de ánimo por ID
            res.status(200).json(mood); // Responde con el estado de ánimo eliminado
        } catch (error) {
            console.error('Error in method deleteMood:', error); // Log del error en consola
            // Manejo de error si el estado de ánimo no existe
            if(error instanceof Error && error.message === 'Mood not found'){
                res.status(404).json({message: 'Mood not found'});
                return;
            }
            res.status(500).json({message: 'Internal server error', error}); // Manejo de error interno
        }
    }

    // Método para actualizar un estado de ánimo existente
    public async updateMood(req: Request, res: Response): Promise<void>{
        try {
            const moodId = parseInt(req.params.id, 10); // Convierte el ID a número entero
            const moodInput = req.body; // Obtiene los datos de actualización desde el request
            const updatedMood = await moodService.updateMood(moodId, moodInput); // Llama al servicio para actualizar
            res.status(200).json(updatedMood); // Responde con el estado de ánimo actualizado
        } catch (error) {
            console.error('Error in method updateMood:', error); // Log del error en consola
            // Manejo de error si el estado de ánimo no existe
            if(error instanceof Error && error.message === 'Mood not found'){
                res.status(404).json({message: 'Mood not found'});
                return;
            }
            res.status(500).json({message: 'Internal server error', error}); // Manejo de error interno
        }
    }
}