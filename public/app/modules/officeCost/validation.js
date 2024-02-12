"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfficeZodValidation = void 0;
const zod_1 = require("zod");
const OfficeCostZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string().optional(),
        cost_name: zod_1.z.string(),
        amount: zod_1.z.number(),
        description: zod_1.z.string().optional(),
        createdAt: zod_1.z.date().optional(),
        updatedAt: zod_1.z.date().optional(),
    })
});
exports.OfficeZodValidation = {
    OfficeCostZodSchema
};
