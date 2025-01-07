import { eq, sql } from "drizzle-orm";
import { db } from "../db/index.js";
import { products } from "../db/schema.js";
import { Product } from "../types/index.js";

export const productRepository = {
  async findById(productId: string): Promise<Product | null> {
    const result = await db
      .select()
      .from(products)
      .where(eq(products.id, productId));
    return result[0] ?? null;
  },

  async findAll() {
    return db.select().from(products).orderBy(sql.raw("CAST(id AS INTEGER)"));
  },

  async updateInventoryCount(productId: string, newCount: number) {
    await db
      .update(products)
      .set({ inventory_count: newCount })
      .where(eq(products.id, productId));
  },

  async updateProduct(productId: string, name: string, newCount: number) {
    await db
      .update(products)
      .set({ inventory_count: newCount, name: name })
      .where(eq(products.id, productId));
  },
};
