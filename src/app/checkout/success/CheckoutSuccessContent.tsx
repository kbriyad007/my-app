"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import OrderSummary, { OrderSummaryProps } from "@/components/OrderSummary";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { CheckCircle, XCircle } from "lucide-react";

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
    <main className="bg-gray-50 min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-4xl space-y-8">

        {loading && (
          <div className="bg-white p-10 rounded-3xl shadow-xl text-center">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg font-medium">Loading your order...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 p-8 rounded-3xl shadow-md flex flex-col items-center space-y-4">
            <XCircle className="w-12 h-12 text-red-600" />
            <h2 className="text-2xl font-semibold text-red-700">Oops!</h2>
            <p className="text-gray-600 text-center">{error}</p>
          </div>
        )}

        {orderData && (
          <div className="bg-white p-10 rounded-3xl shadow-xl space-y-8">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-green-100 text-green-600 w-16 h-16 flex items-center justify-center rounded-full">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Thank you for your purchase!</h1>
              <p className="text-gray-500 text-lg">Your order has been successfully placed.</p>
              <p className="text-gray-400 text-sm">
                Order ID: <span className="font-medium text-gray-700">{orderId}</span>
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Details</h2>
              <OrderSummary {...orderData} />
            </div>

            <div className="text-center">
              <a
                href="/"
                className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-lg hover:scale-105 hover:shadow-2xl transition-transform"
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
