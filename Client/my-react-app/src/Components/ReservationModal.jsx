// components/ReservationModal.jsx
import React, { useState } from "react";
import axios from "axios";
import { API_BASE } from "../config";



const ReservationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: 15,
    hall: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const halls = [
    "Grand Hall",
    "Banquet Hall",
    "Private Lounge",
    "Skyline Hall",
    "Garden Hall",
    "Royal Lounge",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // basic client-side validation (you already had)
      const { name, phone, date, time, guests, hall } = formData;
      if (!name || !phone || !date || !time || !guests || !hall) {
        alert("All fields are required");
        setLoading(false);
        return;
      }

      const response = await axios.post(`${API_BASE}/reservations`, formData);
      console.log("✅ Reservation submitted:", response.data);
      setSubmitted(true);
    } catch (error) {
      console.error("❌ Error submitting reservation:", error.response?.data || error.message);
      alert("Failed to submit reservation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      phone: "",
      date: "",
      time: "",
      guests: 15,
      hall: "",
    });
    setSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl w-11/12 max-w-lg p-8 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl font-bold"
        >
          &times;
        </button>

        {!submitted ? (
          <>
            <h2
              className="text-2xl font-bold mb-6 text-center text-red-600"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Book a Reservation
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-600"
              />

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-600"
              />

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-600"
              />

              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-600"
              />

              <input
                type="number"
                name="guests"
                min={15}
                value={formData.guests}
                onChange={handleChange}
                required
                placeholder="Number of Guests (min 15)"
                className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-600"
              />

              <select
                name="hall"
                value={formData.hall}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-600"
              >
                <option value="" disabled>
                  Select Hall
                </option>
                {halls.map((hall, index) => (
                  <option key={index} value={hall}>
                    {hall}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                disabled={loading}
                className={`${
                  loading ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
                } text-white rounded-full px-6 py-3 font-semibold shadow-lg transition-transform hover:scale-105 duration-300 mt-2`}
              >
                {loading ? "Submitting..." : "Confirm Reservation"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4 text-black">Thank You!</h2>
            <p className="text-gray-700 text-lg">
              Your reservation has been submitted successfully.
            </p>
            <button
              onClick={handleClose}
              className="mt-6 bg-red-600 hover:bg-red-700 text-white rounded-full px-6 py-3 font-semibold shadow-lg transition-transform hover:scale-105 duration-300"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationModal;
