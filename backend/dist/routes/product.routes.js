"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const middlewares_2 = require("../middlewares");
const middlewares_3 = require("../middlewares");
const schemas_1 = require("../schemas");
const productRouter = express_1.default.Router();
const containerController = new controllers_1.ContainerController();
const fragranceController = new controllers_1.FragranceController();
const moodController = new controllers_1.MoodController();
const mood_Fragrance_Controller = new controllers_1.Mood_Fragrance_Controller();
//CONTAINER ROUTES
//Crear Contenedor
productRouter.post('/container', middlewares_2.auth, (0, middlewares_1.authorizeRole)(['admin', 'customer']), (0, middlewares_3.validateSchema)(schemas_1.containerSchema), (req, res) => containerController.create(req, res));
//Traer todos los contenedores
productRouter.get('/container', middlewares_2.auth, (0, middlewares_1.authorizeRole)(['admin', 'customer']), (req, res) => containerController.getAllContainers(req, res));
//Eliminar un contenedor por ID
productRouter.delete('/container/:id', middlewares_2.auth, (0, middlewares_1.authorizeRole)(['admin', 'customer']), (req, res) => containerController.deleteContainer(req, res));
//Actualizar un contenedor por ID
productRouter.put('/container/:id', middlewares_2.auth, (0, middlewares_1.authorizeRole)(['admin', 'customer']), (req, res) => containerController.updateContainer(req, res));
//----------------------------------------------
//FRAGRANCE ROUTES
//Crear Fragancia
productRouter.post('/fragrance', middlewares_2.auth, (0, middlewares_1.authorizeRole)(['admin', 'customer']), (0, middlewares_3.validateSchema)(schemas_1.fragranceSchema), (req, res) => fragranceController.create(req, res));
//Traer todas las fragancias
productRouter.get('/fragrance', middlewares_2.auth, (0, middlewares_1.authorizeRole)(['admin', 'customer', 'public']), (req, res) => fragranceController.getAllFragrances(req, res));
//Eliminar una fragancia por ID
productRouter.delete('/fragrance/:id', middlewares_2.auth, (0, middlewares_1.authorizeRole)(['admin', 'customer']), (req, res) => fragranceController.deleteFragrance(req, res));
//Actualizar una fragancia por ID
productRouter.put('/fragrance/:id', middlewares_2.auth, (0, middlewares_1.authorizeRole)(['admin', 'customer']), (req, res) => fragranceController.updateFragrance(req, res));
//----------------------------------------------
//MOOD ROUTES
//Crear Mood
productRouter.post('/mood', middlewares_2.auth, (0, middlewares_1.authorizeRole)(['admin', 'customer']), (0, middlewares_3.validateSchema)(schemas_1.moodSchema), (req, res) => moodController.create(req, res));
//Traer todos los Moods
productRouter.get('/mood', middlewares_2.auth, (0, middlewares_1.authorizeRole)(['admin', 'customer']), (req, res) => moodController.getAllMoods(req, res));
//Eliminar un Mood por ID
productRouter.delete('/mood/:id', middlewares_2.auth, (0, middlewares_1.authorizeRole)(['admin', 'customer']), (req, res) => moodController.deleteMood(req, res));
//Actualizar un mood por ID
productRouter.put('/mood/:id', middlewares_2.auth, (0, middlewares_1.authorizeRole)(['admin', 'customer']), (req, res) => moodController.updateMood(req, res));
//----------------------------------------------
//MOOD_FRAGRANCE ROUTES
//Link Mood_Fragrance
productRouter.post('/mood_fragrance', middlewares_2.auth, (0, middlewares_1.authorizeRole)(['admin', 'customer']), (0, middlewares_3.validateSchema)(schemas_1.moodFragranceSchema), (req, res) => mood_Fragrance_Controller.linkMoodToFragrance(req, res));
//Traer todos los Mood basados en Fragrance
productRouter.get('/mood_fragrance/f/:id', middlewares_2.auth, (0, middlewares_1.authorizeRole)(['admin', 'customer']), (req, res) => mood_Fragrance_Controller.getFragranceWithMoods(req, res));
//Traer todos los Fragrance basados en Mood
productRouter.get('/mood_fragrance/m/:id', middlewares_2.auth, (0, middlewares_1.authorizeRole)(['admin', 'customer']), (req, res) => mood_Fragrance_Controller.getMoodWithFragrances(req, res));
//Unlink Mood_Fragrance
productRouter.delete('/unlink', middlewares_2.auth, (0, middlewares_1.authorizeRole)(['admin', 'customer']), (0, middlewares_3.validateSchema)(schemas_1.moodFragranceSchema), (req, res) => mood_Fragrance_Controller.unlinkMoodFromFragrance(req, res));
//----------------------------------------------
exports.default = productRouter;
