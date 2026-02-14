// components/MenuSection.jsx
import React, { useEffect, useState } from "react";
import { useCart } from "../Context/CartContext";
import CartModal from "./CartModal";
import axios from "axios";
import getImageUrl from "../utils/getImageUrl";
import { API_BASE } from "../config";

const PLACEHOLDER = "https://via.placeholder.com/800x600?text=No+Image";

const MenuSection = () => {
  const [menu, setMenu] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [popup, setPopup] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await axios.get(`${API_BASE}/menu`);
      // Ensure we have a usable array and normalize fields
     const normalized = (res.data || []).map((m) => ({
  id: m._id ?? m.id ?? null,
  name: m.name ?? "Untitled",
  price: Number(m.price) || 0,
  image: m.image || PLACEHOLDER,
  description: m.description ?? "",
}));

      setMenu(normalized);
    } catch (err) {
      console.error("Failed to fetch menu:", err);
      setMenu([]);
    }
  };

  const handleAddToCart = (dish) => {
    addToCart({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      image: dish.image,
    });
    setPopup(dish.name);
    setTimeout(() => setPopup(null), 3000);
  };

  return (
    <section id="delivery" className="py-20 bg-white text-black w-full relative">
      {/* 🔥 Stylish Red Popup */}
      {popup && (
        <div className="fixed bottom-10 right-8 z-50 animate-slide-up">
          <div className="bg-gradient-to-r from-red-700 to-red-500 text-white shadow-2xl rounded-2xl px-8 py-5 flex flex-col items-center space-y-3 border border-white/20">
            <div className="flex items-center space-x-2">
              <p className="text-lg font-semibold">
                <span className="font-bold">{popup}</span> added to your cart
              </p>
            </div>

            <button
              onClick={() => {
                setCartOpen(true);
                setPopup(null);
              }}
              className="bg-white text-red-600 font-semibold px-6 py-2 rounded-full shadow-md hover:scale-105 transition-transform"
            >
              View Cart
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-12">
        <h2
          className="text-4xl md:text-5xl font-extrabold mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Our Menu
        </h2>
        <p
          className="text-lg text-gray-700"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Explore our popular dishes and add them to your cart.
        </p>
      </div>

      {/* Dish Grid (same styling as original) */}
     // ...
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 lg:px-20">
  {menu.slice(0, 8).map((dish, index) => ( // <-- slice first 8 items
    <div
      key={dish.id ?? index}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 flex flex-col items-center"
    >
      <img
        src={getImageUrl(dish.image)}
        alt={dish.name}
        className="w-full h-56 object-cover"
      />
      <div className="p-6 text-center flex flex-col items-center">
        <h3
          className="text-2xl font-bold mb-2 text-black"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {dish.name}
        </h3>
        <span className="text-red-600 font-semibold text-lg mb-4">
          Rs. {dish.price}
        </span>
        <p className="text-sm text-gray-600 mb-4">{dish.description}</p>
        <button
          onClick={() => handleAddToCart(dish)}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold shadow transition-transform hover:scale-105 duration-300"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  ))}
</div>


      {/* View Cart Button */}
      <div className="mt-12 flex justify-center">
        <button
          onClick={() => setCartOpen(true)}
          className="bg-black hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg transition-transform hover:scale-105 duration-300"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          View Cart
        </button>
      </div>

      <CartModal isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </section>
  );
};

export default MenuSection;
