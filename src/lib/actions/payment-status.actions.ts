"use server";

import { db } from "@/config/db";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/authOptions";

export const getPaymentStatus = async ({ orderId }: { orderId: string }) => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  //if no user or user email
  if (!user?.id || !user?.email) {
    throw new Error("You need to be logged in to view this page.");
  }

  //Find order by current user id and order id
  const order = await db.order.findFirst({
    where: { id: orderId, userId: user?.id },
    include: {
      billingAddress: true,
      configuration: true,
      shippingAddress: true,
      user: true,
    },
  });

  //if no order
  if (!order) throw new Error("This order does not exist.");

  //if order, update order isPaid status
  if (order.isPaid) {
    return order;
  } else {
    return false;
  }
};
