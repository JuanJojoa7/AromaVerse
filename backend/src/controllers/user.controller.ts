import { Request, Response } from 'express';
import { UserService } from '../services';


const userService = new UserService();

export class UserController {

  public async create(req: Request, res: Response): Promise<void>{
    try {
      const newUser = await userService.createUser(req.body);
      res.status(201).json(newUser);

    } catch (error) {
      //console.error('Error capturado en el controlador:', error); // Log de depuración
      if(error instanceof Error && error.message === 'user already exists'){
        res.status(400).json({message: 'User already exists'});
        return;
      }
      //console.error('Error in method create:', error);
      res.status(500).json({message: 'Internal server errorrrrr', error});
    }
  }

  public async getAllUsers(req: Request, res: Response): Promise<void>{
    try {
      const users = await userService.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error in method getAllUsers:', error);
      res.status(500).json({message: 'Internal server error', error});
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<void>{
    try {
      const userId = parseInt(req.params.id, 10);
      const deletedUser = await userService.deleteUser(userId); //Metodo del servicio
      res.status(200).json(deletedUser);
    } catch (error) {
      console.error('Error in method deleteUser:', error);
      if(error instanceof Error && error.message === 'User not found'){
        res.status(404).json({message: 'User not found'});
        return;
      }
      res.status(500).json({message: 'Internal server error', error});
    }
  }
}