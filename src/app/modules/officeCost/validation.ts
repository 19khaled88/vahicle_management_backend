
import { z } from "zod";

const OfficeCostZodSchema = z.object({
    body:z.object({
        id: z.string().optional(),
        cost_name: z.string(),
        amount: z.number(),
        description: z.string().optional(),
        createdAt: z.date().optional(),
        updatedAt: z.date().optional(),

    })
  });


  export const OfficeZodValidation = {
OfficeCostZodSchema
  }

//   // office cost
// model OfficeCost {
//   id          String   @id @default(auto()) @map("_id") @db.ObjectId
//   cost_name   String
//   amount      Int
//   description String? // Optional description of the cost
//   createdAt   DateTime @default(now()) // Timestamp when the record was created
//   updatedAt   DateTime @updatedAt // Timestamp when the record was last updated

//   @@map("office_costs")
// }
