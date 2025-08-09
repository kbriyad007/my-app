"use client";

import React from "react";
import { useCart } from "@/context/cart";
import CartModal from "@/components/CartModal";
import FloatingCartIcon from "@/components/FloatingCartIcon";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const { items } = useCart();
  const [cartOpen, setCartOpen] = React.useState(false);

  return (
    <>
      {children}
      <FloatingCartIcon onClick={() => setCartOpen(true)} count={items.length} />
      <CartModal
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={(id, qty) => console.log("Update", id, qty)}
        onRemoveItem={(id) => console.log("Remove", id)}
        onCheckout={() => console.log("Checkout")}
      />
    </>
  );
}
