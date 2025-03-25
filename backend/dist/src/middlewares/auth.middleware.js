"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
// src/middlewares/auth.middleware.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    let token = req.header('Authorization');
    if (!token) {
        // Enviamos una respuesta sin retornar explícitamente
        res.status(401).json({ message: 'User not authorized' });
        return; // Salimos del middleware
    }
    token = token.replace('Bearer ', '');
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'secret');
        req.body.loggedUser = decoded.user; // Adjuntar el usuario decodificado al cuerpo de la solicitud
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            res.status(401).json({ message: 'Token expired' });
            return;
        }
        res.status(401).json({ message: 'Invalid token' });
        return;
    }
};
exports.auth = auth;
