import React from "react";
import { getServerSession } from "next-auth";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import UserUploads from "./UserUploads";
import CustomerTable from "./CustomerTable";

import { db } from "@/config/db";
import { authOptions } from "@/lib/authOptions";

const CustomerDashboard = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  //get user uploads
  const userUploads = await db.uploads.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <div className="max-w-7xl w-full mx-auto p-3 sm:p-6 space-y-6">
        <div className="flex flex-col">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Customer Dashboard
          </h1>
          <p className="text-muted-foreground">
            This is the customer dashboard. You can view your orders and manage
            your account.
          </p>
        </div>

        <Tabs defaultValue="orders" className="flex flex-col gap-5 w-full">
          <TabsList className="space-x-2">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="uploads">My Uploads</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <CustomerTable />
          </TabsContent>

          <TabsContent value="uploads">
            <UserUploads uploads={userUploads} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomerDashboard;
