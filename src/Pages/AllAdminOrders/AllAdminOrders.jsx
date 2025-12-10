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

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle status filter change
  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  // Filter orders based on search and status
  const filteredOrders = orders.filter((order) => {
    const searchMatch =
      order.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.productTitle.toLowerCase().includes(searchTerm.toLowerCase());

    const statusMatch = statusFilter === "All" || order.status === statusFilter;

    return searchMatch && statusMatch;
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">All Orders</h1>

      {/* Search and Status Filter */}
      <div className="flex justify-between items-center mb-6">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by Customer Name or Product"
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded-lg w-1/3"
        />

        {/* Status Filter */}
        <select value={statusFilter} onChange={handleStatusChange} className="p-2 border border-gray-300 rounded-lg">
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-10 bg-white shadow rounded-lg">
            <p className="text-gray-500">No orders found</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order._id} className="bg-white shadow rounded-lg p-4 border border-gray-100">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-800">{order.productTitle}</h3>
                  <p className="text-xs text-gray-500 mt-1">Order ID: {order._id}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Customer: {order.firstName} {order.lastName}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${
                    order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <p className="text-gray-500 text-xs">Quantity</p>
                  <p className="font-medium">{order.quantity}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Payment Method</p>
                  <p className="font-medium">{order.paymentMethod}</p>
                </div>
              </div>

              <div>
                <Link to={`order-details/${order._id}`}>
                  <button className="btn btn-primary hover:bg-primary/90 text-white rounded text-sm font-medium transition-colors w-full">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left font-semibold">Order ID</th>
              <th className="p-3 text-left font-semibold">Customer</th>
              <th className="p-3 text-left font-semibold">Product</th>
              <th className="p-3 text-left font-semibold">Quantity</th>
              <th className="p-3 text-left font-semibold">Status</th>
              <th className="p-3 text-left font-semibold">Payment</th>
              <th className="p-3 text-center font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-8 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-mono text-gray-600">{order._id}</td>
                  <td className="p-3">
                    {order.firstName} {order.lastName}
                  </td>
                  <td className="p-3 font-medium">{order.productTitle}</td>
                  <td className="p-3">{order.quantity}</td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="p-3">{order.paymentMethod}</td>

                  <td className="p-3">
                    <div>
                      <Link to={`order-details/${order._id}`}>
                        <button className="btn btn-primary hover:bg-primary/90 text-white rounded text-sm font-medium transition-colors">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAllOrders;
