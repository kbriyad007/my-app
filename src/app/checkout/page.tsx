"use client";

import React, { useState } from "react";
import { useCart } from "@/context/cart";
import { auth } from "@/lib/firebase";
import { Phone } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items: cartItems, clearCart } = useCart();
  const router = useRouter();

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    mobile: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

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

      if (data.success && data.id) {
        // Clear cart
        clearCart();

        // Redirect to success page with orderId
        router.push(`/checkout/success?orderId=${data.id}`);
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
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent mb-2">
            Checkout
          </h1>
          <p className="text-gray-500 text-lg">
            Complete your purchase with secure checkout
          </p>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-50 to-green-50 rounded-full border border-emerald-200/50 shadow-sm">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-emerald-700">
              {cartItems.length} items
            </span>
          </div>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <p className="text-xl text-gray-500 font-medium mb-2">
            Your cart is empty
          </p>
          <p className="text-gray-400">Add some items to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Items */}
          <div className="lg:col-span-2">
            {/* ...your order items table here... */}
          </div>

          {/* Customer Info & Summary */}
          <div className="lg:col-span-1 space-y-6">
            {/* Customer Info */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-300">
              {/* ...your customer info form here... */}
            </div>

            {/* Summary */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-300">
              {/* ...your order summary here... */}
              <button
                onClick={handleOrderNow}
                disabled={loading}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Placing Order..." : "Order Now"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
