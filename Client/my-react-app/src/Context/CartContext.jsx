import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // ✅ Add item to cart
  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((dish) => dish.name === item.name);
      if (existing) {
        return prev.map((dish) =>
          dish.name === item.name
            ? { ...dish, quantity: dish.quantity + 1 }
            : dish
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  // ✅ Remove item from cart
  const removeFromCart = (name) => {
    setCartItems((prev) => prev.filter((dish) => dish.name !== name));
  };

  // ✅ Clear all items
  const clearCart = () => setCartItems([]);

  // ✅ Update quantity of an item
  const updateQuantity = (name, newQty) => {
    setCartItems((prev) =>
      prev.map((dish) =>
        dish.name === name ? { ...dish, quantity: newQty } : dish
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity, // ✅ added here
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
