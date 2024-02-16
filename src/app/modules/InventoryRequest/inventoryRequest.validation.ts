import { z } from "zod";

const createZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Requeust Title is required",
    })
  }),
});
export const inventoryRequestValidation = {
  createZodSchema,
};
