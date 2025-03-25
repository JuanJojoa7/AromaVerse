import { Request, Response } from 'express';
import { MoodService } from '../../services/products/mood.service';


const moodService = new MoodService();

export class MoodController {

    public async create(req: Request, res: Response): Promise<void>{
        try {
            console.log("mood controller")
            const newMood = await moodService.createMood(req.body);
            res.status(201).json(newMood);
        } catch (error) {
            if(error instanceof Error && error.message === 'Mood already exists'){
                res.status(400).json({message: 'Mood already exists'});
                return;
            }
            res.status(500).json({message: 'Internal server error', error});
        }
    }

    public async getAllMoods(req: Request, res: Response): Promise<void>{
        try {
            const moods = await moodService.findAll();
            res.status(200).json(moods);
        } catch (error) {
            res.status(500).json({message: 'Internal server error', error});
        }
    }

    public async deleteMood(req: Request, res: Response): Promise<void>{
        try {
            const mood = await moodService.deleteMood(Number(req.params.id));
            res.status(200).json(mood);
        } catch (error) {
            console.error('Error in method deleteMood:', error);
            if(error instanceof Error && error.message === 'Mood not found'){
                res.status(404).json({message: 'Mood not found'});
                return;
            }
            res.status(500).json({message: 'Internal server error', error});
        }
    }

    public async updateMood(req: Request, res: Response): Promise<void>{
        try {
            const moodId = parseInt(req.params.id, 10);
            const moodInput = req.body;
            const updatedMood = await moodService.updateMood(moodId, moodInput);
            res.status(200).json(updatedMood);
        } catch (error) {
            console.error('Error in method updateMood:', error);
            if(error instanceof Error && error.message === 'Mood not found'){
                res.status(404).json({message: 'Mood not found'});
                return;
            }
            res.status(500).json({message: 'Internal server error', error});
        }
    }



}