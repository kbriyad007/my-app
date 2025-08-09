"use client";

import React from "react";
import { useCart } from "@/context/cart"; // Your cart context hook

export default function CheckoutPage() {
  const { items: cartItems } = useCart();

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

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent mb-2">
            Order Summary
          </h1>
          <p className="text-gray-600">Review your items before completing your purchase</p>
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
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/5 border border-white/20 overflow-hidden">
          {/* Modern glassmorphism effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-transparent pointer-events-none"></div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200/50">
              <thead className="bg-gradient-to-r from-gray-50/80 to-slate-50/80 backdrop-blur-sm">
                <tr>
                  <th className="px-8 py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider letter-spacing-wide">
                    Product
                  </th>
                  <th className="px-8 py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-8 py-5 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-8 py-5 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-8 py-5 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white/40 backdrop-blur-sm divide-y divide-gray-200/30">
                {cartItems.map((item, index) => (
                  <tr 
                    key={`${item.id}-${item.color ?? ""}-${item.size ?? ""}`}
                    className="group hover:bg-white/60 transition-all duration-300 hover:shadow-lg hover:shadow-black/5"
                  >
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 rounded-2xl object-cover shadow-lg shadow-black/10 group-hover:shadow-xl group-hover:shadow-black/20 transition-all duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 rounded-2xl ring-1 ring-black/5 group-hover:ring-black/10 transition-all duration-300"></div>
                      </div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap max-w-xs">
                      <p className="font-semibold text-gray-900 truncate text-lg group-hover:text-black transition-colors duration-200">
                        {item.name}
                      </p>
                      <div className="text-sm text-gray-500 mt-2 flex flex-wrap gap-2">
                        {item.color && (
                          <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 rounded-full text-blue-700 font-medium text-xs">
                            <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                            {item.color}
                          </span>
                        )}
                        {item.size && (
                          <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200/50 rounded-full text-purple-700 font-medium text-xs">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                            </svg>
                            {item.size}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap text-center">
                      <div className="inline-flex items-center justify-center w-12 h-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg font-bold text-gray-900 shadow-inner">
                        {item.quantity}
                      </div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap text-right text-gray-900 font-semibold text-lg">
                      ${typeof item.price === "number" ? item.price.toFixed(2) : "0.00"}
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap text-right text-gray-900 font-bold text-lg">
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        ${typeof item.price === "number" && typeof item.quantity === "number"
                          ? (item.price * item.quantity).toFixed(2)
                          : "0.00"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gradient-to-r from-slate-50/90 to-gray-50/90 backdrop-blur-sm">
                <tr className="border-t border-gray-200/50">
                  <td colSpan={4} className="px-8 py-4 text-right font-semibold text-gray-700 text-lg">
                    Subtotal
                  </td>
                  <td className="px-8 py-4 text-right font-bold text-lg text-gray-900">
                    ${subtotal.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td colSpan={4} className="px-8 py-4 text-right font-semibold text-gray-700 text-lg">
                    Tax (10%)
                  </td>
                  <td className="px-8 py-4 text-right font-bold text-lg text-gray-900">
                    ${tax.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td colSpan={4} className="px-8 py-4 text-right font-semibold text-gray-700 text-lg">
                    Shipping
                  </td>
                  <td className="px-8 py-4 text-right font-bold text-lg text-gray-900">
                    {shipping === 0 ? (
                      <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent font-bold">
                        Free
                      </span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </td>
                </tr>
                <tr className="border-t-2 border-gray-300/50">
                  <td colSpan={4} className="px-8 py-6 text-right font-bold text-2xl">
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                      Total
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg shadow-blue-500/25">
                      <span className="font-bold text-2xl text-white">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </main>
  );
}
