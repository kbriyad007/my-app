import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import { createSteadfastOrder, SteadfastOrderPayload } from "@/lib/steadfast";

// Define expected order shape
interface OrderRequestBody extends SteadfastOrderPayload {
  // You can add extra fields if needed
}

// POST /api/orders
export async function POST(req: NextRequest) {
  try {
    // 1️⃣ Parse request body
    const body: OrderRequestBody = await req.json();

    // 2️⃣ Validate required fields
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

    // 3️⃣ Save order to Firestore
    const orderRef = adminDb.collection("orders").doc(body.invoice);
    await orderRef.set({
      ...body,
      status: "pending",
      createdAt: new Date(),
    });

    // 4️⃣ Send order to Steadfast
    const steadfastData = await createSteadfastOrder(body);

    // 5️⃣ Update Firestore with Steadfast response
    await orderRef.update({
      status: steadfastData?.consignment ? "confirmed" : "failed",
      steadfast: steadfastData,
    });

    // 6️⃣ Return success response
    return NextResponse.json({
      message: "Order placed successfully",
      orderId: orderRef.id,
      steadfast: steadfastData,
    });
  } catch (error: unknown) {
    // Handle errors
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error occurred" }, { status: 500 });
  }
}
