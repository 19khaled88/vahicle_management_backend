import { z } from "zod";

const createZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    createAt: z.date().optional(),
    updatedAt: z.date().optional(),
    ManageRequest: z.array(z.unknown()).optional(),
  }),
});
export const inventoryRequestValidation = {
  createZodSchema,
};
