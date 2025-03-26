"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthError = void 0;
class AuthError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.stack = "Authentication error \n" + this.stack;
    }
}
exports.AuthError = AuthError;
