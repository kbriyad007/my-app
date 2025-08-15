// src/app/checkout/success/CheckoutSuccessContent.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import OrderSummary, { OrderSummaryProps } from "@/components/OrderSummary";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

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
    <main className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-3xl">
        {loading && (
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <div className="animate-spin h-6 w-6 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading your order...</p>
          </div>
        )}

        {error && (
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <h2 className="text-xl font-semibold text-red-600 mb-2">Oops!</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        )}

        {orderData && (
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="text-center mb-8">
              <div className="mx-auto w-14 h-14 bg-green-100 text-green-600 flex items-center justify-center rounded-full mb-4">
                ✅
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                Thank you for your purchase!
              </h1>
              <p className="text-gray-500 mt-2">
                Your order has been successfully placed.
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Order ID: <span className="font-medium">{orderId}</span>
              </p>
            </div>

            <OrderSummary {...orderData} />
          </div>
        )}
      </div>
    </main>
  );
}
