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

      // ✅ Build order payload with userId
      const orderPayload = {
        invoice: "INV-" + Date.now(), // unique invoice
        recipient_name: customerInfo.name,
        recipient_phone: customerInfo.mobile,
        recipient_address: customerInfo.address,
        cod_amount: total,
        note: "Deliver within 3PM",
        item_description: cartItems.map((i) => i.name).join(", "),
        delivery_type: 0, // home delivery
        userId: user.uid, // add logged-in userId
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();

      if (data?.orderId) {
        clearCart();
        router.push(`/checkout/success?orderId=${data.orderId}`);
      } else {
        alert("Failed to place order: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while placing the order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-3 md:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
            Checkout
          </h1>
          <p className="text-gray-500 text-sm md:text-base">
            Complete your purchase securely
          </p>
        </div>
        {cartItems.length > 0 && (
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-200/50 shadow-sm">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-emerald-700">
              {cartItems.length} items
            </span>
          </div>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
            <svg
              className="w-10 h-10 text-gray-400"
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
          <p className="text-lg text-gray-500 font-medium">
            Your cart is empty
          </p>
          <p className="text-sm text-gray-400">Add some items to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Items */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-800">
                Order Items
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-600 font-medium">
                      Product
                    </th>
                    <th className="px-4 py-2 text-left text-gray-600 font-medium">
                      Details
                    </th>
                    <th className="px-4 py-2 text-center text-gray-600 font-medium">
                      Qty
                    </th>
                    <th className="px-4 py-2 text-right text-gray-600 font-medium">
                      Price
                    </th>
                    <th className="px-4 py-2 text-right text-gray-600 font-medium">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {cartItems.map((item) => (
                    <tr
                      key={`${item.id}-${item.color ?? ""}-${item.size ?? ""}`}
                    >
                      <td className="px-4 py-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 rounded-lg object-cover"
                        />
                      </td>
                      <td className="px-4 py-2 max-w-xs truncate">
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <div className="flex flex-wrap gap-1 mt-0.5">
                          {item.color && (
                            <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 text-xs rounded border border-blue-200">
                              {item.color}
                            </span>
                          )}
                          {item.size && (
                            <span className="px-1.5 py-0.5 bg-purple-50 text-purple-700 text-xs rounded border border-purple-200">
                              {item.size}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-2 text-center">{item.quantity}</td>
                      <td className="px-4 py-2 text-right">
                        ${item.price?.toFixed(2)}
                      </td>
                      <td className="px-4 py-2 text-right font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Customer Info + Summary */}
          <div className="space-y-4">
            {/* Customer Info */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Customer Information
              </h3>
              <input
                type="text"
                placeholder="Full Name"
                value={customerInfo.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full px-3 py-2 mb-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <div className="relative mb-3">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  value={customerInfo.mobile}
                  onChange={(e) =>
                    handleInputChange("mobile", e.target.value)
                  }
                  className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-400 outline-none"
                />
              </div>
              <textarea
                placeholder="Delivery Address"
                rows={3}
                value={customerInfo.address}
                onChange={(e) =>
                  handleInputChange("address", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </div>

            {/* Summary */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Order Summary
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-emerald-600 font-medium">Free</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold text-base">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleOrderNow}
                disabled={loading}
                className="w-full mt-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium shadow hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
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
