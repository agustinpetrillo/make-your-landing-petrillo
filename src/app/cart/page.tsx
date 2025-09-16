"use client";

// import Image from "next/image";
import Link from "next/link";
import { useGlobalContext } from "@/context/GlobalContext";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import { HiMinus, HiPlus } from "react-icons/hi";

export default function Cart() {
  const {
    cartItems,
    cartCount,
    cartTotal,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useGlobalContext();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>

        <div className="flex flex-col items-center justify-center py-16 bg-gray-900 border-gray-200 border rounded-lg">
          <FaShoppingCart className="text-6xl text-white mb-4" />
          <h2 className="text-2xl font-semibold text-gray-400 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-400 mb-6">
            Add some products to get started!
          </p>

          <Link
            href="/"
            className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white px-6 py-3 rounded-lg transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <div className="flex items-center gap-4">
          <span className="text-lg text-gray-400">
            {cartCount} {cartCount === 1 ? "item" : "items"}
          </span>
          <button
            onClick={clearCart}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all hover:scale-105 cursor-pointer flex items-center gap-2"
          >
            <FaTrash className="w-4 h-4" />
            Clear Cart
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.firestoreId}
              className="bg-gray-900 border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-4">
                {/* <div className="flex-shrink-0">
                  <Image
                    src={`/${item.image}`}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                </div> */}

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-300 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-1">
                    Category: {item.category}
                  </p>
                  <p className="text-lg font-bold text-green-600">
                    ${item.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-400">
                    Stock available: {item.stock}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <button
                    onClick={() => removeFromCart(item.firestoreId)}
                    className="text-red-500 hover:text-red-700 cursor-pointer transition-all hover:scale-125"
                    title="Remove item"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>

                  <div className="flex items-center border border-gray-300 rounded-lg bg-orange-400">
                    <button
                      onClick={() =>
                        updateQuantity(item.firestoreId, item.quantity - 1)
                      }
                      className="p-2 hover:bg-orange-300 rounded-l-lg transition-colors text-gray-900"
                      disabled={item.quantity <= 1}
                    >
                      <HiMinus className="w-4 h-4" />
                    </button>

                    <span className="px-4 py-2 font-semibold min-w-[50px] text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(item.firestoreId, item.quantity + 1)
                      }
                      className="p-2 hover:bg-orange-300 rounded-r-lg transition-colors text-gray-900"
                      disabled={item.quantity >= item.stock}
                    >
                      <HiPlus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    {item.quantity >= item.stock && (
                      <p className="text-xs text-orange-500 font-medium">
                        Max stock reached
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-900 border border-gray-200 rounded-lg p-6 shadow-sm sticky top-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Items ({cartCount}):</span>
                <span className="font-medium">${cartTotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Shipping:</span>
                <span className="font-medium text-green-600">Free</span>
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-bold">Total:</span>
                  <span className="text-lg font-bold text-green-600">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-orange-400 hover:bg-orange-500 text-white py-3 px-4 rounded-lg font-semibold transition-all hover:scale-105 cursor-pointer">
                Proceed to Checkout
              </button>

              <Link href="/">
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-semibold transition-all hover:scale-105 cursor-pointer">
                  Continue Shopping
                </button>
              </Link>
            </div>

            <div className="mt-6 pt-6 border-t">
              <h3 className="font-semibold mb-3 text-sm text-gray-400 uppercase tracking-wide">
                Items in Cart
              </h3>
              <div className="space-y-2">
                {cartItems.map((item) => (
                  <div
                    key={item.firestoreId}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="text-gray-400 truncate pr-2">
                      {item.name}
                    </span>
                    <span className="font-medium text-gray-900">
                      {item.quantity}x ${item.price.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
