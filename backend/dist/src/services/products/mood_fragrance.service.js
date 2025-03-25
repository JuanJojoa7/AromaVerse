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
exports.Mood_Fragrance_Service = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class Mood_Fragrance_Service {
    // Get list of Moods associated with a Fragrance
    getFragranceWithMoods(fragranceId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fragrance = yield prisma.fragrance.findUnique({
                    where: { id: fragranceId },
                    include: {
                        moodFragrances: {
                            include: {
                                mood: true,
                            },
                        },
                    },
                });
                if (!fragrance || !fragrance.moodFragrances || fragrance.moodFragrances.length === 0)
                    return null;
                return fragrance.moodFragrances.map(mf => mf.mood);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Get list of Fragrances associated with a Mood
    getMoodWithFragrances(moodId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mood = yield prisma.mood.findUnique({
                    where: { id: moodId },
                    include: {
                        moodFragrances: {
                            include: {
                                fragrance: true,
                            },
                        },
                    },
                });
                if (!mood || !mood.moodFragrances)
                    return null;
                return mood.moodFragrances.map(mf => mf.fragrance);
            }
            catch (error) {
                throw error;
            }
        });
    }
    linkMoodToFragrance(moodId, fragranceId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mood = yield prisma.mood.findUnique({
                    where: { id: moodId },
                });
                if (!mood) {
                    throw new Error('Mood not found');
                }
                const fragrance = yield prisma.fragrance.findUnique({
                    where: { id: fragranceId },
                });
                if (!fragrance) {
                    throw new Error('Fragrance not found');
                }
                const relation = yield prisma.mood_Fragrance.create({
                    data: {
                        moodId,
                        fragranceId,
                    },
                });
                return relation;
            }
            catch (error) {
                console.error('Error en linkMoodToFragrance:', error);
                throw error;
            }
        });
    }
    unlinkMoodFromFragrance(moodId, fragranceId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mood = yield prisma.mood.findUnique({
                    where: { id: moodId },
                });
                if (!mood) {
                    throw new Error('Mood not found');
                }
                const fragrance = yield prisma.fragrance.findUnique({
                    where: { id: fragranceId },
                });
                if (!fragrance) {
                    throw new Error('Fragrance not found');
                }
                const relation = yield prisma.mood_Fragrance.delete({
                    where: {
                        moodId_fragranceId: {
                            moodId,
                            fragranceId,
                        },
                    },
                });
                return relation;
            }
            catch (error) {
                console.error('Error en unlinkMoodFromFragrance:', error);
                throw error;
            }
        });
    }
}
exports.Mood_Fragrance_Service = Mood_Fragrance_Service;
