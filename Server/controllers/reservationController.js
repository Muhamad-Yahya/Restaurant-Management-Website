import Reservation from "../models/reservation.js";

export const addReservation = async (req, res) => {
  try {
    const { name, phone, date, time, guests, hall } = req.body;

    if (!name || !phone || !date || !time || !guests || !hall) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newReservation = await Reservation.create({
      name,
      phone,
      date,
      time,
      guests,
      hall,
    });

    res.status(201).json({
      message: "Reservation saved successfully",
      reservation: newReservation,
    });
  } catch (error) {
    console.error("❌ Error saving reservation:", error);
    res.status(500).json({ message: error.message });
  }
};
