import { z } from "zod";

const createDriver = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({
        message: "Invalid email format",
      }),
    phone: z.string({
      required_error: "Phone is required",
    }),
    experience: z.string({
      required_error: "Experience is required",
    }),
    avatar: z.string({
      required_error: "Avatar is required",
    }),
    nid: z.string({
      required_error: "Nid is required",
    }),
    license_no: z.string({
      required_error: "License_no is required",
    }),
    address: z.string({
      required_error: "Address is required",
    }),
  }),
});

export const driverValidationSchema = {
  createDriver,
};