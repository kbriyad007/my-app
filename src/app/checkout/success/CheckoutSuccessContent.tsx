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

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      const docRef = doc(db, "orders", orderId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setOrderData(docSnap.data() as OrderSummaryProps);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (!orderId) {
    return <p>No order found. Please check your email for confirmation.</p>;
  }

  if (!orderData) return <p>Loading...</p>;

  return (
    <main className="bg-gray-50 min-h-screen py-12">
      <OrderSummary {...orderData} />
    </main>
  );
}
