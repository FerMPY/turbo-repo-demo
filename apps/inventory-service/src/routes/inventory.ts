import { Router } from "express";
import { inventoryController } from "../controllers/inventory.js";
import { validateRequest } from "../middleware/validate.js";
import {
  updateInventorySchema,
  updateProductSchema,
} from "../schemas/inventory.js";

const router = Router();

router.get("/:productId", inventoryController.getProduct);
router.get("/", inventoryController.getAllProducts);
router.post(
  "/update-inventory",
  validateRequest(updateInventorySchema),
  inventoryController.updateInventory
);
router.post(
  "/update-product",
  validateRequest(updateProductSchema),
  inventoryController.updateProduct
);

export { router as inventoryRoutes };
