const STEADFAST_API_KEY = process.env.STEADFAST_API_KEY!;
const STEADFAST_SECRET_KEY = process.env.STEADFAST_SECRET_KEY!;
const STEADFAST_BASE_URL = "https://portal.packzy.com/api/v1";

// ✅ Define type for order request
export interface SteadfastOrderPayload {
  invoice: string;
  recipient_name: string;
  recipient_phone: string;
  recipient_address: string;
  cod_amount: number;
  note?: string;
  item_description?: string;
  delivery_type?: number;
}

// ✅ Define type for order response (based on Steadfast API docs)
export interface SteadfastOrderResponse {
  status: string;
  message?: string;
  consignment?: string;
  [key: string]: unknown; // allow extra fields from API
}

export async function createSteadfastOrder(
  order: SteadfastOrderPayload
): Promise<SteadfastOrderResponse> {
  const response = await fetch(`${STEADFAST_BASE_URL}/create_order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Api-Key": STEADFAST_API_KEY,
      "Secret-Key": STEADFAST_SECRET_KEY,
    },
    body: JSON.stringify(order),
  });

  const data: SteadfastOrderResponse = await response.json();
  return data;
}
