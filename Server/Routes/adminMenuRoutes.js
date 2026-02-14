import express from "express";
import multer from "multer";
import {
  adminGetMenuItems,
  updateMenuItem,
  createMenuItem,
  deleteMenuItem,
} from "../controllers/menuController.js";

const router = express.Router();

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/menu"); // folder to store uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Routes
router.get("/", adminGetMenuItems);
router.put("/:id", updateMenuItem);
router.post("/", upload.single("image"), createMenuItem); // <-- handle file upload
router.delete("/:id", deleteMenuItem);

export default router;
