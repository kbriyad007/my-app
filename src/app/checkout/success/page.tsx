"use client";

import { useEffect, useState } from "react";
import OrderSummary, { OrderSummaryProps } from "@/components/OrderSummary";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { orderId: string };
}) {
  const [orderData, setOrderData] = useState<OrderSummaryProps | null>(null);

  useEffect(() => {
    if (!searchParams.orderId) return;

    const fetchOrder = async () => {
      const docRef = doc(db, "orders", searchParams.orderId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setOrderData(docSnap.data() as OrderSummaryProps);
      }
    };

    fetchOrder();
  }, [searchParams.orderId]);

  if (!orderData) return <p>Loading...</p>;

  return (
    <main className="bg-gray-50 min-h-screen py-12">
      <OrderSummary {...orderData} />
    </main>
  );
}
