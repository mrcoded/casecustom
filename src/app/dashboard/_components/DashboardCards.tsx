import React from "react";

import { formatPrice } from "@/lib/utils";
import { DASHBOARD_CARDS } from "@/constant/dashboard";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const DashboardCards = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {DASHBOARD_CARDS.map((card, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <CardDescription></CardDescription>
            <CardTitle className="text-4xl">
              {formatPrice(card.period._sum.amount ?? 0)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              of {formatPrice(card.goal)} goal
            </div>
          </CardContent>
          <CardFooter>
            <Progress
              value={((card.period._sum.amount ?? 0) * 100) / card.goal}
            />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default DashboardCards;
