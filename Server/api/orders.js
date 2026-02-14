import mongoose from "mongoose";
import Order from "../models/Order.js"; // adjust path relative to /api
import dbConnect from "../config/db.js";

export default async function handler(req, res) {
  await dbConnect();

  try {
    if (req.method === "GET") {
      const orders = await Order.find().sort({ createdAt: -1 });
      return res.status(200).json(orders);
    }

    if (req.method === "PUT") {
      // Expect: /api/orders?id=<orderId>
      const { id } = req.query;
      const { status } = req.body;

      if (!id || !status) return res.status(400).json({ message: "Missing parameters" });

      const updatedOrder = await Order.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );

      return res.status(200).json(updatedOrder);
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}
