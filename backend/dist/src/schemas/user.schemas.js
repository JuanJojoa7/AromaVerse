"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = (0, zod_1.object)({
    name: (0, zod_1.string)({ required_error: 'Name is required' }),
    email: (0, zod_1.string)({ required_error: 'Email is required' }),
    password: (0, zod_1.string)({ required_error: 'Password is required' })
        .min(8, { message: 'Password must be at least 8 characters long' }),
    phone: (0, zod_1.string)({ required_error: 'Number is required' }),
    address: (0, zod_1.string)({ required_error: 'Address is required' }),
});
exports.userLoginSchema = (0, zod_1.object)({
    email: (0, zod_1.string)({ required_error: 'Email is required' })
        .email({ message: 'Email is not valid' }),
    password: (0, zod_1.string)({ required_error: 'Password is required' })
});
