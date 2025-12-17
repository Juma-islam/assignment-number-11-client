import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  Truck,
  Package,
  CheckCircle,
  Clock,
  XCircle,
  ChevronRight,
  Search,
  Filter,
  Calendar,
  MapPin,
  Mail,
  DollarSign,
  ShoppingBag,
  User,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useRoles from "../../hooks/useRoles";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import BuyerApprovalPending from "../../components/Shared/BuyerApprovalPending/BuyerApprovalPending";

const TrackOrder = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const users = useRoles();
  const { user } = useAuth();
  const axiosSecure = useAxios();

  const { data: orders = [] } = useQuery({
    queryKey: ["orders", user],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?email=${user?.email}`);
      return res.data;
    },
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="w-5 h-5 text-success" />;
      case "Approved":
        return <Truck className="w-5 h-5 text-warning" />;
      case "Rejected":
        return <XCircle className="w-5 h-5 text-error" />;
      case "Pending":
        return <Clock className="w-5 h-5 text-warning animate-pulse" />;
      default:
        return <Package className="w-5 h-5 text-info" />;
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Delivered":
        return "badge-success";
      case "Approved":
        return "badge-warning";
      case "Pending":
        return "badge-warning";
      case "Rejected":
        return "badge-error";
      default:
        return "badge-info";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatPrice = (price) => {
    if (!price) price = 0;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const handleOrderClick = (orderId) => {
    navigate(`${orderId}`);
  };

  // ✅ Safe filtering
  const filteredOrders = orders.filter((order) => {
    const productTitle = order?.productTitle || "";
    const orderId = order?._id || "";
    const customerName = `${order?.firstName || ""} ${order?.lastName || ""}`;
    const matchesSearch =
      productTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customerName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || order?.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (users?.role === "buyer" && users?.status === "pending") return <BuyerApprovalPending />;

  return (
    <div className="min-h-screen p-4 md:p-6">
      <title>Track Order</title>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Order Tracking</h1>
          <p className="text-gray-600 mt-2">Track and manage all your orders</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Total Orders</p>
                <p className="text-2xl font-bold">{orders.length}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <ShoppingBag className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-sm">
            <div className="card-body p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-2xl font-bold">{orders.filter((o) => o.status === "Pending").length}</p>
              </div>
              <div className="p-3 bg-warning/10 rounded-lg">
                <Clock className="w-6 h-6 text-warning" />
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-sm">
            <div className="card-body p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Delivered</p>
                <p className="text-2xl font-bold">{orders.filter((o) => o.status === "Delivered").length}</p>
              </div>
              <div className="p-3 bg-success/10 rounded-lg">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-sm">
            <div className="card-body p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Total Value</p>
                <p className="text-2xl font-bold">
                  {formatPrice(orders.reduce((sum, order) => sum + (order.orderPrice || 0), 0))}
                </p>
              </div>
              <div className="p-3 bg-info/10 rounded-lg">
                <DollarSign className="w-6 h-6 text-info" />
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="card bg-base-100 shadow-md mb-6">
          <div className="card-body p-4 md:p-6 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by order ID, product, or customer name..."
                className="input input-bordered w-full pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-outline flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter by Status
              </div>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-10">
                {["all", "Pending", "Approved", "Delivered", "Rejected"].map((status) => (
                  <li key={status}>
                    <button onClick={() => setStatusFilter(status === "all" ? "all" : status)}>
                      {status === "all" ? "All Orders" : status}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="hidden lg:block card bg-base-100 shadow-md">
          <div className="card-body p-0 overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="bg-base-200">
                  <th>Order Details</th>
                  <th>Customer</th>
                  <th>Value</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-base-200 cursor-pointer transition-colors"
                    onClick={() => handleOrderClick(order._id)}
                  >
                    <td>
                      <div className="font-semibold text-primary">{order.productTitle || "N/A"}</div>
                      <div className="text-sm text-gray-500">Order: {order._id}</div>
                      <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(order.orderDate)}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                        <ShoppingBag className="w-3 h-3" />
                        Qty: {order.quantity || 0}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span className="font-medium">
                          {order.firstName || ""} {order.lastName || ""}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                        <Mail className="w-3 h-3" />
                        {order.buyerEmail || ""}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate max-w-[200px]">{order.address || ""}</span>
                      </div>
                    </td>
                    <td>
                      <div className="font-bold text-lg">{formatPrice(order.orderPrice)}</div>
                      <div className="text-sm text-gray-500">Unit: ${order.productPrice || 0}</div>
                      <div className="text-sm text-gray-500">{order.paymentMethod || ""}</div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        <span className={`badge ${getStatusBadgeClass(order.status)} gap-1`}>{order.status}</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Updated: {order.updatedAt ? formatDate(order.updatedAt) : "Pending Approval"}
                      </div>
                      <div className="text-sm mt-1">Tracking: {order.trackingHistory?.length || 0} updates</div>
                    </td>
                    <td>
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOrderClick(order._id);
                        }}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:hidden space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleOrderClick(order._id)}
            >
              <div className="card-body p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg">{order.productTitle || "N/A"}</h3>
                    <p className="text-sm text-gray-500">Order: {order._id}</p>
                  </div>
                  <span className={`badge ${getStatusBadgeClass(order.status)} gap-1`}>
                    {getStatusIcon(order.status)}
                    {order.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">
                    {order.firstName || ""} {order.lastName || ""}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 truncate">{order.address || ""}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Quantity</p>
                    <p className="font-semibold">{order.quantity || 0}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Order Date</p>
                    <p className="font-semibold">{formatDate(order.orderDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Value</p>
                    <p className="font-semibold">{formatPrice(order.orderPrice)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Payment</p>
                    <p className="font-semibold">{order.paymentMethod || ""}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Truck className="w-4 h-4" />
                    <span>{order.trackingHistory?.length || 0} tracking updates</span>
                  </div>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOrderClick(order._id);
                    }}
                  >
                    View Details
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="card bg-base-100 shadow-md">
            <div className="card-body text-center py-8">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No orders found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "No orders available at the moment"}
              </p>
              {searchTerm && (
                <button className="btn btn-outline" onClick={() => setSearchTerm("")}>
                  Clear Search
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
