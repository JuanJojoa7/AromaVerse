// src/middlewares/role.middleware.ts
import { Request, Response, NextFunction } from 'express';

export const authorizeRole =
  (allowedRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction): void=> {
    const user = req.body.loggedUser; // Usuario decodificado desde el middleware de autenticación

    if(allowedRoles.includes('public')){
      return next();
    }

    if (!user || !allowedRoles.includes(user.role)) {
      res.status(403).json({ message: 'Forbidden: You do not have permission to perform this action' });
      return;
    }
    next();
  };