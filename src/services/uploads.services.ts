"use client";

import { useMutation } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";

import { createUploads } from "@/lib/actions/uploads.actions";

export function UploadService() {
  const { toast } = useToast();

  return useMutation({
    mutationKey: ["create-uploads"],
    mutationFn: async (configId: string | null) =>
      await createUploads({ configId }),
    onSuccess: (data) => {
      console.log("Upload saved successfully", data);
      toast({
        title: "Upload saved successfully",
        description: "Your upload has been saved to your account.",
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        title: "Something went wrong",
        description: "There was an error! Please try again.",
        variant: "destructive",
      });
    },
  });
}
