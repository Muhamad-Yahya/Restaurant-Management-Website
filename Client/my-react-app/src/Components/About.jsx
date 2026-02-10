import React from "react";
import aboutImage from "../assets/about-image.webp"; // replace with your actual image file

const AboutSection = () => {
  return (
    <section className="py-20 bg-white text-black w-full">
      <div className="flex flex-col lg:flex-row items-center lg:gap-20 gap-12 px-4 lg:px-12 w-full">
        
        {/* Image Left */}
        <div className="w-full lg:w-1/2">
          <img
            src={aboutImage}
            alt="Restaurant Interior"
            className="rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500 max-h-[400px] lg:max-h-[500px] w-full object-cover"
          />
        </div>

        {/* Text Right */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h2
            className="text-4xl md:text-5xl font-extrabold text-black mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Discover the Taste of Perfection
          </h2>

          <h3
            className="text-xl text-red-600 font-semibold mb-6"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Where Flavor Meets Elegance
          </h3>

          <p
            className="text-lg text-gray-700 leading-relaxed mb-8"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            At <span style={{ fontWeight: 600 }}>Chinatown & Jade Café</span>, we take pride in blending authentic Asian culinary traditions with modern artistry. From handcrafted dishes to elegant ambiance, every detail is designed to delight your senses and create an unforgettable dining experience.
          </p>

          {/* Centered Button */}
          <div className="flex justify-center lg:justify-start">
            <a
              href="https://www.google.com/search?q=jade+cafe+multan+&sca_esv=0e371b12cf7989f4&sxsrf=AE3TifNSbhv0h3tmw4au4zrLIVXW8M7ggw%3A1759943377051&ei=0ZrmaLzwAta8kdUPs5WG2QI&ved=0ahUKEwj8nMH-i5WQAxVWXqQEHbOKISsQ4dUDCBA&uact=5&oq=jade+cafe+multan+&gs_lp=Egxnd3Mtd2l6LXNlcnAiEWphZGUgY2FmZSBtdWx0YW4gMgQQIxgnMg0QLhiABBjHARgNGK8BMgcQABiABBgNMgcQABiABBgNMgcQABiABBgNMgYQABgWGB4yBhAAGBYYHjIGEAAYFhgeMgYQABgWGB4yBhAAGBYYHkiOIVDeB1iSH3ABeAGQAQCYAYcCoAGnDaoBAzItN7gBA8gBAPgBAZgCAqAC5wLCAgoQABiwAxjWBBhHmAMA4gMFEgExIECIBgGQBgiSBwUxLjMtMaAHhC-yBwMzLTG4B60CwgcDNS0yyAdm&sclient=gws-wiz-serp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-white border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-3 rounded-full font-semibold shadow transition-transform hover:scale-105 duration-300">
                Learn More
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
