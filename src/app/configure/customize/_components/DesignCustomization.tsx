"use client";

import { useRef, useState } from "react";

import { useUploadThing } from "@/lib/utils/uploadthing";
import { saveCustomize as _saveCustomize } from "@/lib/actions/customize.actons";

import {
  CustomizeOptionsProps,
  DesignCustomizationProps,
} from "../customize.types";
import {
  COLORS,
  FINISHES,
  MATERIALS,
  MODELS,
} from "@/validators/option-validators";

import CustomizeDnDArea from "./CustomizeDnDArea";
import SaveCustomization from "./SaveCustomization";
import CustomizeScrollArea from "./CustomizeScrollArea";

const DesignCustomization = ({
  configId,
  imageUrl,
  imageDimensions,
}: DesignCustomizationProps) => {
  const phoneCaseRef = useRef<HTMLDivElement | null>(null);
  const containerCaseRef = useRef<HTMLDivElement | null>(null);

  //uploadthing
  const { startUpload } = useUploadThing("imageUploader");

  const [renderedDimension, setRenderedDimension] = useState({
    height: imageDimensions.height / 4,
    width: imageDimensions.width / 4,
  });

  const [renderedPosition, setRenderedPosition] = useState({
    x: 150,
    y: 205,
  });

  const [options, setOptions] = useState<CustomizeOptionsProps>({
    color: COLORS[0],
    model: MODELS.options[0],
    material: MATERIALS.options[0],
    finish: FINISHES.options[0],
  });

  return (
    <div className="relative mt-20 grid grid-cols-1 lg:grid-cols-3 mb-20 pb-20">
      <CustomizeDnDArea
        options={options}
        imageUrl={imageUrl}
        phoneCaseRef={phoneCaseRef}
        imageDimensions={imageDimensions}
        containerCaseRef={containerCaseRef}
        setRenderedPosition={setRenderedPosition}
        setRenderedDimension={setRenderedDimension}
      />

      <div className="h-[37.5rem] w-full col-span-full lg:col-span-1 flex flex-col bg-white">
        <CustomizeScrollArea options={options} setOptions={setOptions} />

        {/* Save Customization Configuration and Cost Price*/}
        <SaveCustomization
          options={options}
          configId={configId}
          imageUrl={imageUrl}
          startUpload={startUpload}
          phoneCaseRef={phoneCaseRef}
          renderedPosition={renderedPosition}
          containerCaseRef={containerCaseRef}
          renderedDimension={renderedDimension}
        />
      </div>
    </div>
  );
};

export default DesignCustomization;
