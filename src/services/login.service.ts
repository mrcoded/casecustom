"use client";

import { LoginProps } from "@/types/auth";
import { signIn, SignInResponse } from "next-auth/react";

export const LoginServiceFn = async (
  data: LoginProps
): Promise<SignInResponse | undefined> => {
  return await signIn("credentials", {
    email: data.email,
    password: data.password,
    redirect: false,
  });
};
