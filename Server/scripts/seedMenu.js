// scripts/seedMenu.js
import dotenv from "dotenv";
import mongoose from "mongoose";
import MenuItem from "../models/MenuItem.js";

dotenv.config();

const seedData = [
  // JADE CAFE (8)
  { name: "Creamy Alfredo Pastaa", description: "Rich white sauce with mushrooms & chicken", price: 1450, category: "Mains", image: "/menu/dish1.webp", branch: "Jade Café", slug: "jade-cafe" },
  { name: "Grilled Chicken Sandwich", description: "Served with fries & garlic mayo", price: 950, category: "Starters", image: "/menu/dish2.webp", branch: "Jade Café", slug: "jade-cafe" },
  { name: "Classic Club Sandwich", description: "Triple-layered goodness", price: 1100, category: "Mains", image: "/menu/dish3.webp", branch: "Jade Café", slug: "jade-cafe" },
  { name: "Beef Lasagna", description: "Layered pasta with cheese", price: 1750, category: "Mains", image: "/menu/dish4.webp", branch: "Jade Café", slug: "jade-cafe" },
  { name: "Fettuccine Chicken", description: "Tender chicken tossed in creamy sauce", price: 1500, category: "Mains", image: "/menu/dish5.webp", branch: "Jade Café", slug: "jade-cafe" },
  { name: "Jade Special Steak", description: "Served with mashed potatoes & veggies", price: 2600, category: "Specials", image: "/menu/dish6.webp", branch: "Jade Café", slug: "jade-cafe" },
  { name: "Chocolate Lava Cake", description: "Warm molten center", price: 750, category: "Desserts", image: "/menu/dish7.webp", branch: "Jade Café", slug: "jade-cafe" },
  { name: "Mint Margarita", description: "Refreshing icy drink", price: 450, category: "Drinks", image: "/menu/dish1.webp", branch: "Jade Café", slug: "jade-cafe" },

  // CHINATOWN (8)
  { name: "Szechuan Chicken", description: "Hot, spicy, authentic Chinese flavor", price: 1650, category: "Mains", image: "/menu/dish1.webp", branch: "ChinaTown", slug: "chinatown" },
  { name: "Kung Pao Chicken", description: "Stir-fried with peanuts & dry chillies", price: 1700, category: "Mains", image: "/menu/dish2.webp", branch: "ChinaTown", slug: "chinatown" },
  { name: "Beef Chow Mein", description: "Chinese stir-fried noodles", price: 1550, category: "Mains", image: "/menu/dish3.webp", branch: "ChinaTown", slug: "chinatown" },
  { name: "Chicken Fried Rice", description: "Classic Chinese fried rice", price: 900, category: "Rice", image: "/menu/dish4.webp", branch: "ChinaTown", slug: "chinatown" },
  { name: "Dynamite Shrimps", description: "Crispy shrimp tossed in spicy sauce", price: 1250, category: "Starters", image: "/menu/dish5.webp", branch: "ChinaTown", slug: "chinatown" },
  { name: "Hot & Sour Soup", description: "Chinese-style thick soup", price: 550, category: "Soups", image: "/menu/dish6.webp", branch: "ChinaTown", slug: "chinatown" },
  { name: "Spring Rolls", description: "Deep-fried Chinese rolls", price: 450, category: "Starters", image: "/menu/dish7.webp", branch: "ChinaTown", slug: "chinatown" },
  { name: "Sweet and Sour Chicken", description: "Fruity, tangy Chinese classic", price: 1600, category: "Mains", image: "/menu/dish1.webp", branch: "ChinaTown", slug: "chinatown" },

  // VIRASAT (8)
  { name: "Royal Biryani", description: "Authentic Mughlai biryani", price: 1300, category: "Biryani", image: "/menu/dish1.webp", branch: "Virasat", slug: "virasat" },
  { name: "Chicken Karahi", description: "Traditional Pakistani karahi", price: 1800, category: "Karahi", image: "/menu/dish2.webp", branch: "Virasat", slug: "virasat" },
  { name: "Mutton Handi", description: "Creamy Mughlai-style handi", price: 2400, category: "Handi", image: "/menu/dish3.webp", branch: "Virasat", slug: "virasat" },
  { name: "Beef Seekh Kabab", description: "Smoky charcoal-grilled kebabs", price: 950, category: "BBQ", image: "/menu/dish4.webp", branch: "Virasat", slug: "virasat" },
  { name: "Chicken Tikka", description: "Traditional desi-style tikka", price: 650, category: "BBQ", image: "/menu/dish5.webp", branch: "Virasat", slug: "virasat" },
  { name: "Roghni Naan", description: "Soft buttery naan", price: 120, category: "Breads", image: "/menu/dish6.webp", branch: "Virasat", slug: "virasat" },
  { name: "Kheer", description: "Traditional sweet rice dessert", price: 300, category: "Desserts", image: "/menu/dish7.webp", branch: "Virasat", slug: "virasat" },
  { name: "Lassi", description: "Refreshing Punjabi-style drink", price: 250, category: "Drinks", image: "/menu/dish1.webp", branch: "Virasat", slug: "virasat" },
];

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    await MenuItem.deleteMany({});
    console.log("🗑️ Old menu items deleted");

    await MenuItem.insertMany(seedData);
    console.log(`🌟 Menu seed completed with ${seedData.length} items!`);

    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding menu:", err);
    process.exit(1);
  }
};

run();
