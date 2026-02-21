import React from "react";

import { formatPrice } from "@/lib/utils";
import { userOrders } from "@/services/dashboard.service";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CustomerTable = async () => {
  const ordersData = await userOrders();

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Orders</h2>
      <p className="text-lg sm:text-xl text-muted-foreground">
        View and manage your orders here.
      </p>

      {ordersData && ordersData.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Id:</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="hidden sm:table-cell">
                Purchase date
              </TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Paid</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {ordersData.slice(0, 6).map((order) => (
              <TableRow key={order.id} className="bg-accent">
                <TableCell>
                  <div className="font-medium text-sm text-muted-foreground my-1.5">
                    {order.id}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {order.status}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {order.createdAt.toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  {formatPrice(order.amount)}
                </TableCell>
                <TableCell className="text-right">
                  {order.isPaid ? (
                    <span className="text-green-500 font-semibold tracking-widest">
                      Paid
                    </span>
                  ) : (
                    <span className="text-red-500 font-semibold tracking-widest">
                      Unpaid
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-lg sm:text-2xl font-semibold text-center py-12 text-muted-foreground">
          No orders yet.
        </div>
      )}
    </div>
  );
};

export default CustomerTable;
