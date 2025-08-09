"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
  size?: string;
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedItems = localStorage.getItem("cartItems");
    if (storedItems) {
      setCartItems(JSON.parse(storedItems));
    }
  }, []);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + tax + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] px-4">
        <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some items before checking out.</p>
        <Link
          href="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>

      <table className="w-full table-fixed border border-gray-300 rounded-md overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Product</th>
            <th className="p-3 text-left">Details</th>
            <th className="p-3 text-right">Price</th>
            <th className="p-3 text-center">Quantity</th>
            <th className="p-3 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr
              key={`${item.id}-${item.color ?? ""}-${item.size ?? ""}`}
              className="border-t border-gray-200 hover:bg-gray-50"
            >
              <td className="p-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
              </td>
              <td className="p-3">
                <p className="font-semibold">{item.name}</p>
                {item.color && <p className="text-sm text-gray-600">Color: {item.color}</p>}
                {item.size && <p className="text-sm text-gray-600">Size: {item.size}</p>}
              </td>
              <td className="p-3 text-right font-mono">${item.price.toFixed(2)}</td>
              <td className="p-3 text-center">{item.quantity}</td>
              <td className="p-3 text-right font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-8 max-w-sm ml-auto space-y-3 bg-gray-50 p-6 rounded-md shadow-md">
        <div className="flex justify-between text-gray-700">
          <span>Subtotal:</span>
          <span className="font-semibold">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Tax (10%):</span>
          <span className="font-semibold">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Shipping:</span>
          <span className="font-semibold">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
        </div>
        <hr />
        <div className="flex justify-between text-xl font-bold text-blue-700">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Add your checkout form or button here */}
    </main>
  );
}
