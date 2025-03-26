import { Request, Response } from 'express';
import { FragranceService } from '../../services';

// Se crea una instancia del servicio de fragancias
const fragranceService = new FragranceService();

// Controlador para manejar las fragancias en la API
export class FragranceController {
    
    // Método para crear una nueva fragancia
    public async create(req: Request, res: Response): Promise<void>{
        try {
            console.log("fragrance controller") // Mensaje de depuración para verificar ejecución
            const newFragrance = await fragranceService.createFragrance(req.body); // Se crea la fragancia con los datos del request
            res.status(201).json(newFragrance); // Respuesta con el objeto de la fragancia creada
        } catch (error) {
            // Manejo de error cuando la fragancia ya existe
            if(error instanceof Error && error.message === 'Fragrance already exists'){
                res.status(400).json({message: 'Fragrance already exists'}); // Retorna error 400
                return;
            }
            res.status(500).json({message: 'Internal server error', error}); // Manejo de error interno
        }
    }

    // Método para obtener todas las fragancias registradas
    public async getAllFragrances(req: Request, res: Response): Promise<void>{
        try {
            const fragrances = await fragranceService.findAll(); // Obtiene todas las fragancias disponibles
            res.status(200).json(fragrances); // Respuesta con la lista de fragancias
        } catch (error) {
            res.status(500).json({message: 'Internal server error', error}); // Manejo de error interno
        }
    }

    // Método para eliminar una fragancia por su ID
    public async deleteFragrance(req: Request, res: Response): Promise<void>{
        try {
            const fragrance = await fragranceService.deleteFragrance(Number(req.params.id)); // Elimina la fragancia por ID
            res.status(200).json(fragrance); // Respuesta con la fragancia eliminada
        } catch (error) {
            console.error('Error in method deleteFragrance:', error); // Mensaje de error en consola
            // Manejo de error si la fragancia no existe
            if(error instanceof Error && error.message === 'Fragrance not found'){
                res.status(404).json({message: 'Fragrance not found'}); // Retorna error 404
                return;
            }
            res.status(500).json({message: 'Internal server error', error}); // Manejo de error interno
        }
    }

    // Método para actualizar una fragancia existente
    public async updateFragrance(req: Request, res: Response): Promise<void>{
        try {
          const fragranceId = parseInt(req.params.id, 10); // Convierte el ID a número entero
          const fragranceInput = req.body; // Obtiene los datos de la fragancia desde el request
          const updatedFragrance = await fragranceService.updateFragrance(fragranceId, fragranceInput); // Llama al servicio para actualizar
          res.status(200).json(updatedFragrance); // Respuesta con la fragancia actualizada
        } catch (error) {
          console.error('Error in method updateFragrance:', error); // Mensaje de error en consola
          // Manejo de error si la fragancia no existe
          if(error instanceof Error && error.message === 'Fragrance not found'){
            res.status(404).json({message: 'Fragrance not found'}); // Retorna error 404
            return;
        }
          res.status(500).json({message: 'Internal server error', error}); // Manejo de error interno
        }
      }
}