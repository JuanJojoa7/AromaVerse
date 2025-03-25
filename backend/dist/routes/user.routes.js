"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const middlewares_2 = require("../middlewares");
const middlewares_3 = require("../middlewares");
const schemas_1 = require("../schemas");
const userRouter = express_1.default.Router();
const userController = new controllers_1.UserController();
//Crear un usuario
userRouter.post('/', (0, middlewares_3.validateSchema)(schemas_1.userSchema), (req, res) => userController.create(req, res));
//Traer todos los usuarios
userRouter.get('/', (req, res) => userController.getAllUsers(req, res));
//Eliminar un usuario por ID
userRouter.delete('/:id', middlewares_2.auth, (0, middlewares_1.authorizeRole)(['admin']), (req, res) => userController.deleteUser(req, res));
//Actualizar un usuario por ID
userRouter.put('/:id', middlewares_2.auth, (0, middlewares_1.authorizeRole)(['admin']), (req, res) => userController.updateUser(req, res));
//Login
userRouter.post('/login', (0, middlewares_3.validateSchema)(schemas_1.userLoginSchema), (req, res) => userController.login(req, res));
exports.default = userRouter;
