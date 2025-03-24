import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

export const validateSchema = (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      res.status(400).json(error);
      return;
    }
};