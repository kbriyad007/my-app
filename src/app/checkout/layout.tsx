import React, { ReactNode } from "react";

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow py-6 px-6">
        <h1 className="text-2xl font-bold text-gray-900">My Store - Checkout</h1>
      </header>

      <section className="flex-grow container mx-auto px-4 py-8">
        {children}
      </section>

      <footer className="bg-white border-t text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} My Store. All rights reserved.
      </footer>
    </div>
  );
}
