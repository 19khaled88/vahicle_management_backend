import { z } from "zod";

const createZodSchema = z.object({
  body: z.object({
    inventory_request_id: z.string({
      required_error: "inventory_request_id is required",
    }),
    approve_status : z.string({
      required_error: "approve_status is required",
    }),
    comment : z.string().optional(),
    createAt: z.date().optional(),
    updatedAt: z.date().optional(),
    inventoryRequest : z.array(z.unknown()).optional(),
  }),
});
export const manageRequestValidation = {
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