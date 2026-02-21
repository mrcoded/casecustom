"use client";

import { useRouter } from "next/navigation";
import { signIn, SignInResponse } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";

import { LoginProps } from "@/types/auth";
import { useToast } from "@/components/ui/use-toast";

const loginServiceFn = async (
  data: LoginProps,
): Promise<SignInResponse | undefined> => {
  return await signIn("credentials", {
    email: data.email,
    password: data.password,
    redirect: false,
  });
};

export function LoginService() {
  const router = useRouter();
  const { toast } = useToast();

  //login mutation handler
  return useMutation({
    mutationFn: loginServiceFn,
    onSuccess: (data) => {
      // Prefetch the auth-callback page to speed up navigation
      router.prefetch("/auth-callback");

      if (data?.ok) {
        toast({
          title: "Success",
          description: "Login Successful! Redirecting...",
          variant: "default",
        });

        router.push("/auth-callback");
      } else {
        console.log(data);
        toast({
          title: "Something went wrong",
          description: `${data?.error}`,
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        description: `${error.message}`,
        variant: "destructive",
      });
    },
  });
}
