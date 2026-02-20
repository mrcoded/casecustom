import React from "react";

import { formatPrice } from "@/lib/utils";
import { orders } from "@/services/dashboard.service";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import StatusDropdown from "./StatusDropdown";

const DashboardTable = async () => {
  const ordersData = await orders();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead className="hidden sm:table-cell">Status</TableHead>
          <TableHead className="hidden sm:table-cell">Purchase date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {ordersData.map((order) => (
          <TableRow key={order.id} className="bg-accent">
            <TableCell>
              <div className="font-medium">{order.shippingAddress?.name}</div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                {order.user.email}
              </div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              <StatusDropdown id={order.id} orderStatus={order.status} />
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {order.createdAt.toLocaleDateString()}
            </TableCell>
            <TableCell className="text-right">
              {formatPrice(order.amount)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DashboardTable;
