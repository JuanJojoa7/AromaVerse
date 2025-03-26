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
exports.FragranceController = void 0;
const services_1 = require("../../services");
const fragranceService = new services_1.FragranceService();
class FragranceController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("fragrance controller");
                const newFragrance = yield fragranceService.createFragrance(req.body);
                res.status(201).json(newFragrance);
            }
            catch (error) {
                if (error instanceof Error && error.message === 'Fragrance already exists') {
                    res.status(400).json({ message: 'Fragrance already exists' });
                    return;
                }
                res.status(500).json({ message: 'Internal server error', error });
            }
        });
    }
    getAllFragrances(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fragrances = yield fragranceService.findAll();
                res.status(200).json(fragrances);
            }
            catch (error) {
                res.status(500).json({ message: 'Internal server error', error });
            }
        });
    }
    deleteFragrance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fragrance = yield fragranceService.deleteFragrance(Number(req.params.id));
                res.status(200).json(fragrance);
            }
            catch (error) {
                console.error('Error in method deleteFragrance:', error);
                if (error instanceof Error && error.message === 'Fragrance not found') {
                    res.status(404).json({ message: 'Fragrance not found' });
                    return;
                }
                res.status(500).json({ message: 'Internal server error', error });
            }
        });
    }
    updateFragrance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fragranceId = parseInt(req.params.id, 10);
                const fragranceInput = req.body;
                const updatedFragrance = yield fragranceService.updateFragrance(fragranceId, fragranceInput);
                res.status(200).json(updatedFragrance);
            }
            catch (error) {
                console.error('Error in method updateFragrance:', error);
                if (error instanceof Error && error.message === 'Fragrance not found') {
                    res.status(404).json({ message: 'Fragrance not found' });
                    return;
                }
                res.status(500).json({ message: 'Internal server error', error });
            }
        });
    }
}
exports.FragranceController = FragranceController;
