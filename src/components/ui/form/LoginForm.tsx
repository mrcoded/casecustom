"use client";

import React, { useState } from "react";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginAuthFormValues } from "@/types/auth";
import { LoginService } from "@/services/login.service";
import { LoginAuthSchema } from "@/validators/auth-validator";

import { Input } from "@/components/ui/input";
import AuthButton from "@/components/ui/Button/AuthButton";
import PasswordVisibility from "@/components/PasswordVisibility";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { mutate: loginUser, isPending } = LoginService();

  // Initialize validation
  const { control, handleSubmit } = useForm<LoginAuthFormValues>({
    resolver: zodResolver(LoginAuthSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //onSubmit handler
  const onSubmit = async (data: LoginAuthFormValues) => {
    loginUser(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm mx-auto space-y-8"
    >
      <h1 className="text-2xl font-extrabold text-gray-900 text-center mb-6">
        Secure Login
      </h1>
      <fieldset disabled={isPending} className="space-y-4">
        <Input
          name="email"
          control={control}
          label="Email Address"
          type="email"
          placeholder="e.g. yourname@example.com"
        />
        <div className="relative flex flex-col space-y-1.5">
          <Input
            name="password"
            control={control}
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
          />
          <PasswordVisibility
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        </div>

        <AuthButton
          isPending={isPending}
          btnLabel="Sign In"
          btnPending="Signing In..."
        />
        <p className="text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </fieldset>
    </form>
  );
}
