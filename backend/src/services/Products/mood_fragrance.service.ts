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
            if(!mood){
                throw new Error('Mood not found')
            }
            const fragrance = await prisma.fragrance.findUnique({
                where: { id: fragranceId },
            });
            if (!fragrance) {
                throw new Error('Fragrance not found');
            }
            const relation = await prisma.mood_Fragrance.create({
                data: {
                    moodId,
                    fragranceId,
                },
            });
            return relation
        } catch (error) {
            console.error('Error en linkMoodToFragrance:', error);
            throw error;
        }
    }

    public async unlinkMoodFromFragrance(moodId: number, fragranceId: number): Promise<any> {
        try {
            const mood = await prisma.mood.findUnique({
                where: { id: moodId },
            });
            if (!mood) {
                throw new Error('Mood not found');
            }
            
            const fragrance = await prisma.fragrance.findUnique({
                where: { id: fragranceId },
            });

            if(!fragrance){
                throw new Error('Fragrance not found')
            }

            //Prisma lo recibe asi: {campo1}_{campo2}
            const relation = await prisma.mood_Fragrance.delete({
                where: {
                    moodId_fragranceId: {
                        moodId,
                        fragranceId,
                    },
                },
            });
            return relation;
        } catch (error) {
            console.error('Error en unlinkMoodFromFragrance:', error);
            throw error;
        }
    }

}