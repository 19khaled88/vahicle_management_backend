"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.manageRequestValidation = void 0;
const zod_1 = require("zod");
const createZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        inventory_request_id: zod_1.z.string({
            required_error: "inventory_request_id is required",
        }),
        approve_status: zod_1.z.string({
            required_error: "approve_status is required",
        }),
        comment: zod_1.z.string().optional(),
        createAt: zod_1.z.date().optional(),
        updatedAt: zod_1.z.date().optional(),
        inventoryRequest: zod_1.z.array(zod_1.z.unknown()).optional(),
    }),
});
exports.manageRequestValidation = {
    createZodSchema,
};
// // Mobarak vai korben
// model ManageRequest {
//     id                   String           @id @default(auto()) @map("_id") @db.ObjectId
//     inventory_request_id String           @db.ObjectId
//     inventoryRequest     InventoryRequest @relation(fields: [inventory_request_id], references: [id])
//     approve_status       RequestStatus    @default(PENDING)
//     comment              String?
//     createdAt      DateTime        @default(now())
//     updatedAt     DateTime        @updatedAt
//   }
