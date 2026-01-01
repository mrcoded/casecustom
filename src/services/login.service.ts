"use client";

import { useRouter } from "next/navigation";
import {
  signIn,
  SignInResponse,
  signOut,
  SignOutResponse,
} from "next-auth/react";
import { useMutation } from "@tanstack/react-query";

import { LoginProps } from "@/types/auth";
import { useToast } from "@/components/ui/use-toast";

const loginServiceFn = async (
  data: LoginProps
): Promise<SignInResponse | undefined> => {
  return await signIn("credentials", {
    email: data.email,
    password: data.password,
    redirect: false,
  });
};

// Logout function handler
export const logoutServiceFn = async (): Promise<
  SignOutResponse | undefined
> => {
  return await signOut({ callbackUrl: "/", redirect: true });
};

export function loginService() {
  const router = useRouter();
  const { toast } = useToast();

  //login mutation handler
  return useMutation({
    mutationFn: loginServiceFn,
    onSuccess: (data) => {
      if (data?.ok) {
        toast({
          title: "Success",
          description: "Login Successful! Redirecting...",
          variant: "default",
        });

        router.push("/configure/upload");
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
        title: "Something went wrongs",
        description: `${error.message}`,
        variant: "destructive",
      });
    },
  });
}
