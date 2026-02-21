import { Suspense } from "react";
import type { Metadata } from "next";

import { Recursive } from "next/font/google";
import "./globals.css";

import Loading from "./loading";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "@/providers/QueryProviders";

import { constructMetadata } from "@/lib/utils";
import AuthProvider from "@/providers/AuthProvider";

const recursive = Recursive({ subsets: ["latin"] });

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={recursive.className}>
        <Suspense fallback={<Loading />}>
          <AuthProvider>
            <Navbar />

            <main className="flex grainy-light flex-col min-h-[calc(100vh-3.5rem-1px)] ">
              <div className="flex flex-1 justify-center flex-col h-full">
                <QueryProvider>{children}</QueryProvider>
              </div>
            </main>
            <Footer />
          </AuthProvider>
        </Suspense>

        <Toaster />
      </body>
    </html>
  );
}
