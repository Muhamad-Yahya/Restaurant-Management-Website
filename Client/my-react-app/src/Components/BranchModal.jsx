// components/BranchModal.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import { useCart } from "../Context/CartContext";
import CartModal from "./CartModal";
import getImageUrl from "../utils/getImageUrl";

const API_BASE = "http://localhost:3000/api";
const PLACEHOLDER = "https://via.placeholder.com/400x300?text=No+Image";

/**
 * Props:
 *  - isOpen: boolean
 *  - onClose: function
 *  - menuMeta: { branchName: string, slug: string }
 */
const BranchModal = ({ isOpen, onClose, menuMeta }) => {
  const [menu, setMenu] = useState([]);
  const [grouped, setGrouped] = useState({});
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [popup, setPopup] = useState(null);
  const { addToCart, cartItems } = useCart();

  // Fetch menu on open
  useEffect(() => {
    if (isOpen && menuMeta?.slug) {
      fetchMenu(menuMeta.slug);
    }
    // reset when closed
    if (!isOpen) {
      setMenu([]);
      setGrouped({});
      setCategories([]);
      setActiveTab(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, menuMeta?.slug]);

  // Group menu by category whenever menu changes
  useEffect(() => {
    const map = {};
    // Remove duplicates based on id
    const uniqueMenu = Array.from(new Map(menu.map(item => [item.id, item])).values());

    uniqueMenu.forEach((item) => {
      const cat = item.category || "Uncategorized";
      if (!map[cat]) map[cat] = [];
      map[cat].push(item);
    });

    setGrouped(map);
    const cats = Object.keys(map);
    setCategories(cats);
    if (!activeTab && cats.length) setActiveTab(cats[0]);
  }, [menu]);

  // Fetch menu function
  const fetchMenu = async (slug) => {
    try {
      const url = slug ? `${API_BASE}/menu?branch=${encodeURIComponent(slug)}` : `${API_BASE}/menu`;
      const res = await axios.get(url);

      // normalize items
      const normalized = (res.data || []).map((m) => ({
        id: m._id ?? m.id ?? m.uuid ?? null,
        name: m.name ?? "Untitled",
        price: Number(m.price) || 0,
        image: m.image ?? PLACEHOLDER,
        description: m.description ?? "",
        category: m.category ?? "Uncategorized",
      }));

      setMenu(normalized);
    } catch (err) {
      console.error("fetch menu error", err);
      setMenu([]);
    }
  };

  if (!isOpen) return null;

  const handleAddToCart = (item) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: Number(item.price) || 0,
      image: getImageUrl(item.image || PLACEHOLDER),
      quantity: 1,
    });
    setPopup(item.name);
    setTimeout(() => setPopup(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      {/* Popup Notification */}
      {popup && (
        <div className="fixed bottom-10 right-4 sm:right-8 z-[100] animate-slide-up">
          <div className="bg-gradient-to-r from-red-700 to-red-500 text-white shadow-2xl rounded-2xl px-4 sm:px-6 py-3 sm:py-4 flex flex-col items-center space-y-2 border border-white/20">
            <p className="text-xs sm:text-sm font-semibold text-center">
              <span className="font-bold">{popup}</span> added to your cart
            </p>
            <button
              onClick={() => {
                setCartOpen(true);
                setPopup(null);
              }}
              className="bg-white text-red-600 font-semibold px-3 sm:px-4 py-1 sm:py-2 rounded-full shadow-md hover:scale-105 transition-transform text-xs sm:text-sm"
            >
              View Cart
            </button>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-lg shadow-md z-30 flex items-center justify-between px-3 sm:px-6 md:px-16 py-2 sm:py-3">
        <button
          onClick={onClose}
          className="flex items-center gap-1 sm:gap-2 text-gray-700 hover:text-red-600 font-semibold transition-all"
        >
          <FaArrowLeft className="text-base sm:text-lg" />
          <span className="hidden sm:inline text-sm">Back</span>
        </button>

        {/* Centered Name */}
        <h2
          className="absolute left-1/2 transform -translate-x-1/2 text-lg sm:text-xl md:text-2xl font-bold text-red-600 whitespace-nowrap"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {menuMeta?.branchName ?? "Branch"}
        </h2>

        <button
          onClick={() => setCartOpen(true)}
          className="relative flex items-center justify-center text-gray-700 hover:text-red-600 transition-all"
        >
          <FaShoppingCart className="text-lg sm:text-xl" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] sm:text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </button>
      </header>

      {/* CATEGORY TABS */}
      <div className="flex justify-center flex-wrap gap-2 sm:gap-4 mt-4 sm:mt-6 mb-6 px-2 sm:px-6">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(cat)}
            className={`px-3 sm:px-5 py-1 sm:py-2 rounded-full font-semibold transition-all duration-300 shadow-sm whitespace-nowrap text-xs sm:text-sm ${
              activeTab === cat
                ? "bg-red-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-red-100"
            }`}
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* MENU ITEMS */}
      <div className="px-2 sm:px-6 md:px-16 pb-16">
        <h3
          className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 text-center"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {activeTab}
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
          {(grouped[activeTab] || []).map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col border border-gray-100 hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-full h-32 sm:h-40 md:h-48 overflow-hidden">
                <img
                  src={getImageUrl(item.image)}
                  alt={item.name}
                  className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="p-2 sm:p-3 md:p-4 flex flex-col flex-1">
                <h4
                  className="text-xs sm:text-sm md:text-lg font-semibold mb-1 text-black text-center"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {item.name}
                </h4>
                <p
                  className="text-[10px] sm:text-xs md:text-sm text-gray-600 mb-2 sm:mb-3 flex-1 text-center"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {item.description}
                </p>
                <div className="flex items-center justify-center gap-2 sm:gap-3 mt-auto">
                  <span
                    className="text-red-600 font-semibold text-xs sm:text-sm md:text-base"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Rs. {item.price}
                  </span>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-red-600 hover:bg-red-700 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full font-semibold shadow text-[10px] sm:text-xs md:text-sm transition-transform hover:scale-105"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CartModal isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      <footer className="text-center py-4 sm:py-6 bg-gray-50 text-gray-500 text-xs sm:text-sm font-medium">
        <p>
          © {new Date().getFullYear()} {menuMeta?.branchName ?? "Our Branch"}. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default BranchModal;
