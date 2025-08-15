"use client";

import { CheckCircle } from "lucide-react";

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface OrderSummaryProps {
  orderId: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
}

export default function OrderSummary({
  orderId,
  date,
  items,
  subtotal,
  shipping,
  total,
}: OrderSummaryProps) {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10 border border-gray-100">
      {/* Success header */}
      <div className="flex items-center space-x-3 border-b pb-4 mb-4">
        <CheckCircle className="text-green-500 w-7 h-7" />
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Order Confirmed</h2>
          <p className="text-sm text-gray-500">
            Thank you for your purchase! Your order has been placed successfully.
          </p>
        </div>
      </div>

      {/* Order details */}
      <div className="mb-4 text-sm text-gray-700">
        <p><span className="font-semibold">Order ID:</span> {orderId}</p>
        <p><span className="font-semibold">Date:</span> {date}</p>
      </div>

      {/* Items */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center space-x-3">
              <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
              <div>
                <p className="font-medium text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
            <p className="font-semibold text-gray-900">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="space-y-2 text-sm border-t pt-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-900 font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="text-gray-900 font-medium">${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-base font-semibold border-t pt-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 text-center">
        <button
          onClick={() => (window.location.href = "/")}
          className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
