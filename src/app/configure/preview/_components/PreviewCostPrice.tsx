import React from "react";
import { formatPrice } from "@/lib/utils";

const PreviewCostPrice = ({
  design,
}: {
  design: { label: string; price: number };
}) => {
  return (
    <div className="flex items-center justify-between py-1 mt-2">
      <p className="text-gray-600">{design.label}</p>
      <p className="font-medium text-gray-900">
        {formatPrice(design.price / 100)}
      </p>
    </div>
  );
};

export default PreviewCostPrice;
