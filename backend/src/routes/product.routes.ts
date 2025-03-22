import express from 'express';
import { ContainerController, FragranceController, MoodController, Mood_Fragrance_Controller } from '../controllers';
import { authorizeRole } from '../middlewares';
import { auth } from '../middlewares';
import { validateSchema } from '../middlewares';
import { containerSchema, fragranceSchema, moodSchema, moodFragranceSchema } from '../schemas';


const productRouter = express.Router();
const containerController = new ContainerController();
const fragranceController = new FragranceController();
const moodController = new MoodController();
const mood_Fragrance_Controller = new Mood_Fragrance_Controller();



//CONTAINER ROUTES

//Crear Contenedor
productRouter.post('/container', auth, authorizeRole(['admin', 'customer']), validateSchema(containerSchema), (req, res) => containerController.create(req, res));

//Traer todos los contenedores
productRouter.get('/container', auth, authorizeRole(['admin, customer']),  (req, res)=> containerController.getAllContainers(req, res));

//Eliminar un contenedor por ID
productRouter.delete('/container/:id', auth, authorizeRole(['admin', 'customer']), (req, res)=> containerController.deleteContainer(req, res));

//Actualizar un contenedor por ID
productRouter.put('/container/:id', auth, authorizeRole(['admin', 'customer']), (req, res)=> containerController.updateContainer(req, res));

//----------------------------------------------

//FRAGRANCE ROUTES

//Crear Fragancia
productRouter.post('/fragrance', auth, authorizeRole(['admin', 'customer']), validateSchema(fragranceSchema), (req, res)=> fragranceController.create(req, res));

//Traer todas las fragancias
productRouter.get('/fragrance', auth, authorizeRole(['admin', 'customer', 'public']), (req, res)=> fragranceController.getAllFragrances(req, res));

//Eliminar una fragancia por ID
productRouter.delete('/fragrance/:id',auth, authorizeRole(['admin', 'customer']), (req, res)=> fragranceController.deleteFragrance(req, res));

//Actualizar una fragancia por ID
productRouter.put('/fragrance/:id', auth, authorizeRole(['admin', 'customer']), (req, res)=> fragranceController.updateFragrance(req, res));

//----------------------------------------------

//MOOD ROUTES

//Crear Mood
productRouter.post('/mood',auth,  authorizeRole(['admin', 'customer']),validateSchema(moodSchema), (req, res)=> moodController.create(req, res));

//Traer todos los Moods
productRouter.get('/mood',auth, authorizeRole(['admin', 'customer']), (req, res)=> moodController.getAllMoods(req, res));

//Eliminar un Mood por ID
productRouter.delete('/mood/:id',auth, authorizeRole(['admin', 'customer']), (req, res)=> moodController.deleteMood(req, res));

//Actualizar un mood por ID
productRouter.put('/mood/:id', auth, authorizeRole(['admin', 'customer']),(req, res)=> moodController.updateMood(req, res));

//----------------------------------------------

//MOOD_FRAGRANCE ROUTES

//Link Mood_Fragrance
productRouter.post('/mood_fragrance', auth, authorizeRole(['admin', 'customer']), validateSchema(moodFragranceSchema), (req, res)=> mood_Fragrance_Controller.linkMoodToFragrance(req, res));

//Traer todos los Mood basados en Fragrance
productRouter.get('/mood_fragrance/f/:id',auth, authorizeRole(['admin', 'customer']),   (req, res)=> mood_Fragrance_Controller.getFragranceWithMoods(req, res));

//Traer todos los Fragrance basados en Mood
productRouter.get('/mood_fragrance/m/:id',auth, authorizeRole(['admin', 'customer']), (req, res)=> mood_Fragrance_Controller.getMoodWithFragrances(req, res));

//Unlink Mood_Fragrance
productRouter.delete('/unlink',auth, authorizeRole(['admin', 'customer']),validateSchema(moodFragranceSchema), (req, res)=> mood_Fragrance_Controller.unlinkMoodFromFragrance(req, res));

//----------------------------------------------


export default productRouter;