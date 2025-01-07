import { productRepository } from "./product.js"; // Adjust the path as needed
import { db } from "../db/index.js"; // Mock the db instance
import { products } from "../db/schema.js";

vi.mock("../db");

describe("productRepository", () => {
  const mockSelect = vi.fn();
  const mockUpdate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    db.select = mockSelect;
    db.update = mockUpdate;
  });

  describe("findById", () => {
    it("should return the product if found", async () => {
      const mockProduct = {
        id: "123",
        name: "Test Product",
        inventory_count: 10,
      };
      mockSelect.mockReturnValue({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockResolvedValue([mockProduct]),
        }),
      });

      const result = await productRepository.findById("123");

      expect(result).toEqual(mockProduct);
      expect(mockSelect).toHaveBeenCalled();
    });

    it("should return null if the product is not found", async () => {
      mockSelect.mockReturnValue({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockResolvedValue([]),
        }),
      });

      const result = await productRepository.findById("123");

      expect(result).toBeNull();
      expect(mockSelect).toHaveBeenCalled();
    });
  });

  describe("findAll", () => {
    it("should return all products", async () => {
      const mockProducts = [
        { id: "123", name: "Product A", inventory_count: 10 },
        { id: "456", name: "Product B", inventory_count: 5 },
      ];

      mockSelect.mockReturnValue({
        from: vi.fn().mockReturnValue({
          orderBy: vi.fn().mockResolvedValue(mockProducts),
        }),
      });

      const result = await productRepository.findAll();

      expect(result).toEqual(mockProducts);
      expect(mockSelect).toHaveBeenCalled();
    });
  });

  describe("updateInventoryCount", () => {
    it("should update the inventory count of a product", async () => {
      const mockSet = vi.fn().mockReturnValue({
        where: vi.fn().mockResolvedValue(undefined),
      });
      mockUpdate.mockReturnValue({ set: mockSet });

      await productRepository.updateInventoryCount("123", 20);

      expect(mockUpdate).toHaveBeenCalledWith(products);
      expect(mockSet).toHaveBeenCalledWith({ inventory_count: 20 });
    });
  });

  describe("updateProduct", () => {
    it("should update the product name and inventory count", async () => {
      const mockSet = vi.fn().mockReturnValue({
        where: vi.fn().mockResolvedValue(undefined),
      });
      mockUpdate.mockReturnValue({ set: mockSet });

      await productRepository.updateProduct("123", "Updated Product", 30);

      expect(mockUpdate).toHaveBeenCalledWith(products);
      expect(mockSet).toHaveBeenCalledWith({
        inventory_count: 30,
        name: "Updated Product",
      });
    });
  });
});
