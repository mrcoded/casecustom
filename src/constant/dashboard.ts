import { lastMonthSum, lastWeekSum } from "@/services/dashboard.service";

const WEEKLY_GOAL = 500;
const MONTHLY_GOAL = 2500;

export const DASHBOARD_CARDS = [
  {
    title: "Last Week",
    period: lastWeekSum,
    goal: WEEKLY_GOAL,
  },
  {
    title: "Last Month",
    period: lastMonthSum,
    goal: MONTHLY_GOAL,
  },
] as const;
