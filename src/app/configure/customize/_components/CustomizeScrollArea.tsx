import React from "react";

import { CustomizationOptionsProps } from "@/types/customize.types";

import PhoneModelOptions from "./PhoneModelOptions";
import DesignMaterialType from "./DesignMaterialType";
import CustomizeColorType from "./CustomizeColorType";
import { ScrollArea } from "@/components/ui/scroll-area";

const CustomizeScrollArea = ({
  options,
  setOptions,
}: CustomizationOptionsProps) => {
  return (
    <ScrollArea className="relative flex-1 overflow-auto">
      <div
        aria-hidden="true"
        className="absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none"
      />

      <div className="px-8 pb-12 pt-8">
        <h2 className="tracking-tight font-bold text-3xl">
          Customize your case
        </h2>

        <div className="w-full h-px bg-zinc-200 my-6" />

        <div className="relative mt-4 h-full flex flex-col justify-between">
          <div className="flex flex-col gap-6">
            {/* Customize Color Type */}
            <CustomizeColorType options={options} setOptions={setOptions} />
            {/* Phone Model Options */}
            <PhoneModelOptions options={options} setOptions={setOptions} />
            {/* Design Material Type */}
            <DesignMaterialType options={options} setOptions={setOptions} />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default CustomizeScrollArea;
