// controllers/menuController.js
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
 * Optional query: ?branch=<slug-or-branchName>
 * If branch query is provided, we filter by slug OR branch (case-insensitive for branch).
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
 * ADMIN: UPDATE menu item (price, name, description, category, image, branch, slug)
 *
 * IMPORTANT: this update will NOT overwrite the existing slug UNLESS the client
 * explicitly provides a `slug` field in the request body. That prevents accidental
 * slug changes when admin edits price/name/etc.
 */
export const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { price, name, description, category, image, branch, slug } = req.body;

    const menuItem = await MenuItem.findById(id);
    if (!menuItem) return res.status(404).json({ message: "Menu item not found" });

    if (price !== undefined) menuItem.price = Number(price) || 0;
    if (name !== undefined) menuItem.name = name;
    if (description !== undefined) menuItem.description = description;
    if (category !== undefined) menuItem.category = category;
    if (image !== undefined) menuItem.image = image;
    if (branch !== undefined) menuItem.branch = branch;

    // ONLY change slug if client explicitly sent `slug`
    if (slug !== undefined) {
      if (String(slug).trim() !== "") {
        menuItem.slug = slugify(slug);
      } else {
        const base = branch || name || menuItem.name;
        if (base) menuItem.slug = slugify(base);
      }
    }

    await menuItem.save();
    res.json(menuItem);
  } catch (err) {
    console.error("Error updating menu item:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * ADMIN: CREATE new menu item
 * Accepts: { name, description, price, category, image, branch, slug }
 * If slug missing it will be generated from branch or name.
 */
export const createMenuItem = async (req, res) => {
  try {
    const { name, description, price, category, image, branch, slug } = req.body;

    const finalSlug =
      slug && String(slug).trim() !== ""
        ? slugify(slug)
        : slugify(branch || name);

    const newItem = await MenuItem.create({
      name,
      description,
      price: Number(price) || 0,
      category,
      image,
      branch,
      slug: finalSlug,
    });

    res.status(201).json(newItem);
  } catch (err) {
    console.error("Error creating menu item:", err);
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
    if (!deleted)
      return res.status(404).json({ message: "Menu item not found" });

    res.json({ message: "Menu item deleted successfully" });
  } catch (err) {
    console.error("Error deleting menu item:", err);
    res.status(500).json({ message: "Server error" });
  }
};
