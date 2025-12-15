import React from "react";
import { FaUsers, FaBoxOpen, FaDollarSign, FaChartLine } from "react-icons/fa";
import { UserHeader } from "./Matched/UserHeader";
import { StatsCards } from "./Matched/StatsCards";
import { RevenueChart } from "./Matched/Charts/RevenueChart";
import { RecentOrders } from "./Matched/Tables/RecentOrders";
import UsersTable from "./Matched/Tables/UsersTable";

export const AdminDashboard = ({
  userData,
  user,
  products = [],
  allUsers = [],
  orders = [],
  timeRange,
  onTimeRangeChange,
}) => {
  const totalRevenue = orders.reduce((sum, order) => sum + (order.orderPrice || 0), 0);
  const adminUsers = allUsers.filter((user) => user.role === "admin").length;
  const managerUsers = allUsers.filter((user) => user.role === "manager").length;

  const adminStats = [
    {
      title: "Total Users",
      value: allUsers.length,
      change: "+12.5%",
      icon: <FaUsers className="text-2xl" />,
      color: "from-blue-500 to-blue-600",
      details: `${adminUsers} Admin, ${managerUsers} Manager`,
      subValue: `${allUsers.filter((u) => u.status !== "approved").length} pending`,
    },
    {
      title: "Total Products",
      value: products.length,
      change: "+8.2%",
      icon: <FaBoxOpen className="text-2xl" />,
      color: "from-green-500 to-green-600",
      details: "Listed products",
      subValue: `${products.filter((p) => p.showOnHomePage).length} on homepage`,
    },
    {
      title: "Total Revenue",
      value: `$${(totalRevenue / 1000).toFixed(1)}K`,
      change: "+18.5%",
      icon: <FaDollarSign className="text-2xl" />,
      color: "from-purple-500 to-purple-600",
      details: "From all orders",
      subValue: `${orders.filter((o) => o.status === "Delivered").length} delivered`,
    },
    {
      title: "System Health",
      value: "98.5%",
      change: "+0.5%",
      icon: <FaChartLine className="text-2xl" />,
      color: "from-yellow-500 to-yellow-600",
      details: "Uptime this month",
      subValue: "All systems operational",
    },
  ];

  return (
    <div className="space-y-6">
      <UserHeader
        userData={userData}
        user={user}
        role="admin"
        gradient="from-blue-600 to-purple-600"
        title="Admin Dashboard"
        subtitle={`Welcome back, ${userData?.name || "Admin"}!`}
        additionalInfo="Full system control and monitoring"
      />

      <StatsCards stats={adminStats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart timeRange={timeRange} onTimeRangeChange={onTimeRangeChange} />
        <RecentOrders orders={orders} title="Recent Orders" />
      </div>
      <UsersTable allUsers={allUsers}></UsersTable>
    </div>
  );
};
