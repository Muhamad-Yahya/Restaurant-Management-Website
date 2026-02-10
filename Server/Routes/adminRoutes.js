import express from "express";
import Order from "../Models/Order.js";
import Reservation from "../models/reservation.js";
import { updateOrderStatus } from "../controllers/orderController.js"; // <-- import this!

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
router.put("/orders/:id/status", updateOrderStatus); // <-- this will now work

/**
 * GET ALL RESERVATIONS
 */
router.get("/reservations", async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });
    res.json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({ message: "Failed to fetch reservations" });
  }
});

export default router;
