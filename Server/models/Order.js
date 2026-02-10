import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  items: { type: Array, required: true },
  totalPrice: { type: Number },
  status: { type: String, default: "Pending" },
  date: { type: Date, default: Date.now },
});

export default mongoose.models.Order ||
  mongoose.model("Order", orderSchema);