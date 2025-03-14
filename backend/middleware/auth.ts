import { Request, Response, NextFunction } from "express";
import admin from "../config/firebase";

// Extender Request para incluir user
interface AuthRequest extends Request {
    user?: admin.auth.DecodedIdToken;
}

export const authenticateUser = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "No autorizado, token faltante" });
        return;
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next(); // ⚠ IMPORTANTE: Llamar a next() y no devolver nada
    } catch (error) {
        res.status(401).json({ message: "Token inválido", error });
    }
};
