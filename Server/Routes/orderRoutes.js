import express from "express";
import Order from "../models/Order.js";
import { addOrder,updateOrderStatus } from "../controllers/orderController.js"; // named import

const router = express.Router();

/**
 * GET ALL ORDERS
 */
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

/**
 * UPDATE ORDER STATUS
 */
router.put("/orders/:id/status", updateOrderStatus); // <- make sure frontend uses this URL
router.post("/", addOrder);


export default router;
