import React from "react";
import { notFound } from "next/navigation";

import { getServerSession } from "next-auth";

import AdminDashboard from "./_components/Admin/AdminDashboard";
import CustomerDashboard from "./_components/Customer/CustomerDashboard";

const Page = async () => {
  const session = await getServerSession();
  const user = session?.user;

  //check if admin
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

  //if not admin or signed in user
  if (!user) {
    return notFound();
  }

  return (
    <>
      {user?.email !== ADMIN_EMAIL ? <CustomerDashboard /> : <AdminDashboard />}
    </>
  );
};

export default Page;
