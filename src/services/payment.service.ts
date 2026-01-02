"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";
import { createCheckoutSession } from "@/lib/actions/preview.actions";

export function PaymentService({ configId }: { configId: string }) {
  const { toast } = useToast();
  const router = useRouter();

  return useMutation({
    mutationKey: ["create-checkout-session"],
    mutationFn: () => createCheckoutSession({ configId }),
    onSuccess: ({ url }: { url: string | null }) => {
      if (url) {
        router.push(url);
      } else {
        throw new Error("Unable to retrieve payment URL.");
      }
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
