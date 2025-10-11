import React from "react";
import { Loader2 } from "lucide-react";

const PaymentStatus = ({
  heading,
  description,
}: {
  heading: string;
  description: string;
}) => {
  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
        <h3 className="font-semibold text-xl">{heading}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default PaymentStatus;
