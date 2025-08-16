import { NextRequest, NextResponse } from "next/server";
import { getFirestore } from "firebase-admin/firestore";
import adminApp from "@/lib/firebaseAdmin"; // your firebaseAdmin.ts
import { POST as createSteadfastOrder } from "../steadfast/create-order/route"; // reuse existing route

// ✅ Define expected order shape
interface OrderPayload {
  invoice: string;
  recipient_name: string;
  recipient_phone: string;
  recipient_address: string;
  cod_amount: number;
  note?: string;
  item_description?: string;
  delivery_type?: number;
}

const db = getFirestore(adminApp);

export async function POST(req: NextRequest) {
  try {
    // 1️⃣ Parse request body
    const body: OrderPayload = await req.json();

    if (
      !body.invoice ||
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

    // 2️⃣ Save order to Firestore
    const orderRef = db.collection("orders").doc(body.invoice);
    await orderRef.set({
      ...body,
      status: "pending",
      createdAt: new Date(),
    });

    // 3️⃣ Send order to Steadfast by reusing existing API
    const steadfastRes = await createSteadfastOrder(req);
    const steadfastData = await steadfastRes.json();

    // 4️⃣ Update Firestore with courier info
    await orderRef.update({
      status: steadfastData?.consignment ? "confirmed" : "failed",
      steadfast: steadfastData,
    });

    // 5️⃣ Return success
    return NextResponse.json({
      message: "Order placed successfully",
      orderId: orderRef.id,
      steadfast: steadfastData,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Unknown error occurred" },
      { status: 500 }
    );
  }
}
