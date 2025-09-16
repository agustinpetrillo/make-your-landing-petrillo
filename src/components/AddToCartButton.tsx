// components/AddToCartButton.tsx
"use client";

import { useGlobalContext } from "@/context/GlobalContext";
import { FaShoppingCart } from "react-icons/fa";

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart, isInCart, getCartItemQuantity, updateQuantity } =
    useGlobalContext();

  const quantity = getCartItemQuantity(product.firestoreId);
  const inCart = isInCart(product.firestoreId);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleIncreaseQuantity = () => {
    updateQuantity(product.firestoreId, quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    updateQuantity(product.firestoreId, quantity - 1);
  };

  if (product.stock === 0) {
    return (
      <button
        disabled
        className="bg-gray-400 text-white px-6 py-2 rounded cursor-not-allowed"
      >
        Out of Stock
      </button>
    );
  }

  if (inCart) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 border rounded">
          <button
            onClick={handleDecreaseQuantity}
            className="bg-orange-400 cursor-pointer px-3 py-2 rounded-l hover:bg-orange-300 transition-colors"
          >
            -
          </button>
          <span className="px-4 py-2 font-medium">{quantity}</span>
          <button
            onClick={handleIncreaseQuantity}
            disabled={quantity >= product.stock}
            className="bg-orange-400 cursor-pointer px-3 py-2 rounded-r hover:bg-orange-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>

        <div className="text-sm text-gray-600">
          <p className="text-green-600 font-medium">✓ Added to cart</p>
          {quantity >= product.stock && (
            <p className="text-orange-500">Max stock reached</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handleAddToCart}
      className="bg-blue-500 hover:scale-110 cursor-pointer text-white px-6 py-2 rounded hover:bg-blue-600 transition-all flex items-center gap-2"
    >
      <FaShoppingCart className="h-6 w-6" />
    </button>
  );
}
