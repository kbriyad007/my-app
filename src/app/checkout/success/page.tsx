import OrderSummary from "@/components/OrderSummary";

export default function CheckoutSuccessPage() {
  const orderData = { /* your order data */ };

  return (
    <main className="bg-gray-50 min-h-screen py-12">
      <OrderSummary {...orderData} />
    </main>
  );
}
