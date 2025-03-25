"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRole = void 0;
const authorizeRole = (allowedRoles) => (req, res, next) => {
    const user = req.body.loggedUser; // Usuario decodificado desde el middleware de autenticación
    if (allowedRoles.includes('public')) {
        return next();
    }
    if (!user || !allowedRoles.includes(user.role)) {
        res.status(403).json({ message: 'Forbidden: You do not have permission to perform this action' });
        return;
    }
    next();
};
exports.authorizeRole = authorizeRole;
