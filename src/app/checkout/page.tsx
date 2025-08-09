"use client";

import React, { useEffect, useState } from "react";

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
    // Read cart from localStorage
    const stored = localStorage.getItem("cartItems");
    if (stored) {
      try {
        const parsed: CartItem[] = JSON.parse(stored);
        setCartItems(parsed);
      } catch {
        setCartItems([]);
      }
    }
  }, []);

  // Calculate totals
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + tax + shipping;

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="overflow-x-auto shadow rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cartItems.map((item) => (
                <tr key={`${item.id}-${item.color ?? ""}-${item.size ?? ""}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap max-w-xs">
                    <p className="font-semibold text-gray-900 truncate">{item.name}</p>
                    <div className="text-sm text-gray-500 mt-1 space-x-2">
                      {item.color && (
                        <span className="inline-block px-2 py-0.5 bg-gray-100 rounded text-gray-700">
                          Color: {item.color}
                        </span>
                      )}
                      {item.size && (
                        <span className="inline-block px-2 py-0.5 bg-gray-100 rounded text-gray-700">
                          Size: {item.size}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-gray-900 font-medium">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-gray-900 font-medium">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-gray-900 font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td colSpan={4} className="px-6 py-3 text-right font-semibold text-gray-900">
                  Subtotal
                </td>
                <td className="px-6 py-3 text-right font-semibold text-gray-900">
                  ${subtotal.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td colSpan={4} className="px-6 py-3 text-right font-semibold text-gray-900">
                  Tax (10%)
                </td>
                <td className="px-6 py-3 text-right font-semibold text-gray-900">
                  ${tax.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td colSpan={4} className="px-6 py-3 text-right font-semibold text-gray-900">
                  Shipping
                </td>
                <td className="px-6 py-3 text-right font-semibold text-gray-900">
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </td>
              </tr>
              <tr>
                <td colSpan={4} className="px-6 py-3 text-right font-bold text-xl text-blue-600">
                  Total
                </td>
                <td className="px-6 py-3 text-right font-bold text-xl text-blue-600">
                  ${total.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </main>
  );
}
