import React from "react";

import { Progress } from "@/components/ui/progress";
import { UploadInfoActionsProps } from "../upload.types";
import { Image, Loader2, MousePointerSquareDashed } from "lucide-react";

const UploadInfoActions = ({
  open,
  isUploading,
  isPending,
  isDragOver,
  uploadProgress,
}: UploadInfoActionsProps) => {
  return (
    <>
      {isDragOver ? (
        <MousePointerSquareDashed className="h-6 w-6 text-zinc-500 mb-2" />
      ) : isUploading || isPending ? (
        <Loader2 className="animate-spin h-6 w-6 text-zinc-500 mb-2" />
      ) : (
        <Image className="h-6 w-6 text-zinc-500 mb-2" />
      )}
      <div className="flex flex-col justify-center mb-2 text-sm text-zinc-700">
        {isUploading ? (
          <div className="flex flex-col items-center">
            <p>Uploading...</p>
            <Progress
              value={uploadProgress}
              className="mt-2 w-40 h-2 bg-gray-300"
            />
          </div>
        ) : isPending ? (
          <div className="flex flex-col items-center">
            <p>Redirecting, please wait...</p>
          </div>
        ) : isDragOver ? (
          <p>
            <span className="font-semibold">Drop file</span> to upload!
          </p>
        ) : (
          <p>
            <span
              className="font-semibold cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                open();
              }}
            >
              Click to upload
            </span>{" "}
            or drag and drop!
          </p>
        )}
      </div>
      {isPending ? null : (
        <p className="text-xs text-zinc-500">PNG, JPG, JPEG</p>
      )}
    </>
  );
};

export default UploadInfoActions;
