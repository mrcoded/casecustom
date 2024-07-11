"use client";

import { getPaymentStatus } from "@/lib/actions/payment-status.actions";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const PaymentCompleted = () => {
  const {} = useQuery({
    queryKey: ["get-payment-status"],
    queryFn: async () => await getPaymentStatus(),
  });

  return <div>PaymentCompleted</div>;
};

export default PaymentCompleted;
