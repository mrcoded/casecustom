"use client";

import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

import { useMutation } from "@tanstack/react-query";
import { registerUserFn } from "@/lib/actions/auth.actions";

export default function registerService() {
  const router = useRouter();
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

        //redirect to login
        router.push("/auth/login");
      } else {
        toast({
          title: "Something went wrong",
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
