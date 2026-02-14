import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "../config";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all orders on mount
  const fetchOrders = async () => {
    try {
const res = await axios.get(`${API_BASE}/admin/orders`);
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Mark order as completed
  const markCompleted = async (orderId) => {
    try {
      setLoading(true);
      const res = await axios.put(`${API_BASE}/admin/orders/${orderId}/status`, { status: "Completed" });

      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? res.data : o))
      );
    } catch (err) {
      console.error("Error updating order:", err);
      setError("Failed to update order status");
    } finally {
      setLoading(false);
    }
  };

  const pendingOrders = orders.filter((o) => o.status === "Pending");
  const completedOrders = orders.filter((o) => o.status === "Completed");

  // Badge color based on status
  const getStatusBadge = (status) => {
    if (status === "Pending") return "bg-yellow-200 text-yellow-800";
    if (status === "Completed") return "bg-green-200 text-green-800";
    return "bg-gray-200 text-gray-800";
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Orders</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Pending Orders */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Pending Orders</h3>
        {pendingOrders.length === 0 && (
          <p className="text-gray-500">No pending orders.</p>
        )}
        {pendingOrders.map((order) => (
          <div
            key={order._id}
            className="p-4 mb-4 border rounded-lg shadow hover:shadow-lg transition-shadow bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-semibold text-gray-800">
                  {order.name} - {order.phone}
                </p>
                <span
                  className={`px-2 py-0.5 text-xs rounded-full ${getStatusBadge(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>
              <p className="text-gray-700 mb-2">
                <strong>Address:</strong> {order.address || "N/A"}
              </p>
              <ul className="text-gray-700">
                {order.items.map((i, idx) => (
                  <li key={idx}>
                    {i.name} x <span className="font-medium">{i.quantity}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 font-semibold text-gray-900">
                Total: Rs. {order.totalPrice}
              </p>
            </div>
            <button
              onClick={() => markCompleted(order._id)}
              disabled={loading}
              className={`mt-3 md:mt-0 px-4 py-2 rounded-lg text-white font-semibold ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              } transition-colors`}
            >
              Mark Completed
            </button>
          </div>
        ))}
      </div>

      {/* Completed Orders */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Completed Orders</h3>
        {completedOrders.length === 0 && (
          <p className="text-gray-500">No completed orders yet.</p>
        )}
        {completedOrders.map((order) => (
          <div
            key={order._id}
            className="p-4 mb-4 border-l-4 border-green-500 rounded-lg shadow bg-green-50 flex flex-col gap-2"
          >
            <div className="flex items-center gap-2">
              <p className="font-semibold text-gray-800">
                {order.name} - {order.phone}
              </p>
              <span
                className={`px-2 py-0.5 text-xs rounded-full ${getStatusBadge(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>
            <p className="text-gray-700">
              <strong>Address:</strong> {order.address || "N/A"}
            </p>
            <ul className="text-gray-700">
              {order.items.map((i, idx) => (
                <li key={idx}>
                  {i.name} x <span className="font-medium">{i.quantity}</span>
                </li>
              ))}
            </ul>
            <p className="font-semibold text-gray-900">
              Total: Rs. {order.totalPrice}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;
