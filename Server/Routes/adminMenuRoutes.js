import express from "express";
import upload from "../middleware/upload.js"; // this is Cloudinary-ready
import {
  adminGetMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menuController.js";

const router = express.Router();

// Get all menu items (admin dashboard)
router.get("/", adminGetMenuItems);

// Create menu item (with image upload to Cloudinary)
router.post("/", upload.single("image"), createMenuItem);

// Update menu item (optional new image)
router.put("/:id", upload.single("image"), updateMenuItem);

// Delete menu item
router.delete("/:id", deleteMenuItem);

export default router;
