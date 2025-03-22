import { object, number } from 'zod';

export const moodFragranceSchema = object({
  moodId: number({ required_error: "MoodId is required"}),
  fragranceId: number({ required_error: "Fragrance is required"})
});


