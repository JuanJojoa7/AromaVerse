import { Request, Response } from 'express';
import { ContainerService } from './../../services/index';
import { validateSchema } from '../../middlewares';
import { containerSchema } from '../../schemas/products/container.schema'; //No se porque me toco importarlo asi, despues lo pregunto con el profe


const containerService = new ContainerService();

export class ContainerController {


  public async create(req: Request, res: Response): Promise<void>{
    console.log("container controller")
    try {
      const containerData = req.body;
      await validateSchema(containerSchema)(req, res, ()  => {});

      const newContainer = await containerService.createContainer(req.body);
      res.status(201).json(newContainer);

    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Name is required' || error.message === 'Material is required' || error.message === 'Description is required') {
          res.status(400).json({ message: error.message });
          return;
        }
      }
    }
  }

  public async getAllContainers(req: Request, res: Response): Promise<void>{
    try {
      const containers = await containerService.findAll();
      res.status(200).json(containers);
    } catch (error) {
      res.status(500).json({message: 'Internal server error', error});
    }
  }

  public async deleteContainer(req: Request, res: Response): Promise<void>{
    try {
      const { id } = req.params;
      if(!Number.isInteger(Number(id))){
        res.status(400).json({ message: 'Invalid ID'})
        return;
      }
      const container = await containerService.deleteContainer(Number(req.params.id));
      res.status(200).json(container);
    } catch (error) {
        console.error('Error in method deleteContainer:', error);
        if(error instanceof Error && error.message === 'Container not found'){
          res.status(404).json({message: 'Container not found'});
          return;
        }
    }
  }

  public async updateContainer(req: Request, res: Response): Promise<void>{
    try {
      const containerId = parseInt(req.params.id, 10);
      const containerInput = req.body;
      const updatedContainer = await containerService.updateContainer(containerId, containerInput);
      res.status(200).json(updatedContainer);
    } catch (error) {
      console.error('Error in method updateContainer:', error);
      if(error instanceof Error && error.message === 'Container not found'){
        res.status(404).json({message: 'Container not found'});
        return;
    }
      res.status(500).json({message: 'Internal server error', error});
    }
  }

}