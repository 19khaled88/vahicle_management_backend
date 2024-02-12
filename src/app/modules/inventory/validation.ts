
import { z } from "zod";

const InventoryZodSchema = z.object({
  body: z.object({
    name: z.string({required_error: 'Name is required'}),
    accessory_id: z.string({required_error: 'Accessory id is required'}),
    description: z.string().optional(),
    quantity: z.number({required_error: 'quantity is required'}),
  }),
});

export const inventoryZodValidation = {
  InventoryZodSchema,
};



// name         String
// accessory_id String    @db.ObjectId
// accessory    Accessory @relation(fields: [accessory_id], references: [id])
// quantity     Int
// description  String