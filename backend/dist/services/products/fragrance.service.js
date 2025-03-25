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
exports.FragranceService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class FragranceService {
    createFragrance(UserInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newFragrance = yield prisma.fragrance.create({
                    data: {
                        name: UserInput.name,
                        description: UserInput.description,
                        associatedColor: UserInput.associatedColor,
                    }
                });
                return newFragrance;
            }
            catch (error) {
                console.error('Error al crear la fragrance:', error);
                throw error;
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fragrances = yield prisma.fragrance.findMany();
                return fragrances;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fragrance = yield prisma.fragrance.findUnique({
                    where: { id },
                });
                if (!fragrance) {
                    throw new Error('Fragrance not found');
                }
                return fragrance;
            }
            catch (error) {
                console.error('Error al buscar la fragancia:', error);
                throw error;
            }
        });
    }
    deleteFragrance(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ((yield this.findByID(id)) === null) {
                    throw new Error('Fragrance not found');
                }
                const fragrance = yield prisma.fragrance.delete({
                    where: {
                        id: id
                    }
                });
                return fragrance;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateFragrance(id, UserInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fragrance = yield prisma.fragrance.update({
                    where: { id },
                    data: {
                        name: UserInput.name,
                        description: UserInput.description,
                        associatedColor: UserInput.associatedColor,
                    }
                });
                return fragrance;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.FragranceService = FragranceService;
