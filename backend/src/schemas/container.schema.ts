import { object, string } from 'zod';

export const containerSchema = object({
  name: string({ required_error: 'Name is required' }),
  material: string({ required_error: 'Material is required' }),
  description: string({ required_error: 'Description is required' }),
});