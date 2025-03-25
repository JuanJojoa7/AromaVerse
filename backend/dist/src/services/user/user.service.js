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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const exceptions_1 = require("../../exceptions");
const prisma = new client_1.PrismaClient();
class UserService {
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.userAccount.findUnique({
                    where: {
                        email,
                    },
                });
            }
            catch (error) {
                console.error('Error al buscar el usuario por email:', error);
                throw error;
            }
        });
    }
    generateToken(id, email, role) {
        try {
            return jsonwebtoken_1.default.sign({ user: { id, email, role } }, process.env.JWT_SECRET || 'secret', { expiresIn: '50m' } //Cambiar valor al gusto
            );
        }
        catch (error) {
            console.error('Error en generateToken', error);
            throw error;
        }
    }
    login(userLogin) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userExists = yield this.findByEmail(userLogin.email);
                if (!userExists) {
                    throw new exceptions_1.AuthError('User not found');
                }
                const token = this.generateToken(userExists.id, userExists.email, userExists.role);
                return {
                    user: {
                        id: userExists.id,
                        name: userExists.name,
                        email: userExists.email,
                        role: userExists.role,
                    },
                    token,
                };
            }
            catch (error) {
                console.error('Error en login', error);
                throw error;
            }
        });
    }
    createUser(UserInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userExists = yield this.findByEmail(UserInput.email);
                if (userExists !== null) {
                    //console.error('User already existss');
                    throw new Error('User already exists');
                }
                if (UserInput.password) {
                    UserInput.password = yield bcrypt_1.default.hash(UserInput.password, 10);
                }
                const user = yield prisma.userAccount.create({
                    data: {
                        name: UserInput.name,
                        email: UserInput.email,
                        password: UserInput.password,
                        phone: UserInput.phone,
                        address: UserInput.address,
                        role: 'customer', // Rol por defecto que tenemos en la base de datos
                    },
                });
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    //Buscar todos los usuarios
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield prisma.userAccount.findMany();
                return users;
            }
            catch (error) {
                console.error('Error al buscar los usuarios:', error);
                throw error;
            }
        });
    }
    //Buscar un usuario por id
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prisma.userAccount.findUnique({
                    where: { id },
                });
                return user;
            }
            catch (error) {
                console.error('Error al buscar el usuario por id:', error);
                throw error;
            }
        });
    }
    //Eliminar un usuario
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.findById(id);
                if (!user) {
                    throw new Error('User not found');
                }
                yield prisma.userAccount.delete({
                    where: { id },
                });
                return user; //Aqui devuelve el usaurio eliminado
            }
            catch (error) {
                console.error('Error al eliminar el usuario:', error);
                throw error;
            }
        });
    }
    //Actualizar un usuario
    updateUser(id, userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userExists = yield this.findById(id);
                if (!userExists) {
                    throw new Error('User not found');
                }
                //Para encriptar la contraseña si se da una nueva
                if (userInput.password) {
                    userInput.password = yield bcrypt_1.default.hash(userInput.password, 10);
                }
                const updatedUser = yield prisma.userAccount.update({
                    where: { id },
                    data: userInput,
                });
                return updatedUser;
            }
            catch (error) {
                console.error('Error al actualizar el usuario:', error);
                throw error;
            }
        });
    }
}
exports.UserService = UserService;
