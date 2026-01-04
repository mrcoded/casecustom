"use server";

import { db } from "@/config/db";

export const orders = async () => {
  return await db.order.findMany({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)), //greater or equal
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
      shippingAddress: true,
    },
  });
};

export const lastWeekSum = async () => {
  return await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)), //greater or equal
      },
    },
    _sum: {
      amount: true, //total sum of payment in the created time
    },
  });
};
export const lastMonthSum = async () => {
  return await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 30)), //greater or equal
      },
    },
    _sum: {
      amount: true, //total sum of payment in the created time
    },
  });
};
