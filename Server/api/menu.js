// routes/menu.js
import express from "express";
import formidable from "formidable";
import MenuItem from "../models/MenuItem.js";
import dbConnect from "../config/db.js";
import { v2 as cloudinary } from "cloudinary";

const router = express.Router();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET all menu items
router.get("/", async (req, res) => {
  await dbConnect();
  try {
    const menuItems = await MenuItem.find().sort({ category: 1 });
    res.status(200).json(menuItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST new menu item
router.post("/", async (req, res) => {
  await dbConnect();

  const form = formidable({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: err.message });

    let imageUrl = "";
    if (files.image) {
      const filePath = files.image.filepath;
      const uploadResult = await cloudinary.uploader.upload(filePath, {
        folder: "menu",
        use_filename: true,
        unique_filename: false,
      });
      imageUrl = uploadResult.secure_url;
    }

    try {
      const newItem = await MenuItem.create({
        name: fields.name,
        category: fields.category,
        price: fields.price,
        branch: fields.branch,
        description: fields.description,
        image: imageUrl,
      });

      res.status(201).json(newItem);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  });
});

export default router;
