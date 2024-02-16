"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventoryRequestValidation = void 0;
const zod_1 = require("zod");
const createZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Requeust Title is required",
        })
    }),
});
exports.inventoryRequestValidation = {
    createZodSchema,
};
