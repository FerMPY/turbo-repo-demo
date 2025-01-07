import { Request, Response } from "express";
import { inventoryController } from "./inventory";
import { inventoryService } from "../services/inventory";

const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res as Response;
};

describe("inventoryController", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getProduct", () => {
    it("should return product when found", async () => {
      const mockProduct = { id: "1", name: "Product 1", inventory_count: 100 };
      const req = { params: { productId: "1" } } as unknown as Request;
      const res = mockResponse();
      vi.spyOn(inventoryService, "getProduct").mockResolvedValue(mockProduct);

      await inventoryController.getProduct(req, res);

      expect(res.json).toHaveBeenCalledWith(mockProduct);
      expect(res.status).not.toHaveBeenCalledWith(404);
    });

    it("should return 404 if product is not found", async () => {
      const req = { params: { productId: "1" } } as unknown as Request;
      const res = mockResponse();
      vi.spyOn(inventoryService, "getProduct").mockResolvedValue(null);

      await inventoryController.getProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Product not found" });
    });

    it("should return 500 on error", async () => {
      const req = { params: { productId: "1" } } as unknown as Request;
      const res = mockResponse();
      vi.spyOn(inventoryService, "getProduct").mockRejectedValue(
        new Error("Database error")
      );

      await inventoryController.getProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });

  describe("getAllProducts", () => {
    it("should return all products", async () => {
      const mockProducts = [
        { id: "1", name: "Product 1", inventory_count: 100 },
        { id: "2", name: "Product 2", inventory_count: 200 },
      ];
      const req = {} as unknown as Request;
      const res = mockResponse();
      vi.spyOn(inventoryService, "getAllProducts").mockResolvedValue(
        mockProducts
      );

      await inventoryController.getAllProducts(req, res);

      expect(res.json).toHaveBeenCalledWith(mockProducts);
    });

    it("should return 500 on error", async () => {
      const req = {} as unknown as Request;
      const res = mockResponse();
      vi.spyOn(inventoryService, "getAllProducts").mockRejectedValue(
        new Error("Database error")
      );

      await inventoryController.getAllProducts(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });

  describe("updateInventory", () => {
    it("should update inventory and return success", async () => {
      const req = {
        body: { productId: "1", quantity: 10 },
      } as unknown as Request;
      const res = mockResponse();
      const mockResult = { success: true };
      vi.spyOn(inventoryService, "updateInventory").mockResolvedValue(
        mockResult
      );

      await inventoryController.updateInventory(req, res);

      expect(res.json).toHaveBeenCalledWith(mockResult);
    });

    it("should return 400 if there is an error in the result", async () => {
      const req = {
        body: { productId: "1", quantity: 10 },
      } as unknown as Request;
      const res = mockResponse();
      const mockError = { error: "Invalid quantity" };
      vi.spyOn(inventoryService, "updateInventory").mockResolvedValue(
        mockError
      );

      await inventoryController.updateInventory(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: mockError.error });
    });

    it("should return 500 on error", async () => {
      const req = {
        body: { productId: "1", quantity: 10 },
      } as unknown as Request;
      const res = mockResponse();
      vi.spyOn(inventoryService, "updateInventory").mockRejectedValue(
        new Error("Update error")
      );

      await inventoryController.updateInventory(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });

  describe("updateProduct", () => {
    it("should update product and return success", async () => {
      const req = {
        body: { productId: "1", name: "Updated Product", inventory_count: 200 },
      } as unknown as Request;
      const res = mockResponse();
      const mockResult = { success: true };
      vi.spyOn(inventoryService, "updateProduct").mockResolvedValue(mockResult);

      await inventoryController.updateProduct(req, res);

      expect(res.json).toHaveBeenCalledWith(mockResult);
    });

    it("should return 400 if there is an error in the result", async () => {
      const req = {
        body: { productId: "1", name: "Updated Product", inventory_count: 200 },
      } as unknown as Request;
      const res = mockResponse();
      const mockError = { error: "Invalid product data" };
      vi.spyOn(inventoryService, "updateProduct").mockResolvedValue(mockError);

      await inventoryController.updateProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: mockError.error });
    });

    it("should return 500 on error", async () => {
      const req = {
        body: { productId: "1", name: "Updated Product", inventory_count: 200 },
      } as unknown as Request;
      const res = mockResponse();
      vi.spyOn(inventoryService, "updateProduct").mockRejectedValue(
        new Error("Update error")
      );

      await inventoryController.updateProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });
});
