import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export class UserService {
    public async createUser(UserInput: {
        name: string;
        email: string;
        password: string;
        phone?: string;
        address?: string;
      }): Promise<any> {
        try {
    
          const userExists = await this.findByEmail(UserInput.email);
    
          if(userExists !== null){
            throw new Error('User already exists');
          }
    
          if(UserInput.password){
            UserInput.password = await bcrypt.hash(UserInput.password, 10);
          }
    
          const user = await prisma.userAccount.create({
            data: {
              name: UserInput.name,
              email: UserInput.email,
              password: UserInput.password,
              phone: UserInput.phone,
              address: UserInput.address,
              role: 'customer', // Rol por defecto que tenemos en la base de datos
            },
          });
    
          return user;
    
        } catch (error) {
          throw error;
        }
      }
    
      private async findByEmail(email: string): Promise<any | null> {
        try {
          return await prisma.userAccount.findUnique({
            where: {
              email,
            },
          });
        } catch (error) {
          console.error('Error al buscar el usuario por email:', error);
          throw error;
        }
      }
}