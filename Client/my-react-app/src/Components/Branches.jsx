// components/Branches.jsx
import React, { useState } from "react";
import BranchModal from "./BranchModal";
import { jadeMenu } from "../Data/menuData"; // optional fallback if you want
import jadeCafe from "../assets/Jade Hero.webp";
import chinaTown from "../assets/ChinaTown.jpg";
import virasat from "../assets/about-image.webp";

/**
 * NOTE: we now include a slug for each branch.
 * The slug is used to fetch branch-specific menus from backend:
 * GET /api/menu?branch=jade-cafe
 */
const subRestaurants = [
  {
    name: "Jade Café",
    slug: "jade-cafe",
    desc: "A fusion of elegance and flavor, Jade Café offers a modern dining experience with a blend of continental and Asian cuisines, served in a warm and contemporary ambiance.",
    image: jadeCafe,
  },
  {
    name: "ChinaTown",
    slug: "chinatown",
    desc: "Step into a world of authentic Chinese flavors. From dim sums to sizzling Szechuan dishes, ChinaTown brings traditional taste and oriental charm to your table.",
    image: chinaTown,
  },
  {
    name: "Virasat",
    slug: "virasat",
    desc: "Where heritage meets taste. Virasat celebrates the rich culture of Pakistan through royal Mughlai and desi dishes served in a classic, regal environment.",
    image: virasat,
  },
];

const Branches = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMenuMeta, setSelectedMenuMeta] = useState(null);

  const handleViewMenu = (place) => {
    // pass only metadata (branchName + slug) — BranchModal will fetch data
    setSelectedMenuMeta({ branchName: place.name, slug: place.slug });
    setModalOpen(true);
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-red-50 text-black w-full">
      {/* Section Header */}
      <div className="text-center mb-12 sm:mb-16 px-4 sm:px-6">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Explore Our Kitchens
        </h2>
        <p
          className="text-sm sm:text-base md:text-lg text-gray-700 max-w-xl sm:max-w-2xl mx-auto leading-relaxed"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Experience a world of flavors under one roof — from fine dining to authentic oriental and traditional Pakistani cuisine.
        </p>
      </div>

      {/* Alternating Cards */}
      <div className="flex flex-col gap-8 sm:gap-12 px-4 sm:px-6 lg:px-20">
        {subRestaurants.map((place, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 sm:hover:-translate-y-2 ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image Section */}
            <div className="md:w-1/2 w-full h-48 sm:h-64 md:h-80 overflow-hidden relative">
              <img
                src={place.image}
                alt={place.name}
                className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 md:from-black/40 to-transparent"></div>
            </div>

            {/* Text Section */}
            <div className="md:w-1/2 w-full p-6 sm:p-8 text-center md:text-left flex flex-col justify-center items-center md:items-start">
              <h3
                className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 text-black"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {place.name}
              </h3>
              <p
                className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed max-w-full md:max-w-md"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {place.desc}
              </p>
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold shadow-lg transition-transform hover:scale-105 text-sm sm:text-base"
                style={{ fontFamily: "'Poppins', sans-serif" }}
                onClick={() => handleViewMenu(place)}
              >
                View Menu
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Branch Modal */}
      {selectedMenuMeta && (
        <BranchModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          menuMeta={selectedMenuMeta}
        />
      )}
    </section>
  );
};

export default Branches;
