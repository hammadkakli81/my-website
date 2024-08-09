import React, { createContext, useContext, useState, useEffect } from 'react';
import NotificationContext from './notification-context';

// Create the context
export const CartContext = createContext({
  cartItems: [] as any[],
  addItemToCart: (item: any) => {},
  removeItemFromCart: (itemName: any) => {},
});

// Create the provider component
export const CartProvider = ({ children }: any) => {
  const [cartItems, setCartItems] = useState([] as any[]);
  const notification = useContext(NotificationContext);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  // Add an item to the cart
  const addItemToCart = (item: any) => {
    setCartItems((prevItems: any) => {
      const isFound = prevItems.find((p_item: any) => p_item.name == item.name);

      if (isFound) {
        notification.showNotification({
          type: 'error',
          notificationText: 'Item Already Exist',
        });
        return [...prevItems];
      }

      const newItems = [...prevItems, item];

      localStorage.setItem('cartItems', JSON.stringify(newItems));
      return newItems;
    });
  };

  // Remove an item from the cart (by name, for simplicity)
  const removeItemFromCart = (itemName: any) => {
    setCartItems((prevItems: any) => {
      const newCartItems = prevItems.filter(
        (item: any) => item.name !== itemName
      );
      localStorage.setItem('cartItems', JSON.stringify(newCartItems));
      return newCartItems;
    });
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addItemToCart, removeItemFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
