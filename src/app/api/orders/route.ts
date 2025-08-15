// app/api/orders/route.ts
import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";

export async function POST(req: Request) {
  try {
    // 1️⃣ Parse incoming request
    const { token, order } = await req.json();

    if (!token || !order) {
      return NextResponse.json({ error: "Missing token or order data" }, { status: 400 });
    }

    // 2️⃣ Verify the Firebase ID token
    const decoded = await adminAuth.verifyIdToken(token);

    // 3️⃣ Attach user ID to the order
    const orderData = {
      ...order,
      userId: decoded.uid,
      createdAt: new Date(),
    };

    // 4️⃣ Save order to Firestore
    const docRef = await adminDb.collection("orders").add(orderData);

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (error: any) {
    console.error("❌ Error saving order:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
