"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.containerSchema = void 0;
const zod_1 = require("zod");
exports.containerSchema = (0, zod_1.object)({
    name: (0, zod_1.string)({ required_error: 'Name is required' }).min(1, { message: 'Name cannot be empty' }),
    material: (0, zod_1.string)({ required_error: 'Material is required' }).min(1, { message: 'Material cannot be empty' }),
    description: (0, zod_1.string)({ required_error: 'Description is required' }).min(1, { message: 'Description cannot be empty' }),
});
