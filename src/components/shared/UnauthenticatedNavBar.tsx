"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

const UnauthenticatedNavBar = () => {
  return (
    <>
      <Link
        href="/auth/register"
        className={buttonVariants({
          size: "sm",
          variant: "ghost",
        })}
      >
        Sign up
      </Link>

      <Link
        href="/auth/login"
        className={buttonVariants({
          size: "sm",
          variant: "ghost",
        })}
      >
        Login
      </Link>

      <div className="h-8 w-px bg-zinc-200 hidden sm:block" />
      <Link
        href="/configure/upload"
        className={buttonVariants({
          size: "sm",
          className: "hidden sm:flex items-center gap-1",
        })}
      >
        Create case
        <ArrowRight className="ml-1.5 h-5 w-5" />
      </Link>
    </>
  );
};

export default UnauthenticatedNavBar;
