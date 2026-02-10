import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:3000/api/admin";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all orders on mount
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_BASE}/orders`);
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

      // ✅ Correct endpoint: /orders/:id/status
      const res = await axios.put(`${API_BASE}/orders/${orderId}/status`, {
        status: "Completed",
      });

      // Update local state to reflect backend change
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

  // Separate orders by status
  const pendingOrders = orders.filter((o) => o.status === "Pending");
  const completedOrders = orders.filter((o) => o.status === "Completed");

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Orders</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      {/* Pending Orders */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Pending Orders</h3>
        {pendingOrders.length === 0 && <p>No pending orders.</p>}
        {pendingOrders.map((order) => (
          <div
            key={order._id}
            className="p-2 border rounded mb-2 flex justify-between items-center"
          >
            <div>
              <p>
                <strong>{order.name}</strong> - {order.phone}
              </p>
              <p>{order.items.map((i) => i.name).join(", ")}</p>
              <p>Total: Rs. {order.totalPrice}</p>
            </div>
            <button
              onClick={() => markCompleted(order._id)}
              disabled={loading}
              className={`px-3 py-1 rounded text-white ${
                loading ? "bg-gray-400" : "bg-green-600"
              }`}
            >
              Mark Completed
            </button>
          </div>
        ))}
      </div>

      {/* Completed Orders */}
      <div>
        <h3 className="font-semibold mb-2">Completed Orders</h3>
        {completedOrders.length === 0 && <p>No completed orders yet.</p>}
        {completedOrders.map((order) => (
          <div
            key={order._id}
            className="p-2 border rounded mb-2 bg-green-50"
          >
            <p>
              <strong>{order.name}</strong> - {order.phone}
            </p>
            <p>{order.items.map((i) => i.name).join(", ")}</p>
            <p>Total: Rs. {order.totalPrice}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;
