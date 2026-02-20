import React from "react";

import DashboardCards from "./DashboardCards";
import DashboardTable from "./DashboardTable";

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <div className="max-w-7xl w-full mx-auto flex flex-col gap-4 py-4">
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

export default AdminDashboard;
