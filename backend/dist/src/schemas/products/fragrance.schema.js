"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fragranceSchema = void 0;
const zod_1 = require("zod");
exports.fragranceSchema = (0, zod_1.object)({
    name: (0, zod_1.string)({ required_error: 'Name is required' }).min(1, { message: 'Name cannot be empty' }),
    description: (0, zod_1.string)({ required_error: 'Description is required' }).min(1, { message: 'Description cannot be empty' }),
    associatedColor: (0, zod_1.string)({ required_error: 'Color is required' }).min(1, { message: 'Color cannot be empty' })
});
