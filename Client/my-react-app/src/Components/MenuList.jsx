// components/MenuList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:3000/api";
const PLACEHOLDER = "https://via.placeholder.com/400x300?text=No+Image";

const MenuList = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await axios.get(`${API_BASE}/menu`);
      const normalized = (res.data || []).map((m) => ({
  id: m._id ?? m.id ?? null,
  name: m.name ?? "Untitled",
  description: m.description ?? "",
  price: Number(m.price) || 0,
  image: m.image || PLACEHOLDER,
}));

      setMenu(normalized);
    } catch (err) {
      console.error("Failed to fetch menu:", err);
      setMenu([]);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {menu.map((item) => (
        <div key={item.id} className="bg-white p-4 rounded-lg shadow">
          <div className="w-full h-40 overflow-hidden mb-3">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
          </div>
          <h3 className="font-bold text-lg">{item.name}</h3>
          <p className="text-sm text-gray-600">{item.description}</p>
          <p className="font-semibold mt-2">Rs. {item.price}</p>
          {/* keep button area for future cart integration */}
        </div>
      ))}
    </div>
  );
};

export default MenuList;
