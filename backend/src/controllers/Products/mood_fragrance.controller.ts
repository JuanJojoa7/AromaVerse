import { Request, Response } from 'express';
import { Mood_Fragrance_Service } from '../../services';


const mood_Fragrance_Service = new Mood_Fragrance_Service();

export class Mood_Fragrance_Controller {

    public async getFragranceWithMoods(req: Request, res: Response): Promise<void>{
        try {
            const fragrance = await mood_Fragrance_Service.getFragranceWithMoods(Number(req.params.id));
            res.status(200).json(fragrance);
        } catch (error) {
            res.status(500).json({message: 'Internal server error', error});
        }
    }

    public async getMoodWithFragrances(req: Request, res: Response): Promise<void>{
        try {
            const mood = await mood_Fragrance_Service.getMoodWithFragrances(Number(req.params.id));
            res.status(200).json(mood);
        } catch (error) {
            res.status(500).json({message: 'Internal server error', error});
        }
    }

    public async linkMoodToFragrance(req: Request, res: Response): Promise<void>{
        try {
            const moodId = Number(req.params.moodId);
            const fragranceId = Number(req.params.fragranceId);
            const mood = await mood_Fragrance_Service.linkMoodToFragrance(moodId, fragranceId);
            res.status(200).json(mood);
        } catch (error) {
            if(error instanceof Error && error.message === 'Mood or Fragrance not found'){
                res.status(404).json({message: 'Mood or Fragrance not found'});
                return;
            }
            console.error('Error in method linkMoodToFragrance:', error);
            res.status(500).json({message: 'Internal server error', error});
        }
    }

    public async unlinkMoodFromFragrance(req: Request, res: Response): Promise<void>{
        try {
            const moodId = Number(req.params.moodId);
            const fragranceId = Number(req.params.fragranceId);
            const mood = await mood_Fragrance_Service.unlinkMoodFromFragrance(moodId, fragranceId);
            res.status(200).json(mood);
        } catch (error) {
            if(error instanceof Error && error.message === 'Mood or Fragrance not found'){
                res.status(404).json({message: 'Mood or Fragrance not found'});
                return;
            }
            console.error('Error in method unlinkMoodFromFragrance:', error);
            res.status(500).json({message: 'Internal server error', error});
        }
    }
}