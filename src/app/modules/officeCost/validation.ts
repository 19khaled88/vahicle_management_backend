
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

