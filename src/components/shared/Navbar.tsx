"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import AuthenticatedNavbar from "./AuthenticatedNavbar";
import UnauthenticatedNavBar from "./UnauthenticatedNavBar";

import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";

const Navbar = () => {
  const session = useSession();

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
                <AuthenticatedNavbar />
              ) : (
                <UnauthenticatedNavBar />
              )}
            </div>
          ) : null}
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
