import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:3000/api/admin/menu";
const BRANCHES = ["Jade Café", "ChinaTown", "Virasat"];

const AdminMenu = () => {
  const [menu, setMenu] = useState([]);
  const [editing, setEditing] = useState({});
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    image: "",
    branch: BRANCHES[0],
    slug: "",
  });
  const [message, setMessage] = useState("");

  const fetchMenu = async () => {
    try {
      const res = await axios.get(API);
      setMenu(res.data);

      const editState = {};
      res.data.forEach((item) => {
        editState[item._id] = { ...item };
      });
      setEditing(editState);
    } catch (err) {
      console.error("Error fetching menu:", err);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleChange = (id, field, value) => {
    setEditing((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleNewChange = (field, value) => {
    setNewItem((prev) => ({ ...prev, [field]: value }));
  };

  const saveItem = async (id) => {
    try {
      await axios.put(`${API}/${id}`, editing[id]);
      fetchMenu();
      setMessage("Changes saved successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Error saving item:", err);
      setMessage("Failed to save changes.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchMenu();
      setMessage("Item deleted successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Error deleting item:", err);
      setMessage("Failed to delete item.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const addItem = async (e) => {
    e.preventDefault();
    try {
      // auto-generate slug from name
      const slug = newItem.name.toLowerCase().replace(/\s+/g, "-");
      await axios.post(API, { ...newItem, slug });
      fetchMenu();
      setMessage("New item added successfully!");
      setTimeout(() => setMessage(""), 3000);

      // reset new item form
      setNewItem({
        name: "",
        description: "",
        price: 0,
        category: "",
        image: "",
        branch: BRANCHES[0],
        slug: "",
      });
    } catch (err) {
      console.error("Error adding item:", err);
      setMessage("Failed to add item.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow overflow-x-auto relative">
      <h2 className="text-xl font-bold mb-4">Admin Menu</h2>

      {/* Success / Error Message */}
      {message && (
        <div className="absolute top-2 right-2 bg-green-200 text-green-800 px-4 py-2 rounded shadow">
          {message}
        </div>
      )}

      {/* Add New Item Form */}
      <form
        onSubmit={addItem}
        className="mb-6 p-4 border rounded bg-gray-50 flex flex-wrap gap-3 items-end"
      >
        <input
          type="text"
          placeholder="Name"
          value={newItem.name}
          onChange={(e) => handleNewChange("name", e.target.value)}
          className="border px-2 py-1 rounded flex-1"
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={newItem.category}
          onChange={(e) => handleNewChange("category", e.target.value)}
          className="border px-2 py-1 rounded flex-1"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={newItem.price}
          onChange={(e) => handleNewChange("price", e.target.value)}
          className="border px-2 py-1 rounded w-24"
          required
        />
        <select
          value={newItem.branch}
          onChange={(e) => handleNewChange("branch", e.target.value)}
          className="border px-2 py-1 rounded w-40"
        >
          {BRANCHES.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Description"
          value={newItem.description}
          onChange={(e) => handleNewChange("description", e.target.value)}
          className="border px-2 py-1 rounded flex-1"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newItem.image}
          onChange={(e) => handleNewChange("image", e.target.value)}
          className="border px-2 py-1 rounded flex-1"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Item
        </button>
      </form>

      {/* Existing Menu Items Table */}
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-red-50">
            <th className="border p-2">Name</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Branch</th>
            <th className="border p-2">Price (Rs)</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {menu.map((item) => (
            <tr key={item._id}>
              <td className="border p-2">
                <input
                  value={editing[item._id]?.name ?? ""}
                  onChange={(e) => handleChange(item._id, "name", e.target.value)}
                  className="border px-2 py-1 rounded w-full"
                />
              </td>
              <td className="border p-2">
                <input
                  value={editing[item._id]?.category ?? ""}
                  onChange={(e) => handleChange(item._id, "category", e.target.value)}
                  className="border px-2 py-1 rounded w-full"
                />
              </td>
              <td className="border p-2">
                <select
                  value={editing[item._id]?.branch ?? BRANCHES[0]}
                  onChange={(e) => handleChange(item._id, "branch", e.target.value)}
                  className="border px-2 py-1 rounded w-full"
                >
                  {BRANCHES.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  value={editing[item._id]?.price ?? ""}
                  onChange={(e) => handleChange(item._id, "price", e.target.value)}
                  className="border px-2 py-1 rounded w-full"
                />
              </td>
              <td className="border p-2">
                <input
                  value={editing[item._id]?.description ?? ""}
                  onChange={(e) => handleChange(item._id, "description", e.target.value)}
                  className="border px-2 py-1 rounded w-full"
                />
              </td>
              <td className="border p-2 flex gap-2">
                <button
                  onClick={() => saveItem(item._id)}
                  className="px-3 py-1 bg-green-600 text-white rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => deleteItem(item._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminMenu;
