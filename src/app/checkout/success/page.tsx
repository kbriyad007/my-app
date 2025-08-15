import { useEffect, useState } from "react";
import OrderSummary from "@/components/OrderSummary";
import { db } from "@/lib/firebase"; // Firestore
import { doc, getDoc } from "firebase/firestore";
import { useSearchParams } from "next/navigation";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      const docRef = doc(db, "orders", orderId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setOrderData(docSnap.data());
      } else {
        console.error("No such order!");
      }
    };

    fetchOrder();
  }, [orderId]);

  if (!orderData) {
    return (
      <main className="bg-gray-50 min-h-screen flex items-center justify-center py-12">
        <p className="text-gray-500 text-lg">Loading order summary...</p>
      </main>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen py-12">
      <OrderSummary {...orderData} />
    </main>
  );
}
