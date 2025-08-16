import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/steadfast";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // ✅ Required fields for Steadfast
    const orderData = {
      invoice: body.invoice,
      recipient_name: body.recipient_name,
      recipient_phone: body.recipient_phone,
      recipient_address: body.recipient_address,
      cod_amount: body.cod_amount,
      note: body.note || "",
      item_description: body.item_description || "",
      delivery_type: body.delivery_type || 0,
    };

    const response = await createOrder(orderData);
    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
