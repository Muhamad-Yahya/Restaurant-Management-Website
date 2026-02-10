import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String },
    image: { type: String },
    branch: { type: String },
    slug: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("MenuItem", menuItemSchema);
