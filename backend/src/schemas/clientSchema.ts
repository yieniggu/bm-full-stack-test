import { z } from "zod";

export const clientSchema = z.object({
  name: z
    .string()
    .min(1, "Client name is required")
    .max(100, "Client name must be under 100 characters"),
  email: z.string().email("Must be a valid email").min(1, "Email is required"),
  phone: z
    .string()
    .min(7, "Phone number must be at least 7 digits")
    .max(20, "Phone number must be under 20 digits"),
  userId: z.string().uuid("User ID must be a valid UUID"),
});

export const updateClientSchema = clientSchema.partial().extend({
  id: z.string().uuid("Client ID must be a valid UUID"),
});
