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
exports.Mood_Fragrance_Controller = void 0;
const services_1 = require("../../services");
const mood_Fragrance_Service = new services_1.Mood_Fragrance_Service();
class Mood_Fragrance_Controller {
    getFragranceWithMoods(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fragrance = yield mood_Fragrance_Service.getFragranceWithMoods(Number(req.params.id));
                res.status(200).json(fragrance);
            }
            catch (error) {
                res.status(500).json({ message: 'Internal server error', error });
            }
        });
    }
    getMoodWithFragrances(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mood = yield mood_Fragrance_Service.getMoodWithFragrances(Number(req.params.id));
                res.status(200).json(mood);
            }
            catch (error) {
                res.status(500).json({ message: 'Internal server error', error });
            }
        });
    }
    linkMoodToFragrance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { moodId, fragranceId } = req.body;
                if (!Number.isInteger(moodId) || !Number.isInteger(fragranceId)) {
                    res.status(400).json({ message: 'Invalid mood or fragranceId' });
                    return;
                }
                const relation = yield mood_Fragrance_Service.linkMoodToFragrance(moodId, fragranceId);
                res.status(200).json(relation);
            }
            catch (error) {
                if (error instanceof Error && error.message === 'Mood or Fragrance not found') {
                    res.status(404).json({ message: 'Mood or Fragrance not found' });
                    return;
                }
                console.error('Error in method linkMoodToFragrance:', error);
                res.status(500).json({ message: 'Internal server error', error });
            }
        });
    }
    unlinkMoodFromFragrance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { moodId, fragranceId } = req.body;
                if (!Number.isInteger(moodId) || !Number.isInteger(fragranceId)) {
                    res.status(400).json({ message: 'Invalid moodId or fragranceId' });
                    return;
                }
                const relation = yield mood_Fragrance_Service.unlinkMoodFromFragrance(moodId, fragranceId);
                res.status(200).json(relation);
            }
            catch (error) {
                console.error('Error en unlinkMoodFromFragrance:', error);
                if (error instanceof Error && error.message === 'Mood or Fragrance not found') {
                    res.status(404).json({ message: 'Mood or Fragrance not found' });
                    return;
                }
                console.error('Error in method unlinkMoodFromFragrance:', error);
                res.status(500).json({ message: 'Internal server error', error });
            }
        });
    }
}
exports.Mood_Fragrance_Controller = Mood_Fragrance_Controller;
