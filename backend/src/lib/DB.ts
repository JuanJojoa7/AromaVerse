// lib/db.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const connectToDatabase = async () => {
  try {
    await prisma.$connect();
    console.log('Connected to PostgreSQL database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
};

export const disconnect = async() => {
  try {
    await prisma.$disconnect();
    console.log('Desconexcion de la DB')
  } catch (error) {
    console.error('Error al desconectar la DB:', error)
    throw error;
  }
}


export default prisma;