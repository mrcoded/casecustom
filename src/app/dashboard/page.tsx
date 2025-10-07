import React from "react";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";

import DashboardCards from "./_components/DashboardCards";
import DashboardTable from "./_components/DashboardTable";

const Page = async () => {
  const session = await getServerSession();
  const user = session?.user;

  //check if admin
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

  //if not admin or signed in user
  if (!user || user.email !== ADMIN_EMAIL) {
    return notFound();
  }

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <div className="max-w-7xl w-full mx-auto flex flex-col sm:gap-4 sm:py-4">
        <div className="flex flex-col gap-16">
          {/* Dashboard Cards */}
          <DashboardCards />

          <h1 className="text-4xl font-bold tracking-tight">Incoming orders</h1>
          {/* Dashboard Table */}
          <DashboardTable />
        </div>
      </div>
    </div>
  );
};

export default Page;
