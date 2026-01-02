"use client";

import { useCallback, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import Dropzone, { FileRejection } from "react-dropzone";
import { useUploadThing } from "@/lib/utils/uploadthing";

import { useToast } from "@/components/ui/use-toast";
import UploadInfoActions from "./_components/UploadInfoActions";

const Page = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  //start upload handler
  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
      const configId = data.serverData.configId;

      startTransition(() => {
        router.push(`/configure/customize?id=${configId}`);
      });

      toast({
        title: "Success",
        description: "Uploading Successfully Completed!",
        variant: "default",
      });
    },
    onUploadProgress(p) {
      setUploadProgress(p);
    },
    onUploadError(error) {
      console.log(error);
      if (error instanceof Error || error.message.includes("TURBOPACK")) {
        toast({
          title: "Something went wrong!",
          description: error.message,
          variant: "destructive",
        });
        throw new Error("Internal Server Error");
      }
      throw error;
    },
  });

  //reject upload handler
  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles;
    setIsDragOver(false);

    toast({
      title: `${file.file.type} type is not supported!`,
      description: "Please choose a PNG, JPG, or JPEG image instead",
      variant: "destructive",
    });
  };

  //successful upload handler
  const onDropAccepted = useCallback((acceptedFiles: File[]) => {
    startUpload(acceptedFiles, { configId: undefined });
    setIsDragOver(false);
  }, []);

  return (
    <div
      className={cn(
        "relative h-full flex-1 my-16 w-full rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center",
        {
          "ring-blue-900/25 bg-blue-900/10": isDragOver,
        }
      )}
    >
      <div className="relative flex flex-1 flex-col items-center justify-center w-full">
        <Dropzone
          noClick
          noKeyboard
          onDropRejected={onDropRejected}
          onDropAccepted={onDropAccepted}
          accept={{
            "image/png": [".png"],
            "image/jpeg": [".jpeg"],
            "image/jpg": [".jpg"],
          }}
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}
        >
          {({ getRootProps, getInputProps, open }) => (
            <div
              className="h-full w-full flex-1 flex flex-col items-center justify-center"
              {...getRootProps()}
            >
              <input {...getInputProps()} />

              {/* Uploading actions and info */}
              <UploadInfoActions
                open={open}
                isPending={isPending}
                isDragOver={isDragOver}
                isUploading={isUploading}
                uploadProgress={uploadProgress}
              />
            </div>
          )}
        </Dropzone>
      </div>
    </div>
  );
};

export default Page;
