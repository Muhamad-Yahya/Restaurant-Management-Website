import express from "express";
import {
  adminGetMenuItems,
  updateMenuItem,
  createMenuItem,
  deleteMenuItem,
} from "../controllers/menuController.js";

const router = express.Router();

router.get("/", adminGetMenuItems);
router.put("/:id", updateMenuItem);
router.post("/", createMenuItem);
router.delete("/:id", deleteMenuItem);

export default router;
