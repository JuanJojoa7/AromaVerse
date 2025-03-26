import { Request, Response } from 'express';
import { UserService } from '../../services';
import { AuthError } from '../../exceptions';

// Se crea una instancia del servicio de usuarios
const userService = new UserService();

// Controlador para gestionar los usuarios en la API
export class UserController {

  // Método para crear un nuevo usuario
  public async create(req: Request, res: Response): Promise<void>{
    try {
      const newUser = await userService.createUser(req.body); // Crea un usuario con los datos proporcionados
      res.status(201).json(newUser); // Responde con el usuario creado

    } catch (error) {
      // Manejo de error si el usuario ya existe
      if(error instanceof Error && error.message === 'user already exists'){
        res.status(400).json({message: 'User already exists'});
        return;
      }
      res.status(500).json({message: 'Internal server errorrrrr', error}); // Manejo de error interno
    }
  }

  // Método para obtener todos los usuarios registrados
  public async getAllUsers(req: Request, res: Response): Promise<void>{
    try {
      const users = await userService.findAll(); // Obtiene todos los usuarios registrados
      res.status(200).json(users); // Responde con la lista de usuarios
    } catch (error) {
      console.error('Error in method getAllUsers:', error); // Log del error
      res.status(500).json({message: 'Internal server error', error}); // Manejo de error interno
    }
  }

  // Método para eliminar un usuario por su ID
  public async deleteUser(req: Request, res: Response): Promise<void>{
    try {
      const userId = parseInt(req.params.id, 10); // Convierte el ID a número entero
      const deletedUser = await userService.deleteUser(userId); // Llama al servicio para eliminar el usuario
      res.status(200).json(deletedUser); // Responde con el usuario eliminado
    } catch (error) {
      console.error('Error in method deleteUser:', error); // Log del error
      // Manejo de error si el usuario no existe
      if(error instanceof Error && error.message === 'User not found'){
        res.status(404).json({message: 'User not found'});
        return;
      }
      res.status(500).json({message: 'Internal server error', error}); // Manejo de error interno
    }
  }

  // Método para actualizar los datos de un usuario
  public async updateUser(req: Request, res: Response): Promise<void>{
    try {
      const userId = parseInt(req.params.id, 10); // Convierte el ID a número entero
      const userInput = { ...req.body }; // Obtiene los datos del usuario desde el request
      
      console.log(userInput); // Log para verificar los datos recibidos
      delete userInput.loggedUser; // Se elimina la propiedad loggedUser si está presente
      console.log(userInput); // Log después de eliminar loggedUser
      
      const updatedUser = await userService.updateUser(userId, userInput); // Llama al servicio para actualizar el usuario
      
      // Elimina la contraseña del usuario actualizado antes de enviarla en la respuesta
      if(updatedUser.password){
        delete updatedUser.password;
      }
      res.status(200).json(updatedUser); // Responde con el usuario actualizado

    } catch (error) {
      console.error('Error in method updateUser:', error); // Log del error
      // Manejo de error si el usuario no existe
      if(error instanceof Error && error.message === 'User not found'){
        res.status(404).json({message: 'User not found'});
        return;
      }
      res.status(500).json({message: 'Internal server error', error}); // Manejo de error interno
    }
  }

  // Método para iniciar sesión (Login)
  public async login(req: Request, res: Response): Promise<void>{
    try {
      const resObj = await userService.login(req.body); // Llama al servicio de autenticación
      res.status(200).json(resObj); // Responde con el token y la información del usuario autenticado
    } catch (error) {
      console.error('Error Login', error); // Log del error
      // Manejo de error si las credenciales son incorrectas
      if(error instanceof AuthError){
        res.status(401).json({ message: error.message });
        return;
      }
      res.status(500).json({ message: 'Internal server Error', error }); // Manejo de error interno
    }
  }
}
