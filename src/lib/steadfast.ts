const STEADFAST_BASE_URL = "https://portal.packzy.com/api/v1";
const API_KEY = process.env.STEADFAST_API_KEY!;
const SECRET_KEY = process.env.STEADFAST_SECRET_KEY!;

async function steadfastFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${STEADFAST_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Api-Key": API_KEY,
      "Secret-Key": SECRET_KEY,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Steadfast API Error: ${res.status} - ${text}`);
  }

  return res.json();
}

// ✅ Create Order
export async function createOrder(orderData: any) {
  return steadfastFetch("/create_order", {
    method: "POST",
    body: JSON.stringify(orderData),
  });
}
