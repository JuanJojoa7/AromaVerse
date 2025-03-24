import { object, string } from 'zod';

export const containerSchema = object({
  name: string({ required_error: 'Name is required' }).min(1, {message: 'Name cannot be empty'}),
  material: string({ required_error: 'Material is required' }).min(1, {message: 'Material cannot be empty'}),
  description: string({ required_error: 'Description is required' }).min(1, {message: 'Description cannot be empty'}),
});