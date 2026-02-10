import express from "express";
import { addReservation } from "../controllers/reservationController.js";

const router = express.Router();

router.post("/", addReservation);

export default router;
