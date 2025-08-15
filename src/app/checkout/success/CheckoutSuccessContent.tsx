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

  if (loading) return <p>Loading your order...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main className="bg-gray-50 min-h-screen py-12">
      {orderData && <OrderSummary {...orderData} />}
    </main>
  );
}
