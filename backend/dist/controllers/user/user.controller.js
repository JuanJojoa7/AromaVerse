"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const services_1 = require("../../services");
const exceptions_1 = require("../../exceptions");
const userService = new services_1.UserService();
class UserController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield userService.createUser(req.body);
                res.status(201).json(newUser);
            }
            catch (error) {
                //console.error('Error capturado en el controlador:', error); // Log de depuración
                if (error instanceof Error && error.message === 'user already exists') {
                    res.status(400).json({ message: 'User already exists' });
                    return;
                }
                //console.error('Error in method create:', error);
                res.status(500).json({ message: 'Internal server errorrrrr', error });
            }
        });
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userService.findAll();
                res.status(200).json(users);
            }
            catch (error) {
                console.error('Error in method getAllUsers:', error);
                res.status(500).json({ message: 'Internal server error', error });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.id, 10);
                const deletedUser = yield userService.deleteUser(userId); //Metodo del servicio
                res.status(200).json(deletedUser);
            }
            catch (error) {
                console.error('Error in method deleteUser:', error);
                if (error instanceof Error && error.message === 'User not found') {
                    res.status(404).json({ message: 'User not found' });
                    return;
                }
                res.status(500).json({ message: 'Internal server error', error });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.id, 10);
                //const loggedUser = req.body.loggedUser;
                const userInput = Object.assign({}, req.body);
                console.log(userInput);
                delete userInput.loggedUser;
                console.log(userInput);
                const updatedUser = yield userService.updateUser(userId, userInput);
                //Elimino la contraseña del usuario actualizado
                if (updatedUser.password) {
                    delete updatedUser.password;
                }
                res.status(200).json(updatedUser);
            }
            catch (error) {
                console.error('Error in method updateUser:', error);
                if (error instanceof Error && error.message === 'User not found') {
                    res.status(404).json({ message: 'User not found' });
                    return;
                }
                res.status(500).json({ message: 'Internal server error', error });
            }
        });
    }
    //Metodo Login
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resObj = yield userService.login(req.body);
                res.status(200).json(resObj);
            }
            catch (error) {
                console.error('Error Login', error);
                if (error instanceof exceptions_1.AuthError) {
                    res.status(401).json({ message: error.message });
                    return;
                }
                res.status(500).json({ message: 'Internal server Error', error });
            }
        });
    }
}
exports.UserController = UserController;
