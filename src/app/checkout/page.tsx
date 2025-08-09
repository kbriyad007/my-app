"use client";

import { useEffect, useState } from "react";

interface CartItem {
  id: string;
  name: string;
  image: string;
  color?: string;
  size?: string;
  price: number;
  quantity: number;
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cartItems");
      if (stored) {
        const parsed: CartItem[] = JSON.parse(stored);
        setCartItems(parsed);
      }
    } catch {
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + tax + shipping;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-gray-600 text-lg">Loading cart...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] px-4">
        <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some items before checking out.</p>
        <a
          href="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Continue Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-12">
      {/* Table */}
      <div className="flex-1 overflow-x-auto rounded-lg shadow-lg border border-gray-200 bg-white">
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
          <tbody className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <tr key={`${item.id}-${item.color ?? ""}-${item.size ?? ""}`}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 object-cover rounded-lg"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap max-w-xs">
                  <p className="font-semibold text-gray-900 truncate">{item.name}</p>
                  <div className="text-sm text-gray-600 space-x-3 mt-1">
                    {item.color && (
                      <span>
                        Color: <span className="font-medium">{item.color}</span>
                      </span>
                    )}
                    {item.size && (
                      <span>
                        Size: <span className="font-medium">{item.size}</span>
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center font-medium text-gray-900">
                  {item.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-gray-700 font-semibold">
                  ${item.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-gray-900 font-bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <section className="mt-8 lg:mt-0 lg:w-96 bg-white rounded-lg p-6 shadow-md border border-gray-200 flex-shrink-0">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
        <div className="space-y-3">
          <div className="flex justify-between text-gray-700">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Tax (10%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          {shipping > 0 && (
            <p className="text-sm text-blue-600">Free shipping on orders over $100</p>
          )}
          <div className="border-t border-gray-300 pt-3 flex justify-between font-bold text-lg text-gray-900">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Place Order Button */}
        <button
          onClick={() => alert("Place order clicked!")}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-shadow shadow-md hover:shadow-lg"
        >
          Place Order
        </button>
      </section>
    </div>
  );
}
