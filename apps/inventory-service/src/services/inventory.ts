import { productRepository } from "../repositories/product.js";
import {
  UpdateInventoryResponse,
  UpdateProductResponse,
} from "../types/index.js";

export const inventoryService = {
  async getProduct(productId: string) {
    return productRepository.findById(productId);
  },

  async getAllProducts() {
    return productRepository.findAll();
  },

  async updateInventory(
    productId: string,
    quantity: number
  ): Promise<UpdateInventoryResponse> {
    const product = await productRepository.findById(productId);

    if (!product) {
      return { error: "Product not found" };
    }

    const newInventory = product.inventory_count - quantity;

    if (newInventory < 0) {
      return { error: "Insufficient inventory" };
    }

    await productRepository.updateInventoryCount(productId, newInventory);
    return { success: true, newInventory };
  },

  async updateProduct(
    productId: string,
    name: string,
    inventory_count: number
  ): Promise<UpdateProductResponse> {
    const product = await productRepository.findById(productId);

    if (!product) {
      return { error: "Product not found" };
    }

    if (inventory_count < 0) {
      return { error: "Inventory can't be negative" };
    }

    await productRepository.updateProduct(productId, name, inventory_count);
    return { success: true, name, inventory_count };
  },
};
