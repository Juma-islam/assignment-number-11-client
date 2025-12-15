import React from "react";
import { FaShoppingBag, FaMoneyBillWave, FaTruck, FaCheckCircle, FaHistory } from "react-icons/fa";
import { useNavigate } from "react-router";
import { UserHeader } from "./Matched/UserHeader";
import { StatsCards } from "./Matched/StatsCards";

export const BuyerDashboard = ({ userData, user, orders = [] }) => {
  const navigate = useNavigate();
  const totalSpent = orders.reduce((sum, order) => sum + (order.orderPrice || 0), 0);
  const activeOrders = orders.filter((o) => !["Delivered", "Rejected"].includes(o.status)).length;
  const pendingPayment = orders.filter((o) => o.paymentStatus === "Pending").length;

  const buyerStats = [
    {
      title: "Total Orders",
      value: orders.length,
      change: "+3.2%",
      icon: <FaShoppingBag className="text-2xl" />,
      color: "from-blue-500 to-blue-600",
      details: "All time orders",
      subValue: `${activeOrders} active orders`,
    },
    {
      title: "Total Spent",
      value: `$${(totalSpent / 1000).toFixed(1)}K`,
      change: "+15.8%",
      icon: <FaMoneyBillWave className="text-2xl" />,
      color: "from-green-500 to-green-600",
      details: "Lifetime spending",
      subValue: `${pendingPayment} pending payment`,
    },
    {
      title: "Active Orders",
      value: activeOrders,
      change: "+8.5%",
      icon: <FaTruck className="text-2xl" />,
      color: "from-purple-500 to-purple-600",
      details: "In progress",
      subValue: "Track below",
    },
    {
      title: "Success Rate",
      value: `${((orders.filter((o) => o.status === "Delivered").length / orders.length) * 100 || 0).toFixed(1)}%`,
      change: "+2.1%",
      icon: <FaCheckCircle className="text-2xl" />,
      color: "from-yellow-500 to-yellow-600",
      details: "Delivery success",
      subValue: "Satisfaction score",
    },
  ];

  const recentOrders = orders.slice(0, 3);

  return (
    <div className="space-y-6">
      <UserHeader
        userData={userData}
        user={user}
        role="buyer"
        gradient="from-purple-600 to-pink-600"
        title="My Dashboard"
        subtitle={`Welcome back, ${userData?.name || "Customer"}!`}
        additionalInfo={`${orders.length} Orders • $${(totalSpent / 1000).toFixed(1)}K Spent`}
      />

      <StatsCards stats={buyerStats} />

      <div className="card shadow-lg">
        <div className="card-body">
          <h3 className="card-title mb-6">Order Tracking</h3>
          {recentOrders.length > 0 ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-bold">Recent Orders</h4>
                  {recentOrders.map((order) => (
                    <div
                      key={order._id}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg border border-gray-100"
                    >
                      <div>
                        <p className="font-semibold">{order.productTitle}</p>
                        <p className="text-sm ">Qty: {order.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">${order.orderPrice}</p>
                        <span
                          className={`badge ${
                            order.status === "Delivered"
                              ? "badge-success"
                              : order.status === "Pending"
                              ? "badge-warning"
                              : "badge-info"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="font-bold mb-4">Quick Actions</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => navigate("/allProducts")} className="btn btn-outline btn-primary">
                      <FaShoppingBag className="mr-2" />
                      New Order
                    </button>
                    <button onClick={() => navigate("/dashboard/my-orders")} className="btn btn-outline btn-secondary">
                      <FaHistory className="mr-2" />
                      Order History
                    </button>
                    <button onClick={() => navigate("/dashboard/track-order")} className="btn btn-outline btn-accent">
                      <FaTruck className="mr-2" />
                      Track Shipment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <FaShoppingBag className="text-4xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No orders yet</p>
              <button onClick={() => navigate("/allProducts")} className="btn btn-primary mt-4">
                Place Your First Order
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
