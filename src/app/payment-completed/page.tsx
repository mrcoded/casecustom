import React, { Suspense } from "react";
import PaymentCompleted from "@/app/payment-completed/_components/PaymentCompleted";

const Page = () => {
  return (
    <Suspense>
      <PaymentCompleted />
    </Suspense>
  );
};

export default Page;
