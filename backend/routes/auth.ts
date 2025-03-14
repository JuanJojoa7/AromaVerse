import express from "express";
import { authenticateUser } from "../middleware/auth";
import { Request, Response } from "express";
import admin from "../config/firebase";

// Extender Request para que TypeScript reconozca "user"
interface AuthRequest extends Request {
    user?: admin.auth.DecodedIdToken;
}

const router = express.Router();

router.get("/protected", authenticateUser, (req: AuthRequest, res: Response) => {
    res.json({ message: "Ruta protegida, usuario autenticado", user: req.user });
});

export default router;
