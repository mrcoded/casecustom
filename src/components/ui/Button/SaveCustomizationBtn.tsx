"use client";

import React, { useCallback } from "react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

import useSaveCustomizaton from "@/hooks/useSaveCustomization";
import { SaveCustomizationService } from "@/services/save-customize.service";
import { SaveCustomizeServiceProps } from "@/types/customize.types";

const SaveCustomizationBtn = ({
  configId,
  options,
  imageUrl,
  startUpload,
  phoneCaseRef,
  containerCaseRef,
  renderedDimension,
  renderedPosition,
}: SaveCustomizeServiceProps) => {
  //Customization Save function
  const customizationSaveFn = useCallback(() => {
    return SaveCustomizationService({
      options,
      configId,
      imageUrl,
      startUpload,
      phoneCaseRef,
      containerCaseRef,
      renderedDimension,
      renderedPosition,
    });
  }, [
    options,
    configId,
    imageUrl,
    startUpload,
    phoneCaseRef,
    containerCaseRef,
    renderedDimension,
    renderedPosition,
  ]);

  //Save Customization hooks handler
  const { isPending, saveConfig } = useSaveCustomizaton({
    configId,
    customizationSaveFn,
  });

  return (
    <Button
      isLoading={isPending}
      disabled={isPending}
      loadingText="Saving"
      onClick={() =>
        saveConfig.mutate({
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
