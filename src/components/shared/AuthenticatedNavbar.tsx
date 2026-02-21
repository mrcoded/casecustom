"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import { logoutServiceFn } from "@/services/logout.service";

const AuthenticatedNavbar = () => {
  const pathname = usePathname();

  //check if current page is dashboard
  const isHomepage = pathname === "/";
  const isAuthPage = pathname.includes("/auth");
  const isConfigPage = pathname.includes("/configure");
  const isDashboard = pathname.includes("/dashboard");
  const isPaymentPage = pathname.includes("/payment");

  return (
    <>
      <button
        onClick={logoutServiceFn}
        className={buttonVariants({
          size: "sm",
          variant: "ghost",
        })}
      >
        Sign out
      </button>

      {!isDashboard && !isHomepage && !isAuthPage && (
        <Link
          href="/dashboard"
          className={`${buttonVariants({
            size: "sm",
            variant: "ghost",
          })} flex items-center gap-1`}
        >
          Dashboard ✨
        </Link>
      )}
      {!isConfigPage && !isPaymentPage && (
        <Link
          href="/configure/upload"
          className={buttonVariants({
            size: "sm",
            className: "flex items-center gap-1",
          })}
        >
          Create case
          <ArrowRight className="sm:ml-1.5 sm:h-5 sm:w-5" />
        </Link>
      )}
    </>
  );
};

export default AuthenticatedNavbar;
