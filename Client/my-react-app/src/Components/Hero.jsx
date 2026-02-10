import React, { useState } from "react";
import heroImage from "../assets/Jade Hero.webp";
import { FaShoppingCart } from "react-icons/fa";
import CartModal from "./CartModal";
import { useCart } from "../Context/CartContext";

const Hero = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const { cartItems } = useCart();

  const scrollToReservation = () => {
    const section = document.getElementById("reservation");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative h-screen bg-cover bg-center flex flex-col justify-between text-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/70"></div>

    

      {/* 🌆 Hero Main Content */}
      <div className="relative z-10 text-white px-4 flex-1 flex flex-col items-center justify-center">
        <p className="text-lg md:text-xl uppercase tracking-widest text-red-400 font-semibold mb-3">
          Since 2015
        </p>

        <h1
          className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight drop-shadow-lg"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          The Tastiest Spot in Town!
        </h1>

        <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl">
          Experience culinary perfection with every bite. Where passion meets flavor,
          and every dish tells a story.
        </p>

        <button
          onClick={scrollToReservation}
          className="bg-red-600 hover:bg-red-700 transition-all px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:scale-105 duration-300"
        >
          Book a Reservation
        </button>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/70 to-transparent"></div>

      {/* Cart Modal */}
      <CartModal isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </section>
  );
};

export default Hero;
