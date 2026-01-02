"use client";

import { signOut, SignOutResponse } from "next-auth/react";

// Logout function handler
export const logoutServiceFn = async (): Promise<
  SignOutResponse | undefined
> => {
  return await signOut({ callbackUrl: "/", redirect: true });
};
