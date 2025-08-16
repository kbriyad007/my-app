// /src/app/api/orders/route.ts
import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin"; // use exported Firestore
import { POST as createSteadfastOrder } from "../steadfast/create-order/route";

interface OrderPayload {
  invoice: string;
  recipient_name: string;
  recipient_phone: string;
  recipient_address: string;
  cod_amount: number;
  note?: string;
  item_description?: string;
  delivery_type?: number;
  userId: string; // add userId
}

export async function POST(req: NextRequest) {
  try {
    const body: OrderPayload = await req.json();

    const { invoice, recipient_name, recipient_phone, recipient_address, cod_amount, userId } = body;

    if (!invoice || !recipient_name || !recipient_phone || !recipient_address || !cod_amount || !userId) {
      return NextResponse.json({ error: "Missing required order fields" }, { status: 400 });
    }

    const orderRef = adminDb.collection("orders").doc(invoice);
    await orderRef.set({
      ...body,
      status: "pending",
      createdAt: new Date(),
    });

    // Send order to Steadfast
    const steadfastRes = await createSteadfastOrder(req);
    const steadfastData = await steadfastRes.json();

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
