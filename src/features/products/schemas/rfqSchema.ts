import { z } from "zod";

export const rfqSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number({ invalid_type_error: "Enter quantity" }).int().positive(),
  unit: z.string().min(1),
  targetPrice: z.number().nonnegative().optional(),
  notes: z.string().max(1000).optional(),
});

export type RfqInput = z.infer<typeof rfqSchema>;
