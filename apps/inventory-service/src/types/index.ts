import { type InferSelectModel } from "drizzle-orm";
import { products } from "../db/schema.js";
import { z } from "zod";
import { updateInventorySchema, updateProductSchema } from "../schemas/inventory.js";

export type Product = InferSelectModel<typeof products>;
export type UpdateInventoryRequest = z.infer<typeof updateInventorySchema>;
export type UpdateInventoryResponse = {
  success?: boolean;
  error?: string;
  newInventory?: number;
};

export type UpdateProductRequest = z.infer<typeof updateProductSchema>;
export type UpdateProductResponse = {
  success?: boolean;
  error?: string;
  name?: string;
  inventory_count?: number;
};
