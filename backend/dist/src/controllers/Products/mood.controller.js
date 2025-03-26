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
exports.MoodController = void 0;
const services_1 = require("../../services");
const moodService = new services_1.MoodService();
class MoodController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("mood controller");
                const newMood = yield moodService.createMood(req.body);
                res.status(201).json(newMood);
            }
            catch (error) {
                if (error instanceof Error && error.message === 'Mood already exists') {
                    res.status(400).json({ message: 'Mood already exists' });
                    return;
                }
                res.status(500).json({ message: 'Internal server error', error });
            }
        });
    }
    getAllMoods(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const moods = yield moodService.findAll();
                res.status(200).json(moods);
            }
            catch (error) {
                res.status(500).json({ message: 'Internal server error', error });
            }
        });
    }
    deleteMood(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mood = yield moodService.deleteMood(Number(req.params.id));
                res.status(200).json(mood);
            }
            catch (error) {
                console.error('Error in method deleteMood:', error);
                if (error instanceof Error && error.message === 'Mood not found') {
                    res.status(404).json({ message: 'Mood not found' });
                    return;
                }
                res.status(500).json({ message: 'Internal server error', error });
            }
        });
    }
    updateMood(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const moodId = parseInt(req.params.id, 10);
                const moodInput = req.body;
                const updatedMood = yield moodService.updateMood(moodId, moodInput);
                res.status(200).json(updatedMood);
            }
            catch (error) {
                console.error('Error in method updateMood:', error);
                if (error instanceof Error && error.message === 'Mood not found') {
                    res.status(404).json({ message: 'Mood not found' });
                    return;
                }
                res.status(500).json({ message: 'Internal server error', error });
            }
        });
    }
}
exports.MoodController = MoodController;
