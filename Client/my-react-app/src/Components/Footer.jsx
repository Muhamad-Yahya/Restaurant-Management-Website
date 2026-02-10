import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-6 lg:px-20 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Brand Section */}
        <div className="text-center md:text-left">
          <h2
            className="text-3xl font-extrabold text-white mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Chinatown & Jade Café
          </h2>
          <p
            className="text-gray-400 leading-relaxed max-w-xs mx-auto md:mx-0"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            The tastiest spot in town <br></br> Where flavor meets elegance.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center">
          <h3
            className="text-xl font-semibold mb-4 text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Quick Links
          </h3>
          <ul
            className="space-y-2 text-gray-300"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <li><a href="#" className="hover:text-red-500 transition">Home</a></li>
            <li><a href="#delivery" className="hover:text-red-500 transition">Menu</a></li>
            <li><a href="#reservation" className="hover:text-red-500 transition">Reservation</a></li>
            <li><a href="#contact" className="hover:text-red-500 transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="text-center md:text-right">
          <h3
            className="text-xl font-semibold mb-4 text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Contact Us
          </h3>
          <ul
            className="space-y-2 text-gray-300"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <li className="flex items-center justify-center md:justify-end gap-2">
              <FaMapMarkerAlt className="text-red-600" /> Downtown, Karachi
            </li>
            <li className="flex items-center justify-center md:justify-end gap-2">
              <FaPhoneAlt className="text-red-600" /> +92 300 1234567
            </li>
            <li className="flex items-center justify-center md:justify-end gap-2">
              <FaEnvelope className="text-red-600" /> info@jadecafe.com
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col items-center">
        {/* Social Icons */}
        <div className="flex space-x-6 mb-6">
          <a href="#" className="text-gray-400 hover:text-red-600 transition text-xl"><FaFacebookF /></a>
          <a href="#" className="text-gray-400 hover:text-red-600 transition text-xl"><FaInstagram /></a>
          <a href="#" className="text-gray-400 hover:text-red-600 transition text-xl"><FaTwitter /></a>
        </div>

        {/* Copyright */}
        <p
          className="text-gray-500 text-sm"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          © {new Date().getFullYear()} Chinatown & Jade Café. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
