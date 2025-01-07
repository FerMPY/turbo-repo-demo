import { Request, Response } from "express";
import { inventoryService } from "../services/inventory.js";
import {
  UpdateInventoryRequest,
  UpdateProductRequest,
  UpdateProductResponse,
} from "../types/index.js";

export const inventoryController = {
  async getProduct(req: Request, res: Response) {
    try {
      const { productId } = req.params;
      const product = await inventoryService.getProduct(productId);

      if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
      }

      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getAllProducts(req: Request, res: Response) {
    try {
      const products = await inventoryService.getAllProducts();
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async updateInventory(
    req: Request<{}, {}, UpdateInventoryRequest>,
    res: Response
  ) {
    try {
      const { productId, quantity } = req.body;
      const result = await inventoryService.updateInventory(
        productId,
        quantity
      );

      if ("error" in result) {
        res.status(400).json({ error: result.error });
        return;
      }

      res.json(result);
    } catch (error) {
      console.error("Error updating inventory:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async updateProduct(
    req: Request<{}, {}, UpdateProductRequest>,
    res: Response
  ) {
    try {
      const { productId, name, inventory_count } = req.body;
      const result = await inventoryService.updateProduct(
        productId,
        name,
        inventory_count
      );

      if ("error" in result) {
        res.status(400).json({ error: result.error });
        return;
      }

      res.json(result);
    } catch (error) {
      console.error("Error updating inventory:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
