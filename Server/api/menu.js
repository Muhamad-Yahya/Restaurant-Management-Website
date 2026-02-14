import mongoose from "mongoose";
import MenuItem from "../models/MenuItem.js";
import dbConnect from "../config/db.js";

export default async function handler(req, res) {
  await dbConnect();

  try {
    if (req.method === "GET") {
      const menuItems = await MenuItem.find().sort({ category: 1 });
      return res.status(200).json(menuItems);
    }

    if (req.method === "POST") {
      const newItem = await MenuItem.create(req.body);
      return res.status(201).json(newItem);
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}
