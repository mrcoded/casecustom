import React from "react";
import { formatPrice } from "@/lib/utils";

import { BASE_PRICE } from "@/constant/product";
import { SaveCustomizeServiceProps } from "../customize.types";
import { saveCustomize as _saveCustomize } from "@/lib/actions/customize.actons";

import SaveCustomizationBtn from "@/components/ui/Button/SaveCustomizationBtn";

const SaveCustomization = ({
  options,
  configId,
  imageUrl,
  startUpload,
  phoneCaseRef,
  containerCaseRef,
  renderedDimension,
  renderedPosition,
}: SaveCustomizeServiceProps) => {
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
            imageUrl={imageUrl}
            startUpload={startUpload}
            phoneCaseRef={phoneCaseRef}
            containerCaseRef={containerCaseRef}
            renderedDimension={renderedDimension}
            renderedPosition={renderedPosition}
          />
        </div>
      </div>
    </div>
  );
};

export default SaveCustomization;
