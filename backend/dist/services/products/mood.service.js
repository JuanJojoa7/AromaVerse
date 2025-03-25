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
exports.MoodService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class MoodService {
    createMood(UserInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newMood = yield prisma.mood.create({
                    data: {
                        name: UserInput.name,
                        description: UserInput.description,
                    }
                });
                return newMood;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const moods = yield prisma.mood.findMany();
                return moods;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mood = yield prisma.mood.findUnique({
                    where: { id },
                });
                if (!mood) {
                    throw new Error('Mood not found');
                }
                return mood;
            }
            catch (error) {
                console.error('Error al buscar el mood:', error);
                throw error;
            }
        });
    }
    deleteMood(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ((yield this.findByID(id)) === null) {
                    throw new Error('Mood not found');
                }
                const mood = yield prisma.mood.delete({
                    where: {
                        id: id
                    }
                });
                return mood;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateMood(id, UserInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mood = yield prisma.mood.update({
                    where: { id },
                    data: {
                        name: UserInput.name,
                        description: UserInput.description,
                    }
                });
                return mood;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.MoodService = MoodService;
