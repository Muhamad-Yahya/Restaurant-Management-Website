// menuData.js
import dish1 from "../assets/dish1.webp";
import dish2 from "../assets/dish2.webp";
import dish3 from "../assets/dish3.webp";
import drink1 from "../assets/dish4.webp";
import drink2 from "../assets/dish5.webp";
import dessert1 from "../assets/dish6.webp";
import dessert2 from "../assets/dish7.webp";

export const jadeMenu = {
  branchName: "Jade Café",
  categories: [
    {
      name: "Dishes",
      items: [
        {
          name: "Spicy Szechuan Noodles",
          desc: "Hot & tangy noodles tossed with fresh vegetables and chili oil.",
          price: 2000,
          image: dish1,
        },
        {
          name: "Honey Garlic Chicken",
          desc: "Crispy chicken glazed with a sweet and garlicky sauce.",
          price: 3000,
          image: dish2,
        },
        {
          name: "Vegetable Spring Rolls",
          desc: "Crispy rolls filled with seasoned mixed vegetables.",
          price: 1500,
          image: dish3,
        },
        {
          name: "Thai Basil Fried Rice",
          desc: "Stir-fried rice with basil, chili, and aromatic herbs.",
          price: 2200,
          image: dish2,
        },
        {
          name: "Crispy Beef Strips",
          desc: "Tender beef strips tossed in tangy sweet chili sauce.",
          price: 2800,
          image: dish1,
        },
        {
          name: "Grilled Teriyaki Salmon",
          desc: "Juicy salmon fillet glazed with teriyaki sauce and sesame.",
          price: 3500,
          image: dish3,
        },
        {
          name: "Garlic Butter Prawns",
          desc: "Succulent prawns cooked with herbs, garlic, and butter.",
          price: 3600,
          image: dish2,
        },
      ],
    },
    {
      name: "Beverages",
      items: [
        {
          name: "Mango Smoothie",
          desc: "Fresh mango blended with yogurt and honey.",
          price: 800,
          image: drink1,
        },
        {
          name: "Green Tea Latte",
          desc: "Smooth and creamy matcha latte with steamed milk.",
          price: 900,
          image: drink2,
        },
        {
          name: "Iced Americano",
          desc: "Chilled espresso with refreshing iced water.",
          price: 700,
          image: drink1,
        },
        {
          name: "Strawberry Mojito",
          desc: "A cool mix of mint, lime, and fresh strawberries.",
          price: 950,
          image: drink2,
        },
        {
          name: "Lemon Iced Tea",
          desc: "Refreshing black tea infused with lemon and mint.",
          price: 850,
          image: drink1,
        },
        {
          name: "Classic Cappuccino",
          desc: "Rich espresso topped with velvety foam.",
          price: 750,
          image: drink2,
        },
      ],
    },
    {
      name: "Desserts",
      items: [
        {
          name: "Chocolate Lava Cake",
          desc: "Molten chocolate cake with a gooey center.",
          price: 1800,
          image: dessert1,
        },
        {
          name: "Mango Sticky Rice",
          desc: "Sweet coconut sticky rice served with ripe mango slices.",
          price: 1500,
          image: dessert2,
        },
        {
          name: "Cheesecake Slice",
          desc: "Creamy vanilla cheesecake with a biscuit base.",
          price: 1600,
          image: dessert2,
        },
        {
          name: "Tiramisu Cup",
          desc: "Layers of espresso-soaked ladyfingers and mascarpone cream.",
          price: 1700,
          image: dessert1,
        },
        {
          name: "Brownie Sundae",
          desc: "Fudgy brownie topped with vanilla ice cream and chocolate sauce.",
          price: 1900,
          image: dessert2,
        },
        {
          name: "Fruit Tart",
          desc: "Buttery crust filled with custard and fresh fruits.",
          price: 1600,
          image: dessert1,
        },
      ],
    },
  ],
};
