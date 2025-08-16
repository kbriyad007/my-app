export interface OrderSummaryProps {
  items?: Array<{
    name: string;
    quantity: number;
    price: number;
    color?: string;
    size?: string;
    image?: string;
  }>;
  subtotal?: number;
  tax?: number;
  shipping?: number;
  total?: number;
  userId: string;
}

export default function OrderSummary({ items = [], subtotal, tax, shipping, total }: OrderSummaryProps) {
  return (
    <div className="space-y-4">
      {items.length === 0 ? (
        <p className="text-gray-500">No items found in this order.</p>
      ) : (
        items.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center border-b border-gray-200 pb-2">
            <div className="flex items-center space-x-3">
              {item.image && <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />}
              <div>
                <p className="text-gray-700 font-medium">{item.name}</p>
                {(item.color || item.size) && (
                  <div className="flex gap-1 text-xs mt-0.5">
                    {item.color && <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-200">{item.color}</span>}
                    {item.size && <span className="px-1.5 py-0.5 bg-purple-50 text-purple-700 rounded border border-purple-200">{item.size}</span>}
                  </div>
                )}
              </div>
            </div>
            <div className="text-right">
              <p>${item.price?.toFixed(2)} x {item.quantity}</p>
              <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))
      )}

      {/* Totals */}
      <div className="border-t border-gray-200 pt-2 space-y-1 text-sm">
        {subtotal !== undefined && <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>}
        {tax !== undefined && <div className="flex justify-between"><span>Tax</span><span>${tax.toFixed(2)}</span></div>}
        {shipping !== undefined && <div className="flex justify-between"><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>}
        {total !== undefined && <div className="flex justify-between font-semibold text-base"><span>Total</span><span>${total.toFixed(2)}</span></div>}
      </div>
    </div>
  );
}
