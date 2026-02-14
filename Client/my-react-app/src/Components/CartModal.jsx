// components/CartModal.jsx
import React, { useState } from "react";
import { useCart } from "../Context/CartContext";
import axios from "axios";
import getImageUrl from "../utils/getImageUrl";
import { API_BASE } from "../config";




const CartModal = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();
  const [step, setStep] = useState("cart");
  const [formData, setFormData] = useState({ name: "", phone: "", address: "" });

  // Ensure numbers are used for math
  const total = cartItems.reduce((sum, i) => sum + (Number(i.price) || 0) * (i.quantity || 1), 0);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // normalize items to send
      const payload = {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
      items: cartItems.map((it) => ({
  id: it.id ?? it._id ?? null, // <-- MongoDB _id
  name: it.name,
  price: Number(it.price) || 0,
  quantity: it.quantity || 1,
})),

        totalPrice: total,
      };

      await axios.post(`${API_BASE}/orders`, payload);
      clearCart();
      setStep("confirmation");
    } catch (err) {
      console.error("Order submission failed:", err);
      alert("Failed to place order. Try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center backdrop-blur-sm">
      <div className="bg-white text-black rounded-3xl shadow-2xl w-11/12 max-w-2xl p-6 sm:p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-3xl font-bold transition-transform hover:scale-110"
        >
          &times;
        </button>

        {/* CART STEP */}
        {step === "cart" && (
          <>
            <h2
              className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-900"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              My Cart
            </h2>

            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500">Your cart is empty.</p>
            ) : (
              <>
                <ul className="divide-y divide-gray-200 mb-6">
                  {cartItems.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between py-3"
                    >
                      {/* Left side: image + name */}
                      <div className="flex items-center gap-4">
                        <img
                        src={getImageUrl(item.image)} 

                          alt={item.name}
                          className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover border border-gray-200"
                        />
                        <div>
                          <p className="font-semibold text-base sm:text-lg">{item.name}</p>
                          <p className="text-xs sm:text-sm text-gray-500">
                            Rs. {item.price} each
                          </p>
                        </div>
                      </div>

                      {/* Right side: quantity controls + total */}
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
                          <button
                            onClick={() =>
                              item.quantity > 1
                                ? updateQuantity(item.name, item.quantity - 1)
                                : removeFromCart(item.name)
                            }
                            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-red-600 text-white text-sm sm:text-base font-bold flex items-center justify-center hover:bg-red-700 transition-colors"
                          >
                            –
                          </button>
                          <span className="text-sm sm:text-base font-semibold w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.name, item.quantity + 1)
                            }
                            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-red-600 text-white text-sm sm:text-base font-bold flex items-center justify-center hover:bg-red-700 transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <p className="font-bold text-gray-800 text-sm sm:text-base">
                          Rs. {Number(item.price || 0) * (item.quantity || 1)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <h3 className="text-lg sm:text-xl font-bold text-center mb-6">
                  Total: Rs. {total}
                </h3>

                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                  <button
                    onClick={() => setStep("checkout")}
                    className="bg-red-600 text-white px-5 sm:px-6 py-2 rounded-full font-semibold hover:bg-red-700 transition-transform hover:scale-105 text-sm sm:text-base"
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    onClick={onClose}
                    className="border border-gray-400 text-gray-700 px-5 sm:px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-transform hover:scale-105 text-sm sm:text-base"
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </>
        )}

        {/* CHECKOUT STEP */}
        {step === "checkout" && (
          <>
            <h2
              className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-900"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Checkout
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-600 focus:outline-none text-sm sm:text-base"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-600 focus:outline-none text-sm sm:text-base"
              />
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Delivery Address"
                required
                className="border border-gray-300 rounded-xl px-4 py-3 h-24 resize-none focus:ring-2 focus:ring-red-600 focus:outline-none text-sm sm:text-base"
              />
              <button
                type="submit"
                className="bg-red-600 text-white py-3 rounded-full font-bold text-lg shadow-md hover:bg-red-700 transition-transform hover:scale-105"
              >
                Place Order
              </button>
              <button
                type="button"
                onClick={() => setStep("cart")}
                className="text-sm text-gray-600 hover:underline mt-2"
              >
                ← Back to Cart
              </button>
            </form>
          </>
        )}

        {/* CONFIRMATION STEP */}
        {step === "confirmation" && (
          <div className="text-center py-12">
            <h2
              className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Thank You!
            </h2>
            <p className="text-sm sm:text-lg mb-6 text-gray-700">
              Your order has been placed successfully.  
              We’ll deliver your food shortly!
            </p>
            <button
              onClick={onClose}
              className="bg-red-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold shadow-lg hover:bg-red-700 transition-transform hover:scale-105 text-sm sm:text-base"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
