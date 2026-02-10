import React from "react";
import promoImage from "../assets/p.jfif"; // Replace with your promo image

const Offer = () => {
  // Function to scroll to the Delivery section
  const handleScrollToDelivery = () => {
    const deliverySection = document.getElementById("delivery");
    if (deliverySection) {
      deliverySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 bg-white text-black">
      <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center gap-12">
        
        {/* Left Column: Text */}
        <div className="w-full lg:w-1/2 text-center">
          <h2
            className="text-4xl md:text-5xl font-extrabold mb-4 text-black"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Seasonal Promotions
          </h2>

          <p
            className="text-lg text-gray-700 mb-8 max-w-md mx-auto"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Enjoy our special seasonal offers! Limited-time discounts on selected dishes.
            Treat yourself and your loved ones to the finest flavors in town.
          </p>

          {/* Discount Counter */}
          <div
            className="text-6xl font-extrabold text-red-600 mb-8"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            50% OFF
          </div>

          {/* Button */}
          <div className="flex justify-center">
            <button
              onClick={handleScrollToDelivery}
              className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-full font-semibold shadow-lg transition-transform hover:scale-105 duration-300"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Order Now
            </button>
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={promoImage}
            alt="Seasonal Promotion"
            className="rounded-2xl shadow-lg object-cover w-[90%] h-72 md:h-[380px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Offer;
