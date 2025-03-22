import { object, string } from 'zod';

export const fragranceSchema = object({
  name: string({ required_error: 'Name is required' }),
  description: string({ required_error: 'Description is required' }),
  associatedColor: string({ required_error: 'Color is required'}),

});


