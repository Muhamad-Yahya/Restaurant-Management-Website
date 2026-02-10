// pages/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { Clock, CheckCircle, Calendar, Utensils, LogOut, Lock } from "lucide-react";
import AdminOrders from "../Components/AdminOrders.jsx";
import AdminReservations from "../Components/AdminReservations.jsx";
import AdminMenu from "../Components/AdminMenu.jsx";

const ADMIN_EMAIL = "admin@jade.com";
const ADMIN_PASSWORD = "admin123";

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("orders");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Check login state on page load
  useEffect(() => {
    const loggedIn = localStorage.getItem("isAdminLoggedIn");
    if (loggedIn === "true") setIsLoggedIn(true);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      localStorage.setItem("isAdminLoggedIn", "true");
      setEmail("");
      setPassword("");
      setError("");
    } else {
      setError("Invalid email or password");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isAdminLoggedIn");
  };

  if (!isLoggedIn) {
    // 🔐 LOGIN FORM
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-2xl shadow-lg w-96"
        >
          <div className="flex items-center justify-center mb-6">
            <Lock size={32} className="text-red-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">Admin Login</h2>
          </div>

          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mb-3"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mb-3"
            required
          />
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <button className="w-full bg-red-600 text-white py-2 rounded">
            Login
          </button>
        </form>
      </div>
    );
  }

  // ✅ Admin Dashboard after login
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Restaurant Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-4 py-2 rounded ${
            activeTab === "orders" ? "bg-red-600 text-white" : "bg-white border"
          }`}
        >
          Orders
        </button>
        <button
          onClick={() => setActiveTab("reservations")}
          className={`px-4 py-2 rounded ${
            activeTab === "reservations" ? "bg-red-600 text-white" : "bg-white border"
          }`}
        >
          Reservations
        </button>
        <button
          onClick={() => setActiveTab("menu")}
          className={`px-4 py-2 rounded ${
            activeTab === "menu" ? "bg-red-600 text-white" : "bg-white border"
          }`}
        >
          Menu
        </button>
      </div>

      {/* Tab content */}
      {activeTab === "orders" && <AdminOrders />}
      {activeTab === "reservations" && <AdminReservations />}
      {activeTab === "menu" && <AdminMenu />}
    </div>
  );
};

export default AdminDashboard;
