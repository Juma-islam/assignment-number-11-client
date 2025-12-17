
import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAxios from "../../hooks/useAxios";
import { format } from "date-fns";

const OrderDetails = () => {
  const { orderId } = useParams();
  const axiosSecure = useAxios();

  const {
    data: orderDetails,
    isLoading: orderLoading,
    isError: orderError,
  } = useQuery({
    queryKey: ["orders", orderId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${orderId}`);
      return res.data;
    },
  });

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products");
      return res.data;
    },
  });

  if (orderLoading) return <LoadingSpinner />;
  if (orderError || !orderDetails) return <div className="text-center py-20 text-red-600 text-2xl">Error loading order details</div>;

  const {
    firstName,
    lastName,
    quantity,
    contact,
    address,
    notes,
    buyerEmail,
    productTitle,
    orderPrice,
    productPrice,
    paymentMethod,
    paymentStatus,
    status,
    orderDate,
    trackingHistory = [],
  } = orderDetails;

  const buyer = users.find((u) => u.email === buyerEmail);
  const product = products.find((p) => p.title === productTitle || p.productName === productTitle);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "badge-warning";
      case "Approved": return "badge-success";
      case "Rejected": return "badge-error";
      default: return "badge-ghost";
    }
  };

  const getPaymentColor = (status) => {
    return status === "Paid" ? "badge-success" : "badge-warning";
  };

  const timelineSteps = [
    { status: "Order Placed", icon: "🛒" },
    { status: "Payment Completed", icon: "💳" },
    { status: "In Production", icon: "⚙️" },
    { status: "Quality Check Passed", icon: "✅" },
    { status: "Packed", icon: "📦" },
    { status: "Shipped", icon: "🚚" },
    { status: "Delivered", icon: "🏠" },
  ];

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <title>Order #{orderId.slice(-8)} Details</title>

      <div className="max-w-5xl mx-auto space-y-8">

        <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-8 shadow-2xl text-center">
          <h1 className="text-4xl font-bold mb-3">Order Details</h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-lg">
            <p className="font-mono text-xl">Order ID: <span className="font-bold">{orderId.slice(-10)}</span></p>
            <span className={`badge ${getStatusColor(status)} badge-lg font-bold py-4 px-6`}>
              {status.toUpperCase()}
            </span>
            <span className={`badge ${getPaymentColor(paymentStatus)} badge-lg font-bold py-4 px-6`}>
              {paymentStatus.toUpperCase()}
            </span>
          </div>
          <p className="mt-4 opacity-90">Ordered on: {format(new Date(orderDate), "PPP")}</p>
        </div>

        {/* Customer Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-6">👤 Customer Information</h2>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <img
                  src={buyer?.photoURL || "https://via.placeholder.com/150"}
                  alt="Customer"
                  className="w-32 h-32 rounded-full ring-4 ring-primary object-cover"
                />
                <div className="space-y-3 text-left">
                  <p className="text-lg"><strong>Name:</strong> {firstName} {lastName}</p>
                  <p><strong>Email:</strong> {buyerEmail}</p>
                  <p><strong>Phone:</strong> {contact || "Not provided"}</p>
                  <p><strong>Address:</strong> {address}</p>
                  {notes && <p><strong>Notes:</strong> <span className="italic text-gray-600">{notes}</span></p>}
                </div>
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-6">📦 Product Information</h2>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <img
                  src={product?.images?.[0] || "https://via.placeholder.com/150"}
                  alt={productTitle}
                  className="w-32 h-32 rounded-xl object-cover ring-4 ring-secondary"
                />
                <div className="space-y-3 text-left">
                  <p className="text-lg"><strong>Product:</strong> {productTitle}</p>
                  <p><strong>Quantity:</strong> <span className="font-bold text-xl">{quantity}</span></p>
                  <p><strong>Unit Price:</strong> ${productPrice}</p>
                  <p><strong>Total Price:</strong> <span className="text-2xl font-bold text-primary">${orderPrice}</span></p>
                  <p><strong>Payment Method:</strong> {paymentMethod || "Cash on Delivery"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tracking Timeline */}
        <div className="card bg-base-100 shadow-2xl border border-base-300">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-8 text-center">📈 Order Tracking Timeline</h2>

            {trackingHistory.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-500">No tracking updates yet</p>
              </div>
            ) : (
              <div className="timeline timeline-vertical">
                {trackingHistory.map((entry, index) => {
                  const isLast = index === trackingHistory.length - 1;
                  const stepInfo = timelineSteps.find(s => s.status === entry.orderStatus) || { icon: "🔄" };

                  return (
                    <div key={index} className="timeline-item mb-10">
                      <div className="timeline-left">
                        <div className={`timeline-icon w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg
                          ${isLast ? "bg-success text-white" : "bg-primary text-white"}`}>
                          {stepInfo.icon}
                        </div>
                      </div>
                      <hr className="timeline-hr" />
                      <div className="timeline-right">
                        <div className="bg-base-200 p-5 rounded-2xl shadow-md max-w-md">
                          <h3 className="font-bold text-lg">{entry.orderStatus}</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {format(new Date(entry.entryDate), "PPP 'at' p")}
                          </p>
                          {entry.location && <p className="mt-2"><strong>Location:</strong> {entry.location}</p>}
                          {entry.note && <p className="mt-2 italic text-gray-600">{entry.note}</p>}
                        </div>
                      </div>
                      {index < trackingHistory.length - 1 && <hr className="timeline-hr" />}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderDetails;