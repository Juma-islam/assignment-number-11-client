import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxios from "../../hooks/useAxios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const AdminAllOrders = () => {
  const axiosSecure = useAxios();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orders");
      return res.data;
    },
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredOrders = orders.filter((order) => {
    const searchMatch =
      (order.firstName + " " + order.lastName)
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      order.productTitle.toLowerCase().includes(searchTerm.toLowerCase());

    const statusMatch = statusFilter === "All" || order.status === statusFilter;

    return searchMatch && statusMatch;
  });

  // Stats calculation
  const totalOrders = orders.length;
  const pendingCount = orders.filter(o => o.status === "Pending").length;
  const approvedCount = orders.filter(o => o.status === "Approved").length;
  const deliveredCount = orders.filter(o => o.status === "Delivered").length;

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending": return "badge-warning";
      case "Approved": return "badge-info";
      case "Delivered": return "badge-success";
      case "Rejected": return "badge-error";
      default: return "badge-ghost";
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-base-content">All Orders</h1>
          <p className="text-base-content/70 mt-2">Manage and track all customer orders</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="stat bg-base-100 rounded-2xl shadow-md">
            <div className="stat-title">Total Orders</div>
            <div className="stat-value text-primary">{totalOrders}</div>
          </div>
          <div className="stat bg-base-100 rounded-2xl shadow-md">
            <div className="stat-title">Pending</div>
            <div className="stat-value text-warning">{pendingCount}</div>
          </div>
          <div className="stat bg-base-100 rounded-2xl shadow-md">
            <div className="stat-title">Approved</div>
            <div className="stat-value text-info">{approvedCount}</div>
          </div>
          <div className="stat bg-base-100 rounded-2xl shadow-md">
            <div className="stat-title">Delivered</div>
            <div className="stat-value text-success">{deliveredCount}</div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search by customer name or product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered input-lg flex-1"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="select select-bordered select-lg w-full max-w-xs"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="card bg-base-100 shadow-xl rounded-2xl">
              <div className="card-body text-center py-16">
                <div className="text-6xl text-base-content/20 mb-4">📦</div>
                <h3 className="text-xl font-semibold text-base-content/60">No orders found</h3>
                <p className="text-base-content/50 mt-2">Try adjusting your search or filter</p>
              </div>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order._id}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow rounded-2xl"
              >
                <div className="card-body p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{order.productTitle}</h3>
                      <p className="text-sm text-base-content/60 mt-1">
                        Order ID: #{order._id.slice(-8)}
                      </p>
                      <p className="text-sm text-base-content/70 mt-1">
                        Customer: {order.firstName} {order.lastName}
                      </p>
                    </div>
                    <div className={`badge badge-lg ${getStatusBadge(order.status)}`}>
                      {order.status}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-base-content/60">Quantity</p>
                      <p className="font-bold text-lg">{order.quantity}</p>
                    </div>
                    <div>
                      <p className="text-base-content/60">Payment Method</p>
                      <p className="font-medium">{order.paymentMethod || "N/A"}</p>
                    </div>
                  </div>

                  <div className="card-actions mt-6">
                    <Link to={`order-details/${order._id}`}>
                      <button className="btn btn-primary w-full">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block">
          <div className="card bg-base-100 shadow-xl rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr className="bg-base-200">
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Status</th>
                    <th>Payment Method</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-16">
                        <div className="text-6xl text-base-content/20 mb-4">📦</div>
                        <p className="text-xl text-base-content/60">No orders found</p>
                        <p className="text-base-content/50">Try adjusting your search or filter</p>
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr key={order._id} className="hover:bg-base-200 transition-colors">
                        <td className="font-mono">#{order._id.slice(-8)}</td>
                        <td className="font-medium">
                          {order.firstName} {order.lastName}
                        </td>
                        <td className="font-semibold">{order.productTitle}</td>
                        <td className="text-center font-bold">{order.quantity}</td>
                        <td>
                          <div className={`badge badge-lg ${getStatusBadge(order.status)}`}>
                            {order.status}
                          </div>
                        </td>
                        <td>{order.paymentMethod || "N/A"}</td>
                        <td className="text-center">
                          <Link to={`order-details/${order._id}`}>
                            <button className="btn btn-primary btn-sm">
                              View Details
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAllOrders;