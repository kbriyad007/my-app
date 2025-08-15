// src/app/checkout/success/page.tsx
import { Suspense } from "react";
import CheckoutSuccessContent from "./CheckoutSuccessContent";

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<p>Loading order...</p>}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
