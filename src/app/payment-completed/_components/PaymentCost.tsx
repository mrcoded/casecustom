import React from "react";

import { formatPrice } from "@/lib/utils";
import { PAYMENT_COST } from "@/constant/payment-completed";

const PaymentCost = ({ amount }: { amount: number }) => {
  return (
    <div className="space-y-6 border-t border-zinc-200 pt-10 text-sm">
      {PAYMENT_COST(amount).map((cost, index) => (
        <div key={index} className="flex justify-between">
          <p className="font-medium text-zinc-900">{cost.label}</p>
          <p className="font-medium text-zinc-700">{formatPrice(cost.price)}</p>
        </div>
      ))}
    </div>
  );
};

export default PaymentCost;
