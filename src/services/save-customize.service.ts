"use client";

import { saveCustomize as _saveCustomize } from "@/lib/actions/customize.actons";

import { base64ToBlob } from "@/lib/utils/base64ToBlob";
import { SaveCustomizeServiceProps } from "@/types/customize.types";

export async function SaveCustomizationService({
  configId,
  imageUrl,
  startUpload,
  phoneCaseRef,
  containerCaseRef,
  renderedDimension,
  renderedPosition,
}: SaveCustomizeServiceProps) {
  async function saveCustomization() {
    try {
      const {
        left: caseLeft,
        top: caseTop,
        width,
        height,
      } = phoneCaseRef.current!.getBoundingClientRect();

      const { left: containerLeft, top: containerTop } =
        containerCaseRef.current!.getBoundingClientRect();

      const leftOffset = caseLeft - containerLeft;
      const topOffset = caseTop - containerTop;

      const actualX = renderedPosition.x - leftOffset;
      const actualY = renderedPosition.y - topOffset;

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      const userImage = new Image();
      userImage.crossOrigin = "anonymous";
      userImage.src = imageUrl;
      await new Promise((resolve) => (userImage.onload = resolve));

      ctx?.drawImage(
        userImage,
        actualX,
        actualY,
        renderedDimension.width,
        renderedDimension.height
      );

      const base64 = canvas.toDataURL();
      const base64Data = base64.split(",")[1];

      const blob = base64ToBlob(base64Data, "image/png");
      const file = new File([blob], "filename.png", { type: "image/png" });

      await startUpload([file], { configId });
    } catch (err) {
      console.log(err);
      throw new Error(
        "There was a problem saving your config, please try again."
      );
    }
  }

  await saveCustomization();
}
