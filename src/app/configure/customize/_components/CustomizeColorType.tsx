import React from "react";

import { cn } from "@/lib/utils";
import { Radio, RadioGroup } from "@headlessui/react";

import { COLORS } from "@/validators/option-validators";
import { CustomizationOptionsProps } from "../../../../types/customize.types";

import { Label } from "@/components/ui/label";

const CustomizeColorType = ({
  options,
  setOptions,
}: CustomizationOptionsProps) => {
  return (
    <RadioGroup
      value={options.color}
      onChange={(val) => {
        setOptions((prev) => ({
          ...prev,
          color: val,
        }));
      }}
    >
      <Label>Color: {options.color.label}</Label>
      <div className="mt-3 flex items-center space-x-3">
        {COLORS.map((color) => (
          <Radio
            key={color.label}
            value={color}
            className={({ focus, checked }) =>
              cn(
                "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 active:ring-0 focus:ring-0 active:outline-none focus:outline-none border-2 border-transparent",
                {
                  [`border-${color.tw}`]: focus || checked,
                }
              )
            }
          >
            <span
              className={cn(
                `bg-${color.tw}`,
                "h-8 w-8 rounded-full border border-black border-opacity-10"
              )}
            />
          </Radio>
        ))}
      </div>
    </RadioGroup>
  );
};

export default CustomizeColorType;
