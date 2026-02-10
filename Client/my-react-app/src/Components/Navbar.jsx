import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../Context/CartContext";
import CartModal from "./CartModal";

const Navbar = () => {
  const { cartItems } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 h-20 left-0 w-full bg-[#fffaf0]/90 backdrop-blur-md border-b border-[#d4af37] shadow-md z-50 flex items-center justify-center py-4">
        {/* Centered Title */}
        <h1 className="text-black text-lg md:text-xl tracking-[0.25em] uppercase font-semibold text-center absolute left-1/2 transform -translate-x-1/2">
          Chinatown & Jade Café
        </h1>

        {/* Cart Icon (Right Corner) */}
        <button
          onClick={() => setCartOpen(true)}
          className="absolute right-6 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-md transition-transform hover:scale-110"
        >
          <FaShoppingCart className="text-xl" />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-white text-red-600 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
              {cartItems.length}
            </span>
          )}
        </button>
      </nav>

      {/* Cart Modal */}
      <CartModal isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;
