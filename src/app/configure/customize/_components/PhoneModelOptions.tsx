import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { MODELS } from "@/validators/option-validators";
import { CustomizationOptionsProps } from "../customize.types";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const PhoneModelOptions = ({
  options,
  setOptions,
}: CustomizationOptionsProps) => {
  return (
    <div className="relative flex flex-col gap-3 w-full">
      <Label>Model</Label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-between"
          >
            {options.model.label}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {MODELS.options.map((model) => (
            <DropdownMenuItem
              key={model.label}
              className={cn(
                "flex text-sm gap-1 items-center p-1,5 cursor-pointer hover:bg-zinc-100",
                {
                  "bg-zinc-100": model.label === options.model.label,
                }
              )}
              onClick={() => {
                setOptions((prev) => ({ ...prev, model }));
              }}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  model.label === options.model.label
                    ? "opacity-100"
                    : "opacity-0"
                )}
              />
              {model.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default PhoneModelOptions;
