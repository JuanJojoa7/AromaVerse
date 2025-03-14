import { PrismaClient, UserAccount } from '@prisma/client';

const prisma = new PrismaClient();


export async function findByEmail(email: string): Promise<UserAccount | null> {
  return await prisma.userAccount.findUnique({ where: { email }, });
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  role?: string;
}): Promise<UserAccount>{
  return await prisma.userAccount.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      address: data.address,
      role: data.role || 'customer',
    },
  });
}

