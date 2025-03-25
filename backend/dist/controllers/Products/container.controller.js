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
exports.ContainerController = void 0;
const index_1 = require("./../../services/index");
const middlewares_1 = require("../../middlewares");
const container_schema_1 = require("../../schemas/products/container.schema"); //No se porque me toco importarlo asi, despues lo pregunto con el profe
const containerService = new index_1.ContainerService();
class ContainerController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("container controller");
            try {
                const containerData = req.body;
                yield (0, middlewares_1.validateSchema)(container_schema_1.containerSchema)(req, res, () => { });
                const newContainer = yield containerService.createContainer(req.body);
                res.status(201).json(newContainer);
            }
            catch (error) {
                if (error instanceof Error) {
                    if (error.message === 'Name is required' || error.message === 'Material is required' || error.message === 'Description is required') {
                        res.status(400).json({ message: error.message });
                        return;
                    }
                }
            }
        });
    }
    getAllContainers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const containers = yield containerService.findAll();
                res.status(200).json(containers);
            }
            catch (error) {
                res.status(500).json({ message: 'Internal server error', error });
            }
        });
    }
    deleteContainer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!Number.isInteger(Number(id))) {
                    res.status(400).json({ message: 'Invalid ID' });
                    return;
                }
                const container = yield containerService.deleteContainer(Number(req.params.id));
                res.status(200).json(container);
            }
            catch (error) {
                console.error('Error in method deleteContainer:', error);
                if (error instanceof Error && error.message === 'Container not found') {
                    res.status(404).json({ message: 'Container not found' });
                    return;
                }
            }
        });
    }
    updateContainer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const containerId = parseInt(req.params.id, 10);
                const containerInput = req.body;
                const updatedContainer = yield containerService.updateContainer(containerId, containerInput);
                res.status(200).json(updatedContainer);
            }
            catch (error) {
                console.error('Error in method updateContainer:', error);
                if (error instanceof Error && error.message === 'Container not found') {
                    res.status(404).json({ message: 'Container not found' });
                    return;
                }
                res.status(500).json({ message: 'Internal server error', error });
            }
        });
    }
}
exports.ContainerController = ContainerController;
