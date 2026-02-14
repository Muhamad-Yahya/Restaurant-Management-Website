import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:3000/api/admin/reservations";

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReservations = async () => {
    try {
      const res = await axios.get(API);
      setReservations(res.data);
    } catch (err) {
      console.error("Error fetching reservations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  if (loading) return <p className="text-gray-500">Loading reservations...</p>;

  if (reservations.length === 0)
    return <p className="text-gray-500">No reservations yet.</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Reservations</h2>

      {/* Table for larger screens */}
      <div className="hidden md:block">
        <table className="w-full table-auto border-collapse shadow rounded-lg overflow-hidden">
          <thead className="bg-red-100 text-gray-700">
            <tr>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Phone</th>
              <th className="border px-4 py-2 text-left">Date</th>
              <th className="border px-4 py-2 text-left">Time</th>
              <th className="border px-4 py-2 text-left">Guests</th>
              <th className="border px-4 py-2 text-left">Hall</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {reservations.map((r) => (
              <tr
                key={r._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="border px-4 py-2">{r.name}</td>
                <td className="border px-4 py-2">{r.phone}</td>
                <td className="border px-4 py-2">{r.date}</td>
                <td className="border px-4 py-2">{r.time}</td>
                <td className="border px-4 py-2">{r.guests}</td>
                <td className="border px-4 py-2">{r.hall}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for mobile */}
      <div className="md:hidden flex flex-col gap-4">
        {reservations.map((r) => (
          <div
            key={r._id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-800">{r.name}</h3>
              <span className="text-sm text-gray-500">{r.hall}</span>
            </div>
            <p className="text-gray-700 mb-1">
              <strong>Phone:</strong> {r.phone}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Date:</strong> {r.date}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Time:</strong> {r.time}
            </p>
            <p className="text-gray-700">
              <strong>Guests:</strong> {r.guests}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminReservations;
