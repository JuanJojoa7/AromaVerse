import { object, string } from 'zod';

export const moodSchema = object({
  name: string({ required_error: 'Name is required' }),
  description: string({ required_error: 'Description is required' }),
});


