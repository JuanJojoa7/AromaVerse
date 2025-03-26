import { Request, Response } from 'express';
import { ContainerService } from './../../services/index';
import { validateSchema } from '../../middlewares';
import { containerSchema } from '../../schemas/products/container.schema'; // No se porque me toco importarlo asi, despues lo pregunto con el profe

// Instancia del servicio de contenedores
const containerService = new ContainerService();

// Controlador para gestionar los contenedores de velas
export class ContainerController {

  // Método para crear un nuevo contenedor
  public async create(req: Request, res: Response): Promise<void>{
    console.log("container controller") // Log para verificar la ejecución del método
    try {
      const containerData = req.body; // Extrae los datos del cuerpo de la petición
      
      // Valida los datos con el esquema definido
      await validateSchema(containerSchema)(req, res, ()  => {});

      // Llama al servicio para crear el contenedor
      const newContainer = await containerService.createContainer(req.body);
      res.status(201).json(newContainer); // Responde con el contenedor creado
    
    } catch (error) {
      // Manejo de errores específicos relacionados con los datos requeridos
      if (error instanceof Error) {
        if (error.message === 'Name is required' || error.message === 'Material is required' || error.message === 'Description is required') {
          res.status(400).json({ message: error.message }); // Retorna error 400 si falta un campo obligatorio
          return;
        }
      }
    }
  }

  // Método para obtener todos los contenedores
  public async getAllContainers(req: Request, res: Response): Promise<void>{
    try {
      const containers = await containerService.findAll(); // Obtiene todos los contenedores desde el servicio
      res.status(200).json(containers); // Responde con la lista de contenedores
    } catch (error) {
      res.status(500).json({message: 'Internal server error', error}); // Manejo de error interno
    }
  }

  // Método para eliminar un contenedor por su ID
  public async deleteContainer(req: Request, res: Response): Promise<void>{
    try {
      const { id } = req.params; // Extrae el ID de la URL
      
      // Verifica si el ID es un número válido
      if(!Number.isInteger(Number(id))){
        res.status(400).json({ message: 'Invalid ID'}) // Retorna error si el ID no es válido
        return;
      }

      // Llama al servicio para eliminar el contenedor
      const container = await containerService.deleteContainer(Number(req.params.id));
      res.status(200).json(container); // Responde con el contenedor eliminado
    } catch (error) {
        console.error('Error in method deleteContainer:', error); // Log del error
        
        // Manejo de error si el contenedor no existe
        if(error instanceof Error && error.message === 'Container not found'){
          res.status(404).json({message: 'Container not found'});
          return;
        }
    }
  }

  // Método para actualizar un contenedor existente
  public async updateContainer(req: Request, res: Response): Promise<void>{
    try {
      const containerId = parseInt(req.params.id, 10); // Convierte el ID a número entero
      const containerInput = req.body; // Obtiene los datos de actualización desde el cuerpo de la petición

      // Llama al servicio para actualizar el contenedor
      const updatedContainer = await containerService.updateContainer(containerId, containerInput);
      res.status(200).json(updatedContainer); // Retorna el contenedor actualizado
    } catch (error) {
      console.error('Error in method updateContainer:', error); // Log del error
      
      // Manejo de error si el contenedor no existe
      if(error instanceof Error && error.message === 'Container not found'){
        res.status(404).json({message: 'Container not found'});
        return;
      }
      
      res.status(500).json({message: 'Internal server error', error}); // Manejo de error general
    }
  }

}