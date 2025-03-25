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
exports.ContainerService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ContainerService {
    createContainer(UserInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newContainer = yield prisma.container.create({
                    data: {
                        name: UserInput.name,
                        material: UserInput.material,
                        description: UserInput.description,
                    },
                });
                return newContainer;
            }
            catch (error) {
                console.error('Error al crear el contenedor:', error);
                throw error;
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const containers = yield prisma.container.findMany();
                return containers;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const container = yield prisma.container.findUnique({
                    where: { id },
                });
                if (!container) {
                    throw new Error('Container not found');
                }
                return container;
            }
            catch (error) {
                console.error('Error al buscar el contenedor:', error);
                throw error;
            }
        });
    }
    deleteContainer(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ((yield this.findByID(id)) === null) {
                    throw new Error('Container not found');
                }
                const container = yield prisma.container.delete({
                    where: {
                        id: id
                    }
                });
                return container;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateContainer(id, UserInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const container = yield prisma.container.update({
                    where: { id },
                    data: {
                        name: UserInput.name,
                        material: UserInput.material,
                        description: UserInput.description,
                    }
                });
                return container;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.ContainerService = ContainerService;
