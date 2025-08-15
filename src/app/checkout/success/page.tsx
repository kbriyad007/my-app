// src/app/checkout/success/page.tsx
export const dynamic = "force-dynamic"; // ✅ prevents static pre-render

import { Suspense } from "react";
import CheckoutSuccessContent from "./CheckoutSuccessContent";

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<p>Loading order...</p>}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
