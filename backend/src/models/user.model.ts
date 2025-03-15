import { PrismaClient, UserAccount } from '@prisma/client';

const prisma = new PrismaClient();


export async function findByEmail(email: string): Promise<UserAccount | null> {
  return await prisma.userAccount.findUnique({ where: { email }, });
}



