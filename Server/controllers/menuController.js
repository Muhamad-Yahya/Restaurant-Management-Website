import MenuItem from "../models/MenuItem.js";

/**
 * Helper: create a url-safe slug from text
 */
const slugify = (text) => {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove diacritics
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+|-+$/g, "");
};

/**
 * PUBLIC: GET menu items
 */
export const getAllMenuItems = async (req, res) => {
  try {
    const branchQueryRaw = req.query.branch?.toString().trim();

    let filter = {};
    if (branchQueryRaw) {
      filter = {
        $or: [
          { slug: branchQueryRaw },
          { branch: new RegExp(`^${branchQueryRaw}$`, "i") },
        ],
      };
    }

    const menu = await MenuItem.find(filter).sort({
      category: 1,
      name: 1,
    });

    res.json(menu);
  } catch (err) {
    console.error("Error fetching menu items:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * ADMIN: GET all menu items (no filtering)
 */
export const adminGetMenuItems = async (req, res) => {
  try {
    const menu = await MenuItem.find().sort({
      category: 1,
      name: 1,
    });

    res.json(menu);
  } catch (err) {
    console.error("Error fetching menu items:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * ADMIN: CREATE new menu item (Cloudinary-ready)
 */
export const createMenuItem = async (req, res) => {
  try {
    const { name, description, price, category, branch, slug } = req.body;

    // Use Cloudinary URL if image uploaded
    const image = req.file?.path || "";

    const item = await MenuItem.create({
      name,
      description,
      price,
      category,
      branch,
      slug,
      image,
    });

    res.status(201).json(item);
  } catch (err) {
    console.error("Error creating menu item:", err);
    res.status(500).json({ message: "Failed to create menu item" });
  }
};

/**
 * ADMIN: UPDATE menu item (Cloudinary-ready)
 */
export const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { price, name, description, category, branch, slug } = req.body;

    const menuItem = await MenuItem.findById(id);
    if (!menuItem) return res.status(404).json({ message: "Menu item not found" });

    if (price !== undefined) menuItem.price = Number(price) || 0;
    if (name !== undefined) menuItem.name = name;
    if (description !== undefined) menuItem.description = description;
    if (category !== undefined) menuItem.category = category;
    if (branch !== undefined) menuItem.branch = branch;

    // Only overwrite slug if explicitly sent
    if (slug !== undefined) {
      menuItem.slug = slug.trim() !== "" ? slugify(slug) : slugify(name || menuItem.name);
    }

    // Replace image if new file uploaded
    if (req.file) menuItem.image = req.file.path;

    await menuItem.save();
    res.json(menuItem);
  } catch (err) {
    console.error("Error updating menu item:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * ADMIN: DELETE a menu item by ID
 */
export const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await MenuItem.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Menu item not found" });

    res.json({ message: "Menu item deleted successfully" });
  } catch (err) {
    console.error("Error deleting menu item:", err);
    res.status(500).json({ message: "Server error" });
  }
};
