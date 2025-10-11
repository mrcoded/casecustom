export const PAYMENT_COST = (amount: number) =>
  [
    { label: "Subtotal", price: amount },
    { label: "Shipping", price: 0 },
    { label: "Total", price: amount },
  ] as const;
