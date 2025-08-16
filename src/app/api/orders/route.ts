// File: src/app/api/orders/route.ts
import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import { POST as createSteadfastOrder } from "../steadfast/create-order/route";

// ✅ Define expected order shape
interface OrderPayload {
  invoice: string;
  userId: string;
  recipient_name: string;
  recipient_phone: string;
  recipient_address: string;
  cod_amount: number;
  note?: string;
  item_description?: string;
  delivery_type?: number;
}

export async function POST(req: NextRequest) {
  try {
    const body: OrderPayload = await req.json();

    // Validate required fields
    if (
      !body.invoice ||
      !body.userId ||
      !body.recipient_name ||
      !body.recipient_phone ||
      !body.recipient_address ||
      !body.cod_amount
    ) {
      return NextResponse.json(
        { error: "Missing required order fields" },
        { status: 400 }
      );
    }

    // Save order to Firestore using invoice as ID
    const orderRef = adminDb.collection("orders").doc(body.invoice);
    await orderRef.set({
      ...body,
      status: "pending",
      createdAt: new Date(),
    });

    // ✅ Call Steadfast route directly with body
    const steadfastRes = await createSteadfastOrder({
      json: async () => body, // mimic NextRequest.json()
    } as NextRequest);

    const steadfastData = await steadfastRes.json();

    // Update Firestore with courier info and status
    await orderRef.update({
      status: steadfastData?.consignment ? "confirmed" : "failed",
      steadfast: steadfastData,
    });

    return NextResponse.json({
      message: "Order placed successfully",
      orderId: orderRef.id,
      steadfast: steadfastData,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error occurred" }, { status: 500 });
  }
}
