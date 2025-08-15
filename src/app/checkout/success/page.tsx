"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import OrderSummary, { OrderSummaryProps } from "@/components/OrderSummary";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [orderData, setOrderData] = useState<OrderSummaryProps | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) {
      setError("No order ID provided.");
      return;
    }

    const fetchOrder = async () => {
      try {
        const docRef = doc(db, "orders", orderId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          setError("Order not found.");
          return;
        }

        setOrderData(docSnap.data() as OrderSummaryProps);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch order.");
      }
    };

    fetchOrder();
  }, [orderId]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!orderData) return <p>Loading...</p>;

  return (
    <main className="bg-gray-50 min-h-screen py-12">
      <OrderSummary {...orderData} />
    </main>
  );
}
