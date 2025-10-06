import React from "react";

import { cn, formatPrice } from "@/lib/utils";
import { CustomizationOptionsProps } from "../customize.types";
import { FINISHES, MATERIALS } from "@/validators/option-validators";

import {
  Description,
  RadioGroup,
  Label as RadioLabel,
  Radio,
} from "@headlessui/react";
import { Label } from "@/components/ui/label";

const DesignMaterialType = ({
  options,
  setOptions,
}: CustomizationOptionsProps) => {
  return (
    <>
      {[MATERIALS, FINISHES].map(({ name, options: selectableOptions }) => (
        <RadioGroup
          key={name}
          value={options[name]}
          onChange={(val) => {
            setOptions((prev) => ({
              ...prev,
              [name]: val,
            }));
          }}
        >
          <Label>{name.slice(0, 1).toUpperCase() + name.slice(1)}</Label>
          <div className="mt-3 space-y-4">
            {selectableOptions.map((option) => (
              <Radio
                key={option.value}
                value={option}
                className={({ focus, checked }) =>
                  cn(
                    "relative block cursor-pointer rounded-lg bg-white px-6 py-4 shadow-sm border-2 border-zinc-200 focus:outline-none ring-0 focus:ring-0 outline-none sm:flex sm:justify-between",
                    {
                      "border-primary": focus || checked,
                    }
                  )
                }
              >
                <span className="flex items-center">
                  <span className="flex flex-col text-sm">
                    <RadioLabel className="font-medium text-gray-900" as="span">
                      {option.label}
                    </RadioLabel>

                    {option.description ? (
                      <Description as="span" className="text-gray-500">
                        <span className="block sm:inline">
                          {option.description}
                        </span>
                      </Description>
                    ) : null}
                  </span>
                </span>

                <Description
                  as="span"
                  className="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right"
                >
                  <span className="font-medium text-gray-900">
                    {formatPrice(option.price / 100)}
                  </span>
                </Description>
              </Radio>
            ))}
          </div>
        </RadioGroup>
      ))}
    </>
  );
};

export default DesignMaterialType;
