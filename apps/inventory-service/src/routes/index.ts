import { Router } from "express";
import { inventoryRoutes } from "./inventory.js";

const router = Router();

router.use("/inventory", inventoryRoutes);

export default router;
