import express from 'express';
import { UserController } from '../controllers';

const userRouter = express.Router();
const userController = new UserController();

//Crear un usuario
userRouter.post('/', (req, res)=> userController.create(req, res));

//Traer todos los usuarios
userRouter.get('/', (req, res)=> userController.getAllUsers(req, res));

//Eliminar un usuario por ID
userRouter.delete('/:id', (req, res)=> userController.deleteUser(req, res));

//Actualizar un usuario por ID
userRouter.put('/:id', (req, res)=> userController.updateUser(req, res));

//Login
userRouter.post('/login', (req, res) => userController.login(req, res));

export default userRouter;