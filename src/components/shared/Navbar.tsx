"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import { logoutServiceFn } from "@/services/logout.service";

import { buttonVariants } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";

const Navbar = () => {
  const pathname = usePathname();
  const session = useSession();

  //check if current page is dashboard
  const isHomepage = pathname === "/";
  const isAuthPage = pathname.includes("/auth");
  const isConfigPage = pathname.includes("/configure");
  const isDashboard = pathname.includes("/dashboard");

  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold capitalize">
            case<span className="text-green-600">custom</span>
          </Link>
          {session.status !== "loading" ? (
            <div className="h-full flex items-center space-x-4">
              {session.status === "authenticated" ? (
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
                  {!isConfigPage && (
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
              ) : (
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
              )}
            </div>
          ) : null}
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
