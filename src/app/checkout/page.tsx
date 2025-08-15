"use client";

import React, { useState } from "react";
import { useCart } from "@/context/cart"; // Cart context hook
import { auth } from "@/lib/firebase"; // Firebase auth
import { Phone } from "lucide-react"; // Phone icon

export default function CheckoutPage() {
  const { items: cartItems, clearCart } = useCart();

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    mobile: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  // Defensive subtotal calculation
  const subtotal = cartItems.reduce(
    (acc, item) =>
      acc +
      (typeof item.price === "number" && typeof item.quantity === "number"
        ? item.price * item.quantity
        : 0),
    0
  );
  const tax = subtotal * 0.1;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + tax + shipping;

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleOrderNow = async () => {
    if (!customerInfo.name || !customerInfo.mobile || !customerInfo.address) {
      alert("Please fill in all customer information fields");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to place an order");
      return;
    }

    setLoading(true);

    try {
      const token = await user.getIdToken();

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          order: {
            items: cartItems,
            total,
            subtotal,
            tax,
            shipping,
            customerInfo,
          },
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Order placed successfully! Order ID: " + data.id);
        clearCart();
      } else {
        alert("Failed to place order: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while placing the order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent mb-2">
            Checkout
          </h1>
          <p className="text-gray-600">Complete your purchase with secure checkout</p>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-50 to-green-50 rounded-full border border-emerald-200/50">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <span className="text-sm font-medium text-emerald-700">{cartItems.length} items</span>
          </div>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <p className="text-xl text-gray-500 mb-2">Your cart is empty</p>
          <p className="text-gray-400">Add some items to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Items */}
          <div className="lg:col-span-2">
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/5 border border-white/20 overflow-hidden mb-8">
              <div className="px-8 py-6 border-b border-gray-200/30">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Order Items
                </h2>
                <p className="text-gray-600 mt-1">Review your selected products</p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200/50">
                  <thead className="bg-gradient-to-r from-gray-50/80 to-slate-50/80 backdrop-blur-sm">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Details
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Qty
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white/40 backdrop-blur-sm divide-y divide-gray-200/30">
                    {cartItems.map((item) => (
                      <tr
                        key={`${item.id}-${item.color ?? ""}-${item.size ?? ""}`}
                        className="group hover:bg-white/60 transition-all duration-300"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded-xl object-cover shadow-lg shadow-black/10 group-hover:shadow-xl group-hover:shadow-black/20 transition-all duration-300"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap max-w-xs">
                          <p className="font-semibold text-gray-900 truncate">{item.name}</p>
                          <div className="text-sm text-gray-500 mt-1 flex flex-wrap gap-1">
                            {item.color && (
                              <span className="inline-flex items-center px-2 py-1 bg-blue-50 border border-blue-200/50 rounded-lg text-blue-700 font-medium text-xs">
                                {item.color}
                              </span>
                            )}
                            {item.size && (
                              <span className="inline-flex items-center px-2 py-1 bg-purple-50 border border-purple-200/50 rounded-lg text-purple-700 font-medium text-xs">
                                {item.size}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">{item.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right font-semibold">
                          ${item.price?.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right font-bold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Customer Info & Order Summary */}
          <div className="lg:col-span-1 space-y-6">
            {/* Customer Info Form */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/5 border border-white/20 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200/30">
                <h3 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Customer Information
                </h3>
                <p className="text-gray-600 text-sm mt-1">Please provide your details</p>
              </div>
              <div className="p-6 space-y-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={customerInfo.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
                />

                {/* Modern Phone Input */}
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    value={customerInfo.mobile}
                    onChange={(e) => handleInputChange("mobile", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-400 outline-none transition"
                  />
                </div>

                <textarea
                  placeholder="Delivery Address"
                  rows={3}
                  value={customerInfo.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-400 outline-none transition"
                />
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/5 border border-white/20 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200/30">
                <h3 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Order Summary
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Subtotal</span>
                  <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Tax (10%)</span>
                  <span className="font-bold text-gray-900">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Shipping</span>
                  <span className="font-bold text-gray-900">
                    {shipping === 0 ? (
                      <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent font-bold">
                        Free
                      </span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="border-t border-gray-200/50 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Total
                    </span>
                    <div className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg shadow-blue-500/25">
                      <span className="font-bold text-xl text-white">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleOrderNow}
                  disabled={loading}
                  className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white font-bold text-lg rounded-2xl shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Placing Order..." : "Order Now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
