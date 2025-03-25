"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = (0, zod_1.object)({
    name: (0, zod_1.string)({ required_error: 'Name is required' }).min(1, { message: 'Name cannot be empty' }),
    email: (0, zod_1.string)({ required_error: 'Email is required' }).min(1, { message: 'Email cannot be empty' }),
    password: (0, zod_1.string)({ required_error: 'Password is required' })
        .min(5, { message: 'Password must be at least 5 characters long' }),
    phone: (0, zod_1.string)({ required_error: 'Number is required' }).min(10, { message: 'Number must be at least 10 characters long' }),
    address: (0, zod_1.string)({ required_error: 'Address is required' }).min(1, { message: 'Address cannot be empty' })
});
exports.userLoginSchema = (0, zod_1.object)({
    email: (0, zod_1.string)({ required_error: 'Email is required' })
        .email({ message: 'Email is not valid' }),
    password: (0, zod_1.string)({ required_error: 'Password is required' })
});
