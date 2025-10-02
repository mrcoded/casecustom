import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import PhoneTemplate from "@/components/PhoneTemplate";
import { POSSIBLE_ANINMATION_DELAYS } from "@/constant/landing-page";

interface ReviewProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
}

export function Review({ imgSrc, className, ...props }: ReviewProps) {
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
