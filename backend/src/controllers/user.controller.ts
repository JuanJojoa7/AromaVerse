import { Request, Response } from 'express';
import { UserService } from '../services';


const userService = new UserService();

export class UserController {
  public async create(req: Request, res: Response): Promise<void>{
    try {
      const newUser = await userService.createUser(req.body);
      res.status(201).json(newUser);

    } catch (error) {
      if(error instanceof Error && error.message === 'user already exists'){
        res.status(400).json({message: error.message});
      }
      res.status(500).json({message: 'Internal server error'});
    }
  }
}