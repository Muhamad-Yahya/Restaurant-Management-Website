// components/AdminReservations.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:3000/api/admin/reservations";

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);

  const fetchReservations = async () => {
    try {
      const res = await axios.get(API);
      setReservations(res.data);
    } catch (err) {
      console.error("Error fetching reservations:", err);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-3">Reservations</h2>
      {reservations.length === 0 ? (
        <p>No reservations yet.</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-red-50">
              <th className="border p-2">Name</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Time</th>
              <th className="border p-2">Guests</th>
              <th className="border p-2">Hall</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((r) => (
              <tr key={r._id} className="hover:bg-gray-50">
                <td className="border p-2">{r.name}</td>
                <td className="border p-2">{r.phone}</td>
                <td className="border p-2">{r.date}</td>
                <td className="border p-2">{r.time}</td>
                <td className="border p-2">{r.guests}</td>
                <td className="border p-2">{r.hall}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminReservations;
