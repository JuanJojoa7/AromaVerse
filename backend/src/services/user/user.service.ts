import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthError } from '../../exceptions';

// Se crea una instancia del cliente de Prisma para interactuar con la base de datos
const prisma = new PrismaClient();

// Servicio para gestionar los usuarios en la base de datos
export class UserService {

  // Método privado para buscar un usuario por su correo electrónico
  private async findByEmail(email: string): Promise<any | null> {
    try {
      return await prisma.userAccount.findUnique({
        where: {
          email,
        },
      });
    } catch (error) {
      console.error('Error al buscar el usuario por email:', error);
      throw error; // Lanza el error en caso de fallo
    }
  }

  // Método privado para generar un token JWT para autenticación
  private generateToken(id: number, email: string, role: string): string {
    try {
      return jwt.sign(
        { user: { id, email, role } }, // Información del usuario dentro del token
        process.env.JWT_SECRET || 'secret', // Secreto del token, cambiar en producción
        { expiresIn: '50m'} // Expiración del token (ajustable según necesidad)
      );
    } catch (error) {
      console.error('Error en generateToken', error);
      throw error; // Lanza el error en caso de fallo
    }
  }

  // Método para iniciar sesión
  public async login(userLogin: { email: string, password: string}): Promise<any>{
    try {
      const userExists = await this.findByEmail(userLogin.email); // Busca el usuario por email
      if(!userExists){
        throw new AuthError('User not found'); // Lanza un error si el usuario no existe
      }
      if(!await bcrypt.compare(userLogin.password, userExists.password)){ // Compara la contraseña encriptada
        throw new AuthError('Invalid password'); // Lanza un error si la contraseña no es válida
      }

      const token = this.generateToken(userExists.id, userExists.email, userExists.role); // Genera el token

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
      throw error; // Lanza el error en caso de fallo
    }
  }

  // Método para crear un usuario nuevo
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
        throw new Error('User already exists'); // Lanza un error si el usuario ya existe
      }

      if(UserInput.password){
        UserInput.password = await bcrypt.hash(UserInput.password, 10); // Encripta la contraseña antes de guardarla
      }

      const user = await prisma.userAccount.create({
        data: {
          name: UserInput.name,
          email: UserInput.email,
          password: UserInput.password,
          phone: UserInput.phone,
          address: UserInput.address,
          role: 'customer', // Rol por defecto
        },
      });

      return user; // Retorna el usuario creado
    } catch (error) {
      throw error; // Lanza el error en caso de fallo
    }
  }

  // Método para obtener todos los usuarios
  public async findAll(): Promise<any[]>{
    try {
      const users = await prisma.userAccount.findMany(); // Obtiene todos los usuarios de la base de datos
      return users; // Retorna la lista de usuarios
    } catch (error) {
      console.error('Error al buscar los usuarios:', error);
      throw error; // Lanza el error en caso de fallo
    }
  }

  // Método para buscar un usuario por su ID
  public async findById(id: number): Promise<any | null>{
    try {
      const user = await prisma.userAccount.findUnique({
        where: {id},
      });
      return user; // Retorna el usuario encontrado o null si no existe
    } catch (error) {
      console.error('Error al buscar el usuario por id:', error);
      throw error; // Lanza el error en caso de fallo
    }
  }

  // Método para eliminar un usuario por su ID
  public async deleteUser(id: number): Promise<any | null>{
    try {
      const user = await this.findById(id);
      if(!user){
        throw new Error('User not found'); // Lanza un error si el usuario no existe
      }
      await prisma.userAccount.delete({
        where: {id},
      });
      return user; // Retorna el usuario eliminado
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      throw error; // Lanza el error en caso de fallo
    }
  }

  // Método para actualizar un usuario existente
  public async updateUser(id: number, userInput: any): Promise<any | null>{
    try {
      const userExists = await this.findById(id);
      if(!userExists){
        throw new Error('User not found'); // Lanza un error si el usuario no existe
      }

      // Encripta la contraseña si se proporciona una nueva
      if(userInput.password){
        userInput.password = await bcrypt.hash(userInput.password, 10);
      }

      const updatedUser = await prisma.userAccount.update({
        where: {id},
        data: userInput,
      });

      return updatedUser; // Retorna el usuario actualizado
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      throw error; // Lanza el error en caso de fallo
    }
  }
}