import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthError } from '../../exceptions';

const prisma = new PrismaClient();

export class UserService {

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

  private generateToken(id: number, email: string, role: string): string {
    try {
      return jwt.sign(
        { user: { id, email, role } },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '50m'} //Cambiar valor al gusto
      )
    } catch (error) {
      console.error('Error en generateToken', error)
      throw error;
    }
  }

  public async login(userLogin: { email: string, password: string}): Promise<any>{
    try {
      const userExists = await this.findByEmail(userLogin.email);
      if(!userExists){
        throw new AuthError('User not found');
      }
      if(!await bcrypt.compare(userLogin.password, userExists.password)){
        throw new AuthError('Invalid password');
      }

      const token = this.generateToken(userExists.id, userExists.email, userExists.role);

      return{
        user: {
          id: userExists.id,
          name: userExists.name,
          email: userExists.email,
          role: userExists.role,
        },
        token,
      };
    } catch (error) {
      console.error('Error en login', error);
      throw error;
    }
  }


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
        //console.error('User already existss');
        throw new Error('User already exists:');
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

  //Buscar todos los usuarios
  public async findAll(): Promise<any[]>{
    try {
      const users = await prisma.userAccount.findMany();
      return users;
    } catch (error) {
      console.error('Error al buscar los usuarios:', error);
      throw error;
    }
  }

  //Buscar un usuario por id
  public async findById(id: number): Promise<any | null>{
    try {
      const user = await prisma.userAccount.findUnique({
        where: {id},
      });
      return user;
    } catch (error) {
      console.error('Error al buscar el usuario por id:', error);
      throw error;
    }
  }

  //Eliminar un usuario
  public async deleteUser(id: number): Promise<any | null>{
    try {
      const user = await this.findById(id);
      if(!user){
        throw new Error('User not found');
      }
      await prisma.userAccount.delete({
        where: {id},
      });
      return user; //Aqui devuelve el usaurio eliminado
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      throw error;
    }
  }

  //Actualizar un usuario
  public async updateUser(id: number, userInput: any): Promise<any | null>{
    try {
      const userExists = await this.findById(id);
      if(!userExists){
        throw new Error('User not found');
      }

      //Para encriptar la contraseña si se da una nueva
      if(userInput.password){
        userInput.password = await bcrypt.hash(userInput.password, 10);
      }

      const updatedUser = await prisma.userAccount.update({
        where: {id},
        data: userInput,
      });

      return updatedUser;

    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      throw error;
    }
  }
    
      
}