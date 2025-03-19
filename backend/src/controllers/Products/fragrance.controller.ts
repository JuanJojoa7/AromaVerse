import { Request, Response } from 'express';
import { FragranceService } from '../../services';


const fragranceService = new FragranceService();

export class FragranceController {
    
    public async create(req: Request, res: Response): Promise<void>{
        try {
            console.log("fragrance controller")
            const newFragrance = await fragranceService.createFragrance(req.body);
            res.status(201).json(newFragrance);
        } catch (error) {
            if(error instanceof Error && error.message === 'Fragrance already exists'){
                res.status(400).json({message: 'Fragrance already exists'});
                return;
            }
            res.status(500).json({message: 'Internal server error', error});
        }
    }

    public async getAllFragrances(req: Request, res: Response): Promise<void>{
        try {
            const fragrances = await fragranceService.findAll();
            res.status(200).json(fragrances);
        } catch (error) {
            res.status(500).json({message: 'Internal server error', error});
        }
    }

    public async deleteFragrance(req: Request, res: Response): Promise<void>{
        try {
            const fragrance = await fragranceService.deleteFragrance(Number(req.params.id));
            res.status(200).json(fragrance);
        } catch (error) {
            console.error('Error in method deleteFragrance:', error);
            if(error instanceof Error && error.message === 'Fragrance not found'){
                res.status(404).json({message: 'Fragrance not found'});
                return;
            }
            res.status(500).json({message: 'Internal server error', error});
        }
    }


}