import { Request, Response } from 'express';
import { UserService } from '../../services';
import { AuthError } from '../../exceptions';


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

  public async updateUser(req: Request, res: Response): Promise<void>{
    try {
      const userId = parseInt(req.params.id, 10);
      //const loggedUser = req.body.loggedUser;
      const userInput = { ...req.body}
      
      console.log(userInput);
      delete userInput.loggedUser;
      console.log(userInput);
      
      const updatedUser = await userService.updateUser(userId, userInput);
      

      //Elimino la contraseña del usuario actualizado
      if(updatedUser.password){
        delete updatedUser.password;
      }
      res.status(200).json(updatedUser);

    } catch (error) {
      console.error('Error in method updateUser:', error);
      if(error instanceof Error && error.message === 'User not found'){
        res.status(404).json({message: 'User not found'});
        return;
      }
      res.status(500).json({message: 'Internal server error', error});
    }
  }

  //Metodo Login
  public async login(req: Request, res: Response): Promise<void>{
    try {
      const resObj = await userService.login(req.body);
      res.status(200).json(resObj);
    } catch (error) {
      console.error('Error Login', error);
      if(error instanceof AuthError){
        res.status(401).json({ message: error.message})
        return;
      }
      res.status(500).json({ message: 'Internal server Error', error})
    }
  }
}