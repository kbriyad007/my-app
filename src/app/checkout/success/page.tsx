import OrderSummary from "@/components/OrderSummary";

export default function CheckoutSuccessPage() {
  const orderData = {
    orderId: "ORD-123456",
    date: "Aug 15, 2025",
    items: [
      { id: "1", name: "Premium T-Shirt", quantity: 2, price: 25, image: "/shirt.jpg" },
      { id: "2", name: "Classic Sneakers", quantity: 1, price: 60, image: "/shoes.jpg" },
    ],
    subtotal: 110,
    shipping: 5,
    total: 115,
  };

  return (
    <main className="bg-gray-50 min-h-screen py-12">
      <OrderSummary {...orderData} />
    </main>
  );
}
