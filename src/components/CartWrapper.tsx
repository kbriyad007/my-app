"use client";

import React, { useState } from "react";
import { useCart } from "@/context/cart";
import CartModal from "@/components/CartModal";
import FloatingCartIcon from "@/components/FloatingCartIcon"; // Or use your existing FloatingCartIcon

export default function CartWrapper({ children }: { children: React.ReactNode }) {
  const { items } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

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
