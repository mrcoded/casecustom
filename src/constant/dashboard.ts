import { lastWeekSum, lastMonthSum } from "@/services/dashboard.service";

const WEEKLY_GOAL = 500;
const MONTHLY_GOAL = 2500;

const lastWeek = await lastWeekSum();
const lastMonth = await lastMonthSum();

export const DASHBOARD_CARDS = [
  {
    title: "Last Week",
    period: lastWeek,
    goal: WEEKLY_GOAL,
  },
  {
    title: "Last Month",
    period: lastMonth,
    goal: MONTHLY_GOAL,
  },
] as const;
