import React, { useState, useEffect } from "react";
import img1 from "../assets/1.webp";
import img2 from "../assets/2.webp";
import img3 from "../assets/3.webp";
import img4 from "../assets/4.webp";
import img5 from "../assets/5.webp";
import img6 from "../assets/6.webp";

const images = [img1, img2, img3, img4, img5, img6];

const AutoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-white text-black">
      {/* Heading */}
      <div className="text-center mb-8">
        <h2
          className="text-4xl md:text-5xl font-extrabold text-black mb-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Gallery
        </h2>
        <p
          className="text-lg text-gray-700"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Take a look at our delicious dishes and vibrant restaurant ambiance.
        </p>
      </div>

      {/* Carousel */}
      <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-lg">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {images.map((img, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 flex items-center justify-center bg-black"
            >
              <img
                src={img}
                alt={`Slide ${index}`}
                className="w-full max-w-[700px] h-[250px] md:h-[320px] object-contain rounded-xl"
              />
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-red-600 scale-110"
                  : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AutoCarousel;
