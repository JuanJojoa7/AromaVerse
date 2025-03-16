// src/middlewares/auth.middleware.ts
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AuthError } from '../exceptions';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined = req.header('Authorization');

  // Verificar si el token existe
  if (!token) {
    return res.status(401).json({ message: 'User not authorized' });
  }

  // Eliminar "Bearer " del token
  token = token.replace('Bearer ', '');

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.body.loggedUser = decoded.user;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(401).json({ message: 'Invalid token' });
  }
};