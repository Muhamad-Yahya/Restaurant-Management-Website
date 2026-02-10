import React, { useState } from "react";
import axios from "axios";
import hall1 from "../assets/hall1.webp";
import hall2 from "../assets/hall2.webp";
import hall3 from "../assets/hall3.webp";
import hall4 from "../assets/hall4.webp";
import hall5 from "../assets/hall5.webp";
import hall6 from "../assets/hall6.webp";
import { FaChair, FaWineGlassAlt, FaUtensils } from "react-icons/fa";
import ReservationModal from "./ReservationModal"; // make sure the path is correct

const halls = [
  {
    image: hall1,
    icon: <FaChair size={40} className="text-red-600 mb-4" />,
    name: "Grand Hall",
    description:
      "Spacious hall suitable for large gatherings and events. Perfect for conferences and corporate events with elegant lighting and decor.",
    rate: "Rs. 1200 / per head",
  },
  {
    image: hall2,
    icon: <FaWineGlassAlt size={40} className="text-red-600 mb-4" />,
    name: "Banquet Hall",
    description:
      "Elegant hall ideal for weddings and receptions. Features a grand chandelier, stage area, and luxurious seating arrangements.",
    rate: "Rs. 1500 / per head",
  },
  {
    image: hall3,
    icon: <FaUtensils size={40} className="text-red-600 mb-4" />,
    name: "Private Lounge",
    description:
      "Cozy private space for intimate gatherings. Includes plush seating, ambient lighting, and personalized service.",
    rate: "Rs. 1000 / per head",
  },
  {
    image: hall4,
    icon: <FaChair size={40} className="text-red-600 mb-4" />,
    name: "Skyline Hall",
    description:
      "Modern hall with panoramic city views. Perfect for evening parties and elegant social events with a luxurious vibe.",
    rate: "Rs. 1800 / per head",
  },
  {
    image: hall5,
    icon: <FaWineGlassAlt size={40} className="text-red-600 mb-4" />,
    name: "Garden Hall",
    description:
      "Open-air hall surrounded by lush greenery. Ideal for casual celebrations and cocktail parties in a refreshing environment.",
    rate: "Rs. 1400 / per head",
  },
  {
    image: hall6,
    icon: <FaUtensils size={40} className="text-red-600 mb-4" />,
    name: "Royal Lounge",
    description:
      "Luxurious lounge with classic décor and VIP amenities. Perfect for high-end gatherings and exclusive events.",
    rate: "Rs. 2000 / per head",
  },
];

const Reservation = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [reservationData, setReservationData] = useState(null);
  const [message, setMessage] = useState("");

  const handleReservationSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/api/reservations", data);
      if (res.status === 201) {
        setMessage("✅ Reservation submitted successfully!");
      } else {
        setMessage("⚠️ Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Reservation error:", error);
      setMessage("❌ Failed to submit reservation. Server error.");
    }
  };

  return (
    <section id="reservation" className="py-20 bg-white text-black w-full">
      {/* Section Title */}
      <div className="text-center mb-12">
        <h2
          className="text-4xl md:text-5xl font-extrabold mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Hall Reservations
        </h2>
        <p
          className="text-lg text-gray-700"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Choose the perfect hall for your event and enjoy our exquisite services.
        </p>
      </div>

      {/* Hall Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 lg:px-20 mb-12">
        {halls.map((hall, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <img src={hall.image} alt={hall.name} className="w-full h-72 object-cover" />

            <div className="p-6 text-center">
              {hall.icon}
              <h3
                className="text-2xl font-bold mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {hall.name}
              </h3>
              <p
                className="text-gray-700 mb-4"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {hall.description}
              </p>
              <span className="text-red-600 font-semibold text-lg">{hall.rate}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Book Reservation Button */}
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={() => setModalOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg transition-transform hover:scale-105 duration-300"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Book a Reservation
        </button>

        {message && (
          <p className="text-green-600 font-medium text-lg text-center">{message}</p>
        )}
      </div>

      {/* Reservation Modal (passes data to backend) */}
      <ReservationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleReservationSubmit}
      />
    </section>
  );
};

export default Reservation;
