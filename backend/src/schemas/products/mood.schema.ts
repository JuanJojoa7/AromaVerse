import { object, string } from 'zod';

export const moodSchema = object({
  name: string({ required_error: 'Name is required' }).min(1, {message: 'Name cannot be empty'}),
  description: string({ required_error: 'Description is required' }).min(1, {message: 'Description cannot be empty'}),
});


