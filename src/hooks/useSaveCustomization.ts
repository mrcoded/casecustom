"use client";

import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { saveCustomize as _saveCustomize } from "@/lib/actions/customize.actons";
import { SaveCustomizeArgs } from "@/app/configure/customize/customize.types";

const useSaveCustomization = ({
  configId,
  customizationSaveFn,
}: {
  configId: string;
  customizationSaveFn: () => Promise<void>;
}) => {
  const router = useRouter();
  const { toast } = useToast();

  //saveCustomize mutation Function
  const mutation = useMutation({
    mutationFn: async (args: SaveCustomizeArgs) => {
      await Promise.all([customizationSaveFn(), _saveCustomize(args)]);
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        variant: "destructive",
        description: error.message,
      });
    },
    onSuccess(data) {
      router.push(`/configure/preview?id=${configId}`);
    },
  });

  return {
    saveConfig: mutation,
    isPending: mutation.isPending,
  };
};

export default useSaveCustomization;
