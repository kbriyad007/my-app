"use client";

import React, { ReactNode } from "react";

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return (
    <main className="max-w-6xl mx-auto p-6 min-h-screen bg-gray-50 flex flex-col space-y-8">
      <h1 className="text-4xl font-extrabold text-gray-900">Checkout</h1>
      {children}
    </main>
  );
}
