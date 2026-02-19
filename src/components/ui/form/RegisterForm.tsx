"use client";

import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RegisterService from "@/services/register.service";

import { Input } from "@/components/ui/input";
import AuthButton from "@/components/ui/Button/AuthButton";

import { RegisterAuthFormValues } from "@/types/auth";
import { RegisterAuthSchema } from "@/validators/auth-validator";
import PasswordVisibility from "@/components/PasswordVisibility";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  //RegisterUser service function handler
  const { registerUser, isPending } = RegisterService();

  //Form validation
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<RegisterAuthFormValues>({
    resolver: zodResolver(RegisterAuthSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  //onSubmit handler
  const onSubmit = async (data: RegisterAuthFormValues) => {
    registerUser(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm mx-auto space-y-4"
    >
      <h1 className="text-2xl font-extrabold text-gray-900 text-center mb-6">
        Secure Register
      </h1>
      <fieldset disabled={isSubmitting} className="space-y-4">
        <Input
          name="name"
          control={control}
          label="Username"
          type="text"
          placeholder="Username"
        />
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
          btnLabel="Sign Up"
          btnPending="Signing Up..."
        />
      </fieldset>
    </form>
  );
}
