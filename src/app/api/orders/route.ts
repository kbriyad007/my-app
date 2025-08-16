import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { createOrder } from "@/lib/steadfast";
import { initAdmin } from "@/lib/firebaseAdmin";

// Ensure Firebase Admin is initialized
initAdmin();
const db = getFirestore();

export async function POST(req: NextRequest) {
  try {
    const { token, order } = await req.json();

    // ✅ Verify Firebase user
    const decoded = await getAuth().verifyIdToken(token);
    const userId = decoded.uid;

    // ✅ Prepare Firestore order object
    const orderRef = db.collection("orders").doc();
    const orderId = orderRef.id;

    const orderData = {
      ...order,
      userId,
      status: "pending",
      createdAt: new Date(),
    };

    // ✅ Save order to Firestore
    await orderRef.set(orderData);

    // ✅ Prepare data for Steadfast
    const firstItem = order.items[0]; // Steadfast expects one package per order
    const sfOrderData = {
      invoice: orderId, // unique Firestore doc id
      recipient_name: order.customerInfo.name,
      recipient_phone: order.customerInfo.mobile,
      recipient_address: order.customerInfo.address,
      cod_amount: order.total,
      note: "Order from My Shop",
      item_description: firstItem
        ? `${firstItem.name} (x${firstItem.quantity})`
        : "General items",
      delivery_type: 0,
    };

    // ✅ Call Steadfast
    const sfResponse = await createOrder(sfOrderData);

    // ✅ Update Firestore order with tracking info
    await orderRef.update({
      steadfast: sfResponse,
      status: "placed",
    });

    return NextResponse.json({
      success: true,
      id: orderId,
      steadfast: sfResponse,
    });
  } catch (err: any) {
    console.error("Order Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
