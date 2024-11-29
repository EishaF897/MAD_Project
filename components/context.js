import React, { createContext, useState } from 'react';

// Create the context
export const Context = createContext();

// Cart Provider component
export const Provider = ({ children }) => {
  const [cart, setCart] = useState([]);


  // Add to Cart handler
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        // Increment quantity if item already exists
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // Add new item to the cart with quantity 1
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };


  
  const pizzaAddToCart = async (item) => {
    // Check for valid Size and Price
    if (!item.Size || !item.Price) {
      alert('Invalid size or price selected.');
      return;
    }
  
    setCart((prevCart) => {
      // Check if the pizza with the same Size already exists in the cart
      const existingItem = prevCart.find(
        (cartItem) => cartItem.id === item.id && cartItem.Size === item.Size
      );
  
      if (existingItem) {
        // Increment quantity for the existing pizza with the same Size
        return prevCart.map((cartItem) =>
          cartItem.id === item.id && cartItem.Size === item.Size
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // Add a new pizza with the selected Size and Price to the cart
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };


  // Increment item quantity
  const incrementQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  };

  // Decrement item quantity
  const decrementQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((cartItem) =>
          cartItem.id === id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0) // Remove items with quantity 0
    );
  };

  // Clear the cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <Context.Provider
      value={{
        cart,
        addToCart,
        incrementQuantity,
        decrementQuantity,
        clearCart,
        pizzaAddToCart,
      }}
    >
      {children}
    </Context.Provider>
  );
};