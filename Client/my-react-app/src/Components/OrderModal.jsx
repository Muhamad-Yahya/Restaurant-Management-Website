import React, { useState } from "react";

const OrderModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order Submitted:", formData);
    setSubmitted(true); // show confirmation message
  };

  const handleClose = () => {
    setSubmitted(false);
    setFormData({ name: "", phone: "", address: "" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl w-11/12 max-w-lg p-8 relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl font-bold"
        >
          &times;
        </button>

        {!submitted ? (
          <>
            {/* Title */}
            <h2
              className="text-2xl font-bold mb-6 text-center"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Place Your Order
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              />
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Delivery Address"
                required
                className="border border-gray-300 rounded-xl px-4 py-3 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-red-600"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6 py-3 font-semibold shadow-lg transition-transform hover:scale-105 duration-300 mt-2"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Place Order
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-12">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Thank You!
            </h2>
            <p
              className="text-gray-700 text-lg"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Your order will be delivered shortly.
            </p>
            <button
              onClick={handleClose}
              className="mt-6 bg-red-600 hover:bg-red-700 text-white rounded-full px-6 py-3 font-semibold shadow-lg transition-transform hover:scale-105 duration-300"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderModal;
