"use client";

import PhoneTemplate from "@/components/PhoneTemplate";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface ReviewProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
}

export function Review({ imgSrc, className, ...props }: ReviewProps) {
  const POSSIBLE_ANINMATION_DELAYS = [
    "0s",
    "0.1s",
    "0.2s",
    "0.3s",
    "0.4s",
    "0.5s",
  ];

  const animationDelay =
    POSSIBLE_ANINMATION_DELAYS[
      Math.floor(Math.random() * POSSIBLE_ANINMATION_DELAYS.length)
    ];

  return (
    <div
      className={cn(
        "animate-fade-in rounded-[2.25rem] bg-white p-6 opacity-0 shadow-xl shadow-slate-900/5",
        className
      )}
      style={{ animationDelay }}
      {...props}
    >
      <PhoneTemplate imgSrc={imgSrc} />
    </div>
  );
}
