import mongoose from "mongoose";
import Reservation from "../models/reservation.js"; 
import dbConnect from "../config/db.js";

export default async function handler(req, res) {
  await dbConnect();

  try {
    if (req.method === "GET") {
      const reservations = await Reservation.find().sort({ date: 1 });
      return res.status(200).json(reservations);
    }

    if (req.method === "POST") {
      const reservation = await Reservation.create(req.body);
      return res.status(201).json(reservation);
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}
