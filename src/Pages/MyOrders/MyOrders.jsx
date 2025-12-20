import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router"; 
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import useRoles from "../../hooks/useRoles";
import BuyerApprovalPending from "../../components/Shared/BuyerApprovalPending/BuyerApprovalPending";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const navigate = useNavigate();
  const users = useRoles();

  const {
    data: myOrders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?email=${user?.email}`);
      return res.data;
    },
  });

  const handleOrderDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Cancel Order",
      cancelButtonText: "No, Keep It",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/orders/${id}/my-order`);
          if (res.data.success) {
            Swal.fire("Cancelled!", "Your order has been cancelled.", "success");
            refetch();
          } else {
            toast.error(res.data.message || "Failed to cancel order");
          }
        } catch (err) {
          console.log(err)
          toast.error("Something went wrong!");
        }
      }
    });
  };


  if (users?.role === "buyer" && users?.status === "pending") {
    return <BuyerApprovalPending />;
  }

  if (isLoading) return <LoadingSpinner />;

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return "badge badge-warning badge-outline";
      case "Approved":
        return "badge badge-success badge-outline";
      case "Rejected":
        return "badge badge-error badge-outline";
      case "Delivered":
        return "badge badge-success";
      default:
        return "badge badge-ghost";
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
    
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-4xl font-bold text-primary mb-2">My Orders</h1>
          <p className="text-base-content/70">Track and manage all your garment orders in one place</p>
        </div>

        <div className="block md:hidden space-y-6">
          {myOrders.length === 0 ? (
            <div className="card bg-base-100 shadow-xl border border-base-300">
              <div className="card-body text-center py-16">
                <div className="mx-auto w-24 h-24 mb-4 opacity-50">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2a2 2 0 00-2 2v3a2 2 0 002 2h2m-8-10h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-base-content/70">No orders yet</h3>
                <p className="text-base-content/60 mt-2">Start shopping and your orders will appear here</p>
              </div>
            </div>
          ) : (
            myOrders.map((order) => (
              <div key={order._id} className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-shadow">
                <div className="card-body p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-primary">{order.productTitle}</h3>
                      <p className="text-sm text-base-content/60 mt-1">Order ID: <span className="font-mono">{order._id.slice(-8)}</span></p>
                    </div>
                    <div className={getStatusBadge(order.status)}>
                      {order.status}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                    <div className="bg-base-200 rounded-lg p-3">
                      <p className="text-base-content/60">Quantity</p>
                      <p className="font-bold text-lg">{order.quantity}</p>
                    </div>
                    <div className="bg-base-200 rounded-lg p-3">
                      <p className="text-base-content/60">Payment</p>
                      <p className="font-bold">{order.paymentMethod || "N/A"}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => navigate(`/dashboard/order-details/${order._id}`)}
                      className="btn btn-primary flex-1"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleOrderDelete(order._id)}
                      disabled={order.status !== "Pending"}
                      className={`btn flex-1 ${order.status === "Pending" ? "btn-error" : "btn-disabled"}`}
                    >
                      {order.status === "Pending" ? "Cancel Order" : "Cannot Cancel"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="hidden md:block">
          <div className="card bg-base-100 shadow-2xl border border-base-300 overflow-hidden">
            <div className="card-body p-0">
              {myOrders.length === 0 ? (
                <div className="text-center py-20">
                  <div className="mx-auto w-32 h-32 mb-6 opacity-50">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-base-content/70">No Orders Found</h3>
                  <p className="text-base-content/60 mt-3">When you place orders, they will appear here</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="table table-zebra w-full">
                    <thead className="bg-primary text-white text-sm">
                      <tr>
                        <th className="py-4">Order ID</th>
                        <th className="py-4">Product</th>
                        <th className="py-4 text-center">Quantity</th>
                        <th className="py-4 text-center">Status</th>
                        <th className="py-4">Payment Method</th>
                        <th className="py-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myOrders.map((order) => (
                        <tr key={order._id} className="hover:bg-base-200 transition-colors">
                          <td className="py-5 font-mono text-sm">{order._id.slice(-10)}</td>
                          <td className="py-5 font-semibold text-primary">{order.productTitle}</td>
                          <td className="py-5 text-center font-bold text-lg">{order.quantity}</td>
                          <td className="py-5 text-center">
                            <div className={getStatusBadge(order.status)}>
                              {order.status}
                            </div>
                          </td>
                          <td className="py-5">{order.paymentMethod || "N/A"}</td>
                          <td className="py-5">
                            <div className="flex justify-center gap-3">
                              <button
                                onClick={() => navigate(`order-details/${order._id}`)}
                                className="btn btn-primary btn-sm"
                              >
                                View Details
                              </button>
                              <button
                                onClick={() => handleOrderDelete(order._id)}
                                disabled={order.status !== "Pending"}
                                className={`btn btn-sm ${order.status === "Pending" ? "btn-error" : "btn-disabled"}`}
                              >
                                Cancel
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
