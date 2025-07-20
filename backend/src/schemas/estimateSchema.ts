import { z } from "zod";

export const estimateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  laborCost: z.number().nonnegative("Labor cost must be >= 0"),
  materialsTotal: z.number().nonnegative("Materials total must be >= 0"),
  clientId: z.string().uuid("Invalid client ID"),
});

export const updateEstimateSchema = estimateSchema.partial();
