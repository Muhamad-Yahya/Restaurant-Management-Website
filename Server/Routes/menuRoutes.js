// Routes/menuRoutes.js
import express from "express";
import { getAllMenuItems } from "../controllers/menuController.js";

const router = express.Router();

router.get("/", getAllMenuItems);

export default router;
