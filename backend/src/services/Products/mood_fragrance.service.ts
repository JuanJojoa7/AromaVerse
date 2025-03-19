import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export class Mood_Fragrance_Service {

    // Get Fragrance with its associated Moods
  public async getFragranceWithMoods(fragranceId: number): Promise<any> {
    try {
      const fragrance = await prisma.fragrance.findUnique({
        where: { id: fragranceId },
        include: {
            moodFragrances: {
                include: {
                    mood: true,
                },
            }
        },
      });
      return fragrance;
    } catch (error) {
      throw error;
    }
  }

    // Get Mood with its associated Fragrances
    public async getMoodWithFragrances(moodId: number): Promise<any> {
        try {
          const mood = await prisma.mood.findUnique({
            where: { id: moodId },
            include: {
                moodFragrances: {
                    include: {
                        fragrance: true,
                    },
                }
            },
          });
          return mood;
        } catch (error) {
          throw error;
        }
    }

    public async linkMoodToFragrance(moodId: number, fragranceId: number): Promise<any> {
        try {
            const mood = await prisma.mood.findUnique({
                where: { id: moodId },
            });
            const fragrance = await prisma.fragrance.findUnique({
                where: { id: fragranceId },
            });
            if (!mood || !fragrance) {
                throw new Error('Mood or Fragrance not found');
            }
            await prisma.mood_Fragrance.create({
                data: {
                    moodId,
                    fragranceId,
                },
            });
            return mood;
        } catch (error) {
            throw error;
        }
    }

    public async unlinkMoodFromFragrance(moodId: number, fragranceId: number): Promise<any> {
        try {
            const mood = await prisma.mood.findUnique({
                where: { id: moodId },
            });
            const fragrance = await prisma.fragrance.findUnique({
                where: { id: fragranceId },
            });
            if (!mood || !fragrance) {
                throw new Error('Mood or Fragrance not found');
            }
            await prisma.mood_Fragrance.delete({
                where: {
                    moodId_fragranceId: {
                        moodId,
                        fragranceId,
                    },
                },
            });
            return mood;
        } catch (error) {
            throw error;
        }
    }

}