import React from "react";
import { formatPrice } from "@/lib/utils";

import { BASE_PRICE } from "@/constant/product";
import { SaveCustomizationProps } from "../customize.types";

import SaveCustomizationBtn from "@/components/ui/Button/SaveCustomizationBtn";

const SaveCustomization = ({
  options,
  configId,
  isPending,
  saveCustomizeFn,
}: SaveCustomizationProps) => {
  return (
    <div className="w-full px-8 h-16 bg-white">
      <div className="h-px w-full bg-zinc-200" />
      <div className="w-full h-full flex justify-end items-center">
        <div className="w-full flex gap-6 items-center">
          <p className="font-medium whitespace-nowrap">
            {formatPrice(
              (BASE_PRICE + options.finish.price + options.material.price) / 100
            )}
          </p>

          {/* Save Customization button */}
          <SaveCustomizationBtn
            options={options}
            configId={configId}
            isPending={isPending}
            saveCustomizeFn={saveCustomizeFn}
          />
        </div>
      </div>
    </div>
  );
};

export default SaveCustomization;
