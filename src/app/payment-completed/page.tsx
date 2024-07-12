import PaymentCompleted from "@/components/PaymentCompleted";
import React, { Suspense } from "react";

const Page = () => {
  return (
    <Suspense>
      <PaymentCompleted />
    </Suspense>
  );
};

export default Page;
