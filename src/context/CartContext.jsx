"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on component mount (client-side only)
  useEffect(() => {
    const savedCart = localStorage.getItem("bloomcraft_cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error loading cart from localStorage", e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("bloomcraft_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, selections, price, isCustomized = false) => {
    // Generate a unique ID for this cart item based on selections to bundle identical items
    const selectionsKey = JSON.stringify(selections);
    const cartItemId = `${product.id}-${selectionsKey}`;

    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.cartItemId === cartItemId);
      if (existingItemIndex > -1) {
        // Increment quantity of existing matching item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        // Add as a new item
        return [
          ...prevItems,
          {
            cartItemId,
            productId: product.id,
            name: product.name,
            image: product.image,
            basePrice: product.basePrice,
            selections,
            price, // The calculated final single unit price
            quantity: 1,
            isCustomized
          }
        ];
      }
    });
    
    // Automatically open the cart drawer to show the feedback
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, delta) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return { ...item, quantity: Math.max(1, newQty) };
          }
          return item;
        })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartSubtotal,
        getCartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
