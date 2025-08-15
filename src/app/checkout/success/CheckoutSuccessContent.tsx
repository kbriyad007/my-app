"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import OrderSummary, { OrderSummaryProps } from "@/components/OrderSummary";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { CheckCircle, User, MapPin, CreditCard } from "lucide-react";

export default function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [orderData, setOrderData] = useState<OrderSummaryProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) {
      setError("No order ID provided in the URL.");
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        const docRef = doc(db, "orders", orderId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setOrderData(docSnap.data() as OrderSummaryProps);
        } else {
          setError("No order found. Please check your email for confirmation.");
        }
      } catch (err) {
        console.error("Error fetching order:", err);
        setError("Something went wrong while fetching your order.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  return (
    <main className="bg-gray-50 min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl">
        {/* Loading State */}
        {loading && (
          <div className="bg-white p-10 rounded-2xl shadow-xl flex flex-col items-center space-y-4">
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            <p className="text-gray-600 font-medium text-lg">Loading your order...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-white p-10 rounded-2xl shadow-xl text-center">
            <h2 className="text-2xl font-semibold text-red-600 mb-4">Oops!</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        )}

        {/* Order Success */}
        {orderData && (
          <div className="bg-white p-10 rounded-2xl shadow-xl space-y-8">
            {/* Header */}
            <div className="flex flex-col items-center text-center space-y-3">
              <CheckCircle className="w-16 h-16 text-green-500" />
              <h1 className="text-3xl font-bold text-gray-900">
                Thank you for your purchase!
              </h1>
              <p className="text-gray-500">
                Your order has been successfully placed.
              </p>
              <p className="text-sm text-gray-400">
                Order ID: <span className="font-medium">{orderId}</span>
              </p>
            </div>

            {/* Customer & Shipping Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-xl shadow-sm">
                <User className="w-6 h-6 text-blue-500" />
                <div>
                  <p className="text-gray-500 text-sm">Customer</p>
                  <p className="text-gray-900 font-medium">{orderData.customerInfo.name}</p>
                  <p className="text-gray-500 text-sm">{orderData.customerInfo.mobile}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-xl shadow-sm">
                <MapPin className="w-6 h-6 text-purple-500" />
                <div>
                  <p className="text-gray-500 text-sm">Delivery Address</p>
                  <p className="text-gray-900 font-medium">{orderData.customerInfo.address}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-xl shadow-sm">
                <CreditCard className="w-6 h-6 text-green-500" />
                <div>
                  <p className="text-gray-500 text-sm">Payment</p>
                  <p className="text-gray-900 font-medium">Paid Online</p>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-gray-600" />
                <span>Order Summary</span>
              </h2>
              <OrderSummary {...orderData} />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => window.print()}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl shadow hover:scale-105 transition transform"
              >
                Print Receipt
              </button>
              <a
                href="/"
                className="px-6 py-3 bg-gray-200 text-gray-900 font-medium rounded-xl shadow hover:bg-gray-300 transition"
              >
                Continue Shopping
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
