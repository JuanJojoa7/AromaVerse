// src/middlewares/auth.middleware.ts
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const auth = (req: Request, res: Response, next: NextFunction): void => {
  let token: string | undefined = req.header('Authorization');

  if (!token) {
    // Enviamos una respuesta sin retornar explícitamente
    res.status(401).json({ message: 'User not authorized' });
    return; // Salimos del middleware
  }

  token = token.replace('Bearer ', '');

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.body.loggedUser = decoded.user; // Adjuntar el usuario decodificado al cuerpo de la solicitud
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: 'Token expired' });
      return;
    }
    res.status(401).json({ message: 'Invalid token' });
    return;
  }
};