"use client";

import React from "react";
import { InputFieldProps } from "@/types/auth";
import { useController, FieldValues } from "react-hook-form";

export function Input<T extends FieldValues>({
  name,
  control,
  label,
  type = "text",
  placeholder = "",
}: InputFieldProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={field.name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        {...field}
        id={field.name}
        type={type}
        placeholder={placeholder || label}
        className={`w-full py-1.5 px-2.5 border rounded-lg transition-colors focus:outline-none focus:ring-2 ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-100"
            : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-100"
        } shadow-sm`}
      />
      {error && (
        <p className="text-xs text-red-500 mt-1" role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
}
