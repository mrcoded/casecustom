import { Dispatch, SetStateAction } from "react";
import {
  COLORS,
  FINISHES,
  MATERIALS,
  MODELS,
} from "@/validators/option-validators";

import type {
  CaseColor,
  CaseFinish,
  CaseMaterial,
  PhoneModel,
} from "~/generated/prisma/client";
import { ClientUploadedFileData } from "uploadthing/types";
import { UseMutationResult } from "@tanstack/react-query";

export interface CustomizeOptionsProps {
  color: (typeof COLORS)[number];
  model: (typeof MODELS.options)[number];
  material: (typeof MATERIALS.options)[number];
  finish: (typeof FINISHES.options)[number];
}

export interface DesignCustomizationProps {
  configId: string;
  imageUrl: string;
  imageDimensions: {
    width: number;
    height: number;
  };
}

export interface OptionsProps {
  value: string;
  label: string;
  description: string;
  option: string;
  price: number;
}

export interface CustomizeDnDAreaProps {
  options: CustomizeOptionsProps;
  phoneCaseRef: {
    current: HTMLDivElement | null;
  };
  containerCaseRef: {
    current: HTMLDivElement | null;
  };
  imageUrl: string;
  imageDimensions: {
    height: number;
    width: number;
  };
  setRenderedDimension: Dispatch<
    SetStateAction<{
      height: number;
      width: number;
    }>
  >;
  setRenderedPosition: Dispatch<
    SetStateAction<{
      x: number;
      y: number;
    }>
  >;
}

type StartUploadProps = (
  files: File[],
  input: {
    configId?: string | undefined;
  }
) => Promise<
  | ClientUploadedFileData<{
      configId: string;
    }>[]
  | undefined
>;

export interface SaveCustomizeServiceProps {
  options: CustomizeOptionsProps;
  configId: string;
  startUpload: StartUploadProps;
  phoneCaseRef: {
    current: HTMLDivElement | null;
  };
  containerCaseRef: {
    current: HTMLDivElement | null;
  };
  imageUrl: string;
  renderedDimension: {
    height: number;
    width: number;
  };
  renderedPosition: {
    x: number;
    y: number;
  };
}

export interface SaveCustomizeArgs {
  color: CaseColor;
  finish: CaseFinish;
  material: CaseMaterial;
  model: PhoneModel;
  configId: string;
}

export interface CustomizationSaveProps {
  configId: string;
  imageUrl: string;
  isPending?: boolean;
  options: CustomizeOptionsProps;
  saveCustomizatonFn: UseMutationResult<
    void,
    Error,
    SaveCustomizeArgs,
    unknown
  >;
}

export interface CustomizationOptionsProps {
  options: CustomizeOptionsProps;
  setOptions: Dispatch<SetStateAction<CustomizeOptionsProps>>;
}

export interface CustomizePageProps {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}
