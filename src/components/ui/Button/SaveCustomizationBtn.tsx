import React from "react";
import { ArrowRight } from "lucide-react";

import { Button } from "../button";

import { SaveCustomizationProps } from "@/app/configure/customize/customize.types";

const SaveCustomizationBtn = ({
  configId,
  isPending,
  options,
  saveCustomizeFn,
}: SaveCustomizationProps) => {
  return (
    <Button
      isLoading={isPending}
      disabled={isPending}
      loadingText="Saving"
      onClick={() =>
        saveCustomizeFn({
          configId,
          color: options.color.value,
          material: options.material.value,
          finish: options.finish.value,
          model: options.model.value,
        })
      }
      size="sm"
      className="w-full"
    >
      Continue{" "}
      <ArrowRight
        className="
                  h-4 w-4 ml-1.5 inline"
      />
    </Button>
  );
};

export default SaveCustomizationBtn;
