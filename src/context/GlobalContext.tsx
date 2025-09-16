"use client";

import { createContext, useState, useContext } from "react";

export const Global = createContext<GlobalContextType | undefined>(undefined);

export const useGlobalContext = () => {
  const context = useContext(Global);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalContext");
  }
  return context;
};

export default function GlobalContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Omit<CartItem, "quantity">) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.firestoreId === product.firestoreId
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.firestoreId === product.firestoreId && item.quantity < item.stock
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.firestoreId !== productId)
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.firestoreId === productId) {
          // Don't exceed stock limit
          const newQuantity = Math.min(quantity, item.stock);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const isInCart = (productId: string) => {
    return cartItems.some((item) => item.firestoreId === productId);
  };

  const getCartItemQuantity = (productId: string) => {
    const item = cartItems.find((item) => item.firestoreId === productId);
    return item ? item.quantity : 0;
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const values: GlobalContextType = {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getCartItemQuantity,
  };

  return <Global.Provider value={values}>{children}</Global.Provider>;
}
