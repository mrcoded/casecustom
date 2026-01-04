import React from "react";
import { formatPrice } from "@/lib/utils";
import { Configuration } from "~/generated/prisma/client";

import PreviewCostPrice from "./PreviewCostPrice";
import { DESIGN_PRICE } from "@/constant/design-preview";
import { BASE_PRICE, PRODUCT_PRICES } from "@/constant/product";

const DesignPreviewCost = (configuration: Configuration) => {
  //destructure finish and material from configuration
  const { finish, material } = configuration;

  //Calculate total price based on finish and material choice
  let totalPrice = BASE_PRICE;
  if (material === "polycarbonate") {
    totalPrice += PRODUCT_PRICES.material.polycarbonate;
  }

  if (finish === "textured") {
    totalPrice += PRODUCT_PRICES.finish.textured;
  }

  return (
    <div className="bg-gray-50 p-6 sm:rounded-lg sm:p-8">
      <div className="flow-root text-sm">
        <PreviewCostPrice design={DESIGN_PRICE[0]} />

        {finish === "textured" ? (
          <PreviewCostPrice design={DESIGN_PRICE[1]} />
        ) : null}

        {material === "polycarbonate" ? (
          <PreviewCostPrice design={DESIGN_PRICE[2]} />
        ) : null}

        <div className="my-2 h-px bg-gray-200" />

        <div className="flex items-center justify-between py-2">
          <p className="font-semibold text-gray-900">Order total</p>
          <p className="font-semibold text-gray-900">
            {formatPrice(totalPrice / 100)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DesignPreviewCost;
