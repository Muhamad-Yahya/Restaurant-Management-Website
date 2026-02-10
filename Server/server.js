import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import reservationRoutes from "./Routes/reservationRoutes.js";
import orderRoutes from "./Routes/orderRoutes.js"; // user orders
import adminRoutes from "./Routes/adminRoutes.js"; // admin dashboard/orders/reservations
import adminMenuRoutes from "./Routes/adminMenuRoutes.js";
import menuRoutes from "./Routes/menuRoutes.js";
import path from "path";

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// User routes
app.use("/api/reservations", reservationRoutes);
app.use("/api/orders", orderRoutes); // users POST orders here
app.use("/api/menu", menuRoutes);

// Admin routes
app.use("/api/admin", adminRoutes); // GET all orders, PUT /status, GET reservations
app.use("/api/admin/menu", adminMenuRoutes); // admin menu

app.use(express.static(path.join(process.cwd(), "public")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
