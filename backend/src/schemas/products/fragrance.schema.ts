import { object, string } from 'zod';

export const fragranceSchema = object({
  name: string({ required_error: 'Name is required' }).min(1, {message: 'Name cannot be empty'}),
  description: string({ required_error: 'Description is required' }).min(1, {message: 'Description cannot be empty'}),
  associatedColor: string({ required_error: 'Color is required'}).min(1, {message: 'Color cannot be empty'})
});


