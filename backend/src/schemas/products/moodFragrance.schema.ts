import { object, number } from 'zod';

export const moodFragranceSchema = object({
  moodId: number({ required_error: "MoodId is required"}).min(1, {message: 'MoodId cannot be empty'}),
  fragranceId: number({ required_error: "FragranceId is required"}).min(1, {message: 'FragranceId cannot be empty'})
});


