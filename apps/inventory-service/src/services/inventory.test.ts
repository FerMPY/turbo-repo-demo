import { productRepository } from "../repositories/product.js";
import { inventoryService } from "./inventory.js";

vi.mock("../repositories/product");

describe("inventoryService", () => {
  afterEach(() => {
    vi.clearAllMocks(); // Clear mocks between tests
  });

  describe("getProduct", () => {
    it("should return the product when found", async () => {
      const mockProduct = { id: "1", name: "Product A", inventory_count: 10 };
      vi.spyOn(productRepository, "findById").mockResolvedValue(mockProduct);

      const result = await inventoryService.getProduct("1");

      expect(result).toEqual(mockProduct);
      expect(productRepository.findById).toHaveBeenCalledOnce();
      expect(productRepository.findById).toHaveBeenCalledWith("1");
    });

    it("should return null when product is not found", async () => {
      vi.spyOn(productRepository, "findById").mockResolvedValue(null);

      const result = await inventoryService.getProduct("non-existing-id");

      expect(result).toBeNull();
      expect(productRepository.findById).toHaveBeenCalledOnce();
      expect(productRepository.findById).toHaveBeenCalledWith(
        "non-existing-id"
      );
    });
  });

  describe("getAllProducts", () => {
    it("should return a list of products", async () => {
      const mockProducts = [
        { id: "1", name: "Product A", inventory_count: 10 },
        { id: "2", name: "Product B", inventory_count: 20 },
      ];
      vi.spyOn(productRepository, "findAll").mockResolvedValue(mockProducts);

      const result = await inventoryService.getAllProducts();

      expect(result).toEqual(mockProducts);
      expect(productRepository.findAll).toHaveBeenCalledOnce();
    });
    it("should return a empty array when no products are found", async () => {
      vi.spyOn(productRepository, "findAll").mockResolvedValue([]);

      const result = await inventoryService.getAllProducts();

      expect(result.length).toBe(0);
      expect(productRepository.findAll).toHaveBeenCalledOnce();
    });
  });

  describe("updateInventory", () => {
    it("should successfully update inventory when sufficient stock is available", async () => {
      const mockProduct = { id: "1", name: "Product A", inventory_count: 10 };
      vi.spyOn(productRepository, "findById").mockResolvedValue(mockProduct);
      vi.spyOn(productRepository, "updateInventoryCount").mockResolvedValue();

      const result = await inventoryService.updateInventory("1", 5);

      expect(result).toEqual({ success: true, newInventory: 5 });
      expect(productRepository.findById).toHaveBeenCalledOnce();
      expect(productRepository.findById).toHaveBeenCalledWith("1");
      expect(productRepository.updateInventoryCount).toHaveBeenCalledOnce();
      expect(productRepository.updateInventoryCount).toHaveBeenCalledWith(
        "1",
        5
      );
    });

    it("should return error when product is not found", async () => {
      vi.spyOn(productRepository, "findById").mockResolvedValue(null);

      const result = await inventoryService.updateInventory(
        "non-existing-id",
        5
      );

      expect(result).toEqual({ error: "Product not found" });
      expect(productRepository.findById).toHaveBeenCalledOnce();
      expect(productRepository.findById).toHaveBeenCalledWith(
        "non-existing-id"
      );
    });

    it("should return error when there is insufficient inventory", async () => {
      const mockProduct = { id: "1", name: "Product A", inventory_count: 3 };
      vi.spyOn(productRepository, "findById").mockResolvedValue(mockProduct);

      const result = await inventoryService.updateInventory("1", 5);

      expect(result).toEqual({ error: "Insufficient inventory" });
      expect(productRepository.findById).toHaveBeenCalledOnce();
      expect(productRepository.findById).toHaveBeenCalledWith("1");
    });
  });

  describe("updateProduct", () => {
    it("should successfully update product if exist", async () => {
      const mockProduct = { id: "1", name: "Product A", inventory_count: 10 };
      vi.spyOn(productRepository, "findById").mockResolvedValue(mockProduct);
      vi.spyOn(productRepository, "updateProduct").mockResolvedValue();

      const result = await inventoryService.updateProduct("1", "New Name", 5);

      expect(result).toEqual({
        success: true,
        name: "New Name",
        inventory_count: 5,
      });
      expect(productRepository.findById).toHaveBeenCalledOnce();
      expect(productRepository.findById).toHaveBeenCalledWith("1");
      expect(productRepository.updateProduct).toHaveBeenCalledOnce();
      expect(productRepository.updateProduct).toHaveBeenCalledWith(
        "1",
        "New Name",
        5
      );
    });

    it("should return error when product is not found", async () => {
      vi.spyOn(productRepository, "findById").mockResolvedValue(null);

      const result = await inventoryService.updateProduct("1", "New Name", 5);

      expect(result).toEqual({ error: "Product not found" });
      expect(productRepository.findById).toHaveBeenCalledOnce();
      expect(productRepository.findById).toHaveBeenCalledWith("1");
    });

    it("should return error when the if the inventory is negative", async () => {
      const mockProduct = { id: "1", name: "Product A", inventory_count: 3 };
      vi.spyOn(productRepository, "findById").mockResolvedValue(mockProduct);

      const result = await inventoryService.updateProduct("1", "Product A", -5);

      expect(result).toEqual({ error: "Inventory can't be negative" });
      expect(productRepository.findById).toHaveBeenCalledOnce();
      expect(productRepository.findById).toHaveBeenCalledWith("1");
    });
  });
});
