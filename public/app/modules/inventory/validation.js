"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventoryZodValidation = void 0;
const zod_1 = require("zod");
const InventoryZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is required' }),
        accessory_id: zod_1.z.string({ required_error: 'Accessory id is required' }),
        description: zod_1.z.string().optional(),
        quantity: zod_1.z.number({ required_error: 'quantity is required' }),
    }),
});
exports.inventoryZodValidation = {
    InventoryZodSchema,
};
// name         String
// accessory_id String    @db.ObjectId
// accessory    Accessory @relation(fields: [accessory_id], references: [id])
// quantity     Int
// description  String
