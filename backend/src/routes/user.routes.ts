import express from 'express';
import { UserController } from '../controllers';
import { authorizeRole } from '../middlewares';
import { auth } from '../middlewares';
import { validateSchema } from '../middlewares';
import { userSchema, userLoginSchema } from '../schemas';

const userRouter = express.Router();
const userController = new UserController();

//Crear un usuario
userRouter.post('/',validateSchema(userSchema), (req, res)=> userController.create(req, res));

//Traer todos los usuarios
userRouter.get('/', (req, res)=> userController.getAllUsers(req, res));

//Eliminar un usuario por ID
userRouter.delete('/:id',auth, authorizeRole(['admin']), (req, res)=> userController.deleteUser(req, res));

//Actualizar un usuario por ID
userRouter.put('/:id',auth, authorizeRole(['admin', 'customer']), (req, res)=> userController.updateUser(req, res));

//Login
userRouter.post('/login', validateSchema(userLoginSchema), (req, res) => userController.login(req, res));

export default userRouter;