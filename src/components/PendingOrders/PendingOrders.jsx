


// {`order-details/${order._id}`}
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";
import useRoles from "../../hooks/useRoles";
import useAuth from "../../hooks/useAuth";
import ManagerApprovalPending from "../ManagerApprovalPending/ManagerApprovalPending";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { FaCheck, FaTimes, FaEye } from "react-icons/fa";

const PendingOrders = () => {
  const axiosSecure = useAxios();
  const users = useRoles();
  const { user } = useAuth();

  const isSuspended = users?.status === "suspended";

  const {
    data: myPendingorders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?sellerEmail=${user?.email}`);
      return res.data;
    },
  });

  const pendingOrders = myPendingorders.filter((order) => order?.status === "Pending");

  const handleApproveOrder = async (order) => {
    if (isSuspended) {
      toast.warning("Suspended account cannot approve orders!");
      return;
    }

    try {
      const res = await axiosSecure.patch(`/orders/${order._id}`, {
        status: "Approved",
        approvedAt: new Date(),
      });

      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success(`Order ${order._id.slice(-6)} approved successfully!`);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Approval failed!");
    }
  };

  const handleRejectOrder = async (id) => {
    if (isSuspended) {
      toast.warning("Suspended account cannot reject orders!");
      return;
    }

    try {
      const res = await axiosSecure.patch(`/orders/${id}`, {
        status: "Rejected",
        rejectedAt: new Date(),
      });

      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success("Order rejected.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Rejection failed!");
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (users?.role === "manager" && users?.status === "pending")
    return <ManagerApprovalPending />;

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <title>Pending Orders - Manager Dashboard</title>

      <h1 className="text-3xl font-bold mb-8 text-center md:text-left">Pending Orders</h1>

      {/* Suspension Notice */}
      {isSuspended && (
        <div className="alert alert-warning shadow-lg mb-8 rounded-xl">
          <div className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-8 w-8" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h3 className="font-bold">Account Suspended!</h3>
              <p>You cannot approve or reject any orders until your account is restored.</p>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Cards */}
      <div className="grid grid-cols-1 md:hidden gap-6">
        {pendingOrders.length === 0 ? (
          <div className="text-center py-16 bg-base-200 rounded-xl">
            <p className="text-xl text-gray-500">No pending orders at the moment</p>
          </div>
        ) : (
          pendingOrders.map((order) => (
            <div key={order._id} className="card bg-base-100 shadow-xl border border-base-300">
              <div className="card-body p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{order.productTitle}</h3>
                    <p className="text-sm text-gray-500">Order ID: {order._id.slice(-8)}</p>
                  </div>
                  <span className="badge badge-warning badge-lg">Pending</span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-5">
                  <div>
                    <p className="text-gray-500">Customer</p>
                    <p className="font-medium">{order.firstName} {order.lastName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Quantity</p>
                    <p className="font-bold">{order.quantity}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500">Order Date</p>
                    <p className="font-medium">
                      {new Date(order.orderDate || order.createdAt).toLocaleDateString()} at{" "}
                      {new Date(order.orderDate || order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>

                <div className="card-actions grid grid-cols-3 gap-3">
                  <button
                    onClick={() => handleApproveOrder(order)}
                    disabled={isSuspended}
                    className={`btn btn-success flex items-center justify-center gap-2 ${isSuspended ? 'btn-disabled' : ''}`}
                  >
                    <FaCheck /> Approve
                  </button>
                  <button
                    onClick={() => handleRejectOrder(order._id)}
                    disabled={isSuspended}
                    className={`btn btn-error flex items-center justify-center gap-2 ${isSuspended ? 'btn-disabled' : ''}`}
                  >
                    <FaTimes /> Reject
                  </button>
                  <Link to={`/dashboard/order-details/${order._id}`} className="flex-1">
                    <button className="btn btn-primary w-full flex items-center justify-center gap-2">
                      <FaEye /> View
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop Table - Beautiful */}
      <div className="hidden md:block overflow-x-auto">
        <div className="bg-base-100 shadow-2xl rounded-2xl overflow-hidden">
          <table className="table table-zebra w-full">
            <thead className="bg-gradient-to-r from-orange-500 to-amber-500 text-white">
              <tr>
                <th className="py-5 text-left">Order ID</th>
                <th className="py-5 text-left">Customer</th>
                <th className="py-5 text-left">Product</th>
                <th className="py-5 text-center">Quantity</th>
                <th className="py-5 text-center">Order Date</th>
                <th className="py-5 text-center">Status</th>
                <th className="py-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-16 text-gray-500 text-xl">
                    No pending orders found
                  </td>
                </tr>
              ) : (
                pendingOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-base-200 transition-colors">
                    <td className="py-5 font-mono text-sm">{order._id.slice(-10)}</td>
                    <td className="py-5 font-medium">{order.firstName} {order.lastName}</td>
                    <td className="py-5 font-semibold text-primary">{order.productTitle}</td>
                    <td className="py-5 text-center font-bold text-lg">{order.quantity}</td>
                    <td className="py-5 text-center text-sm">
                      {new Date(order.orderDate || order.createdAt).toLocaleDateString('en-GB')} <br />
                      <span className="text-gray-500">
                        {new Date(order.orderDate || order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </td>
                    <td className="py-5 text-center">
                      <span className="badge badge-warning badge-lg font-medium">Pending</span>
                    </td>
                    <td className="py-5 text-center">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => handleApproveOrder(order)}
                          disabled={isSuspended}
                          className={`btn btn-sm btn-success ${isSuspended ? 'btn-disabled' : ''}`}
                          title={isSuspended ? "Account suspended" : "Approve order"}
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={() => handleRejectOrder(order._id)}
                          disabled={isSuspended}
                          className={`btn btn-sm btn-error ${isSuspended ? 'btn-disabled' : ''}`}
                          title={isSuspended ? "Account suspended" : "Reject order"}
                        >
                          <FaTimes />
                        </button>
                        <Link to={`order-details/${order._id}`}>
                          <button className="btn btn-sm btn-primary">
                            <FaEye />
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
    </div>
  );
};

export default PendingOrders;