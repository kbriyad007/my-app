// app/api/orders/route.ts
import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  color?: string;
  size?: string;
}

interface CustomerInfo {
  name: string;
  mobile: string;
  address: string;
}

interface OrderPayload {
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  customerInfo: CustomerInfo;
}

export async function POST(req: Request) {
  try {
    const { token, order }: { token?: string; order?: OrderPayload } = await req.json();

    if (!token || !order) {
      return NextResponse.json({ error: "Missing token or order data" }, { status: 400 });
    }

    // Verify user token
    const decoded = await adminAuth.verifyIdToken(token);

    // Attach user ID and timestamp
    const orderData = {
      ...order,
      userId: decoded.uid,
      createdAt: new Date(),
    };

    const docRef = await adminDb.collection("orders").add(orderData);

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (error: unknown) {
    console.error("❌ Error saving order:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
