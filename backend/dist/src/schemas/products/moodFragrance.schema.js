"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moodFragranceSchema = void 0;
const zod_1 = require("zod");
exports.moodFragranceSchema = (0, zod_1.object)({
    moodId: (0, zod_1.number)({ required_error: "MoodId is required" }).min(1, { message: 'MoodId cannot be empty' }),
    fragranceId: (0, zod_1.number)({ required_error: "FragranceId is required" }).min(1, { message: 'FragranceId cannot be empty' })
});
