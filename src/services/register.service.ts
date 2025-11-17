"use client";

import { useToast } from "@/components/ui/use-toast";

import { useMutation } from "@tanstack/react-query";
import { registerUserFn } from "@/lib/actions/auth.actions";

export default function registerService() {
  const { toast } = useToast();

  //RegisterUser function handler
  const { mutate: registerUser, isPending } = useMutation({
    mutationFn: registerUserFn,
    onSuccess: (data) => {
      if (data?.success) {
        toast({
          title: "Success",
          description: `${data.message}`,
          variant: "default",
        });
      } else {
        toast({
          title: "Something went wrongs",
          description: `${data.message}`,
          variant: "destructive",
        });
      }
    },
    onError: (data) => {
      toast({
        title: "Something went wrong",
        description: `${data.cause}`,
        variant: "destructive",
      });
    },
  });

  return { registerUser, isPending };
}
