import { Request, Response } from 'express';
import { ContainerService } from '../../services';


const containerService = new ContainerService();

export class ContainerController {

  public async create(req: Request, res: Response): Promise<void>{
    console.log("container controller")
    try {
      const newContainer = await containerService.createContainer(req.body);
      res.status(201).json(newContainer);

    } catch (error) {
      //console.error('Error capturado en elm controlador:', error); // Log de depuración
      if(error instanceof Error && error.message === 'container already exists'){
        res.status(400).json({message: 'User already exists'});
        return;
      }
      //console.error('Error in method create:', error);
      res.status(500).json({message: 'Internal server errorrrrr', error});
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
      const container = await containerService.deleteContainer(Number(req.params.id));
      res.status(200).json(container);
    } catch (error) {
        console.error('Error in method deleteContainer:', error);
        if(error instanceof Error && error.message === 'Container not found'){
          res.status(404).json({message: 'Container not found'});
          return;
        }
        res.status(500).json({message: 'Internal server error', error});
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