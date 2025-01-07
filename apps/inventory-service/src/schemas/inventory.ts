import { z } from "zod";

export const updateProductSchema = z.object({
  productId: z.string(),
  name: z.string(),
  inventory_count: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), {
      message: "Quantity must be a valid number",
    })
    .pipe(z.number().int().positive({ message: "Quantity must be positive" })),
});

export const updateInventorySchema = z.object({
  productId: z.string(),
  quantity: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), {
      message: "Quantity must be a valid number",
    })
    .pipe(z.number().int().positive({ message: "Quantity must be positive" })),
});
