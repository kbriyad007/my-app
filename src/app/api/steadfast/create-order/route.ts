import { NextRequest, NextResponse } from "next/server";

const STEADFAST_API_KEY = process.env.STEADFAST_API_KEY!;
const STEADFAST_SECRET_KEY = process.env.STEADFAST_SECRET_KEY!;
const STEADFAST_BASE_URL = "https://portal.packzy.com/api/v1";

// ✅ Define type for expected request body
interface SteadfastOrderPayload {
  invoice: string;
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
    // 1️⃣ Parse request body with type safety
    const body: SteadfastOrderPayload = await req.json();

    // 2️⃣ Send order to Steadfast
    const response = await fetch(`${STEADFAST_BASE_URL}/create_order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Api-Key": STEADFAST_API_KEY,
        "Secret-Key": STEADFAST_SECRET_KEY,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    // 3️⃣ Return API response
    return NextResponse.json(data, { status: response.status });
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
