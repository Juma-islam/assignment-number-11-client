import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaBoxOpen,
  FaMapMarkerAlt,
  FaExclamationTriangle,
  FaCalendarAlt,
  FaShoppingBag,
  FaDollarSign,
  FaPhone,
  FaInfoCircle,
  FaHome,
  FaCreditCard,
  FaShieldAlt,
} from "react-icons/fa";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAxios from "../../hooks/useAxios";

const TrackOrderBuyer = () => {
  const { id } = useParams();
  const axiosSecure = useAxios();

  const { data: order, isLoading } = useQuery({
    queryKey: ["orders", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${id}`);
      return res.data;
    },
  });

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid Date";

      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      console.log(error);
      return "Date Error";
    }
  };

  const getCurrentStatus = () => {
    const history = order?.trackingHistory;
    if (!history || history.length === 0) return "Order Placed";
    return history[history.length - 1]?.orderStatus || "Order Placed";
  };

  const getExpectedDelivery = () => {
    if (!order?.orderDate) return "Calculating...";
    const orderDate = new Date(order.orderDate);
    const expectedDate = new Date(orderDate);
    expectedDate.setDate(expectedDate.getDate() + 5);

    return expectedDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600">Loading your order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 max-w-md">
          <FaExclamationTriangle className="text-4xl text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Order Not Found</h2>
          <p className="text-gray-600">We couldn't find your order. Please check the order ID.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6">
      <title> Track Order</title>

      <div className="max-w-6xl mx-auto">
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Track Your Order</h1>
              <p className=" mt-1">Keep track of your purchase in real-time</p>
            </div>

            <div className="flex flex-col items-end">
              <div
                className={`px-4 py-2 rounded-lg ${
                  getCurrentStatus() === "Delivered"
                    ? "bg-green-100 text-green-800 border border-green-200"
                    : getCurrentStatus() === "Shipped"
                    ? "bg-blue-100 text-blue-800 border border-blue-200"
                    : getCurrentStatus() === "Pending"
                    ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                    : "bg-purple-100 text-purple-800 border border-purple-200"
                }`}
              >
                <span className="font-semibold text-lg">{getCurrentStatus()}</span>
              </div>
              <span className="text-sm text-gray-500 mt-1">Current Status</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className="rounded-xl border border-gray-200 p-5 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FaShoppingBag className="text-blue-500" />
                Order Summary
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">Product</label>
                  <p className="font-medium mt-1 ">{order?.productTitle || "N/A"}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Order Date</label>
                    <p className="font-medium mt-1 flex items-center gap-2">
                      <FaCalendarAlt className="text-gray-400 text-sm" />
                      {formatDate(order?.orderDate)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Total Amount</label>
                    <p className="font-medium mt-1 flex items-center gap-2 text-green-600">
                      <FaDollarSign className="text-green-400 text-sm" />
                      {order?.orderPrice ? `$${parseFloat(order.orderPrice).toFixed(2)}` : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Quantity</label>
                    <p className="font-medium mt-1 ">{order?.quantity || "1"} units</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Unit Price</label>
                    <p className="font-medium mt-1 ">${order?.productPrice || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 p-5 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FaTruck className="text-purple-500" />
                Delivery Information
              </h2>
              {order?.status === "Rejected" ? (
                <p className="text-xl font-bold text-red-500">Order Rejected</p>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Expected Delivery</label>
                    <p className="font-medium mt-1 text-blue-600 flex items-center gap-2">
                      <FaCalendarAlt className="text-blue-400" />
                      {getExpectedDelivery()}
                    </p>
                  </div>

                  {order?.address && (
                    <div>
                      <label className="text-sm text-gray-500">Delivery Address</label>
                      <p className="font-medium mt-1 flex items-start gap-2">
                        <FaHome className="text-gray-400 mt-1" />
                        <span>{order.address}</span>
                      </p>
                    </div>
                  )}

                  {order?.contact && (
                    <div>
                      <label className="text-sm text-gray-500">Contact Number</label>
                      <p className="font-medium mt-1 flex items-center gap-2">
                        <FaPhone className="text-gray-400" />
                        {order.contact}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="rounded-xl border border-gray-200 p-5 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FaShieldAlt className="text-green-500" />
                Payment & Security
              </h2>
              {order?.status === "Rejected" ? (
                <p className="text-xl font-bold text-red-500">Order Rejected</p>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Payment Method</label>
                    <p className="font-medium mt-1 flex items-center gap-2">
                      <FaCreditCard className="text-gray-400" />
                      {order?.paymentMethod || "N/A"}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-500">Payment Status</label>{" "}
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-1 ${
                        order?.paymentStatus === "Paid"
                          ? "bg-green-100 text-green-800"
                          : order?.paymentStatus === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {order?.paymentStatus || "Pending"}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      <FaInfoCircle className="inline mr-1" />
                      Your payment is secure and encrypted.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-xl border border-gray-200 p-5 shadow-sm h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <FaTruck className="text-blue-500" />
                  Order Journey
                </h2>
                <span className="text-sm text-gray-500 bg-base-200 px-3 py-1 rounded-full">
                  {order?.trackingHistory?.length || 1} updates
                </span>
              </div>

              <div className="relative pl-4 md:pl-8">
                <div className="absolute left-0 md:left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 to-green-200"></div>

                <div className="space-y-8">
                  {(!order?.trackingHistory || order.trackingHistory.length === 0) && (
                    <div className="relative">
                      <div className="absolute left-0 md:left-4 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-white bg-blue-500 animate-pulse"></div>

                      <div className="ml-6 md:ml-12">
                        <div className="bg-blue-50 rounded-lg p-5 border border-blue-100">
                          <div className="flex items-center gap-3 mb-3">
                            <FaClock className="text-2xl text-blue-500" />
                            <div>
                              <h3 className="font-semibold text-lg">Order Placed</h3>
                              <p className="text-gray-600 text-sm">Your order has been received</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500 flex items-center gap-2">
                              <FaCalendarAlt className="text-gray-400" />
                              {formatDate(order?.orderDate)}
                            </div>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                              Just Now
                            </span>
                          </div>
                          <p className="mt-3 text-sm text-gray-600">
                            We're preparing your order for shipment. You'll receive updates here.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {order?.trackingHistory?.map((entry, index) => (
                    <div key={index} className="relative">
                      <div
                        className={`absolute left-0 md:left-4 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-white ${
                          entry?.orderStatus === "Delivered"
                            ? "bg-green-500 animate-bounce"
                            : entry?.orderStatus === "Shipped"
                            ? "bg-blue-500"
                            : entry?.orderStatus === "Approved" || entry?.orderStatus === "Order Placed"
                            ? "bg-yellow-500"
                            : entry?.orderStatus === "Delivered"
                            ? "bg-green-500"
                            : "bg-purple-500"
                        }`}
                      ></div>

                      <div className="ml-6 md:ml-12">
                        <div
                          className={`rounded-lg p-5 border ${
                            index === order.trackingHistory.length - 1
                              ? "bg-gradient-to-r from-gray-50 to-white border-gray-200 shadow-sm"
                              : "bg-gray-50 border-gray-100"
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-3">
                                {entry?.orderStatus === "Delivered" && (
                                  <FaCheckCircle className="text-2xl text-green-500" />
                                )}
                                {entry?.orderStatus === "Shipped" && <FaTruck className="text-2xl text-blue-500" />}
                                {entry?.orderStatus === "Processing" && (
                                  <FaBoxOpen className="text-2xl text-purple-500" />
                                )}
                                {entry?.orderStatus === "Pending" && <FaClock className="text-2xl text-yellow-500" />}
                                <div>
                                  <h3 className="font-semibold text-gray-800 text-lg">
                                    {entry?.orderStatus || "Order Update"}
                                  </h3>
                                  {index === order.trackingHistory.length - 1 && (
                                    <p className="text-sm text-gray-600 mt-1">Latest update</p>
                                  )}
                                </div>
                              </div>

                              <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm mb-3">
                                {entry?.location && (
                                  <div className="flex items-center gap-2 text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                                    <FaMapMarkerAlt className="text-gray-400" />
                                    <span>{entry.location}</span>
                                  </div>
                                )}
                                <div className="text-gray-500 flex items-center gap-2">
                                  <FaCalendarAlt className="text-gray-400" />
                                  {formatDate(entry?.entryDate)}
                                </div>
                              </div>

                              {entry?.note && (
                                <div className="mt-4 p-3 bg-white rounded-lg border border-gray-100">
                                  <p className="text-gray-700 text-sm leading-relaxed">
                                    <span className="font-medium">Note: </span>
                                    {entry.note}
                                  </p>
                                </div>
                              )}
                            </div>

                            <div
                              className={`self-start px-3 py-1 rounded-full text-xs font-medium ${
                                entry?.orderStatus === "Delivered"
                                  ? "bg-green-100 text-green-800"
                                  : entry?.orderStatus === "Shipped"
                                  ? "bg-blue-100 text-blue-800"
                                  : entry?.orderStatus === "Processing"
                                  ? "bg-purple-100 text-purple-800"
                                  : entry?.orderStatus === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              Step {index + 1}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Help Section */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-medium  mb-1">Need Help?</h4>
                    <p className="text-xs ">Questions about your order?</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-secondary text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">
                      Contact Support
                    </button>
                    <button className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                      View Invoice
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Info Section */}
        <div className="mt-6 rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                <FaBoxOpen className="text-blue-500 text-xl" />
              </div>
              <h4 className="font-medium ">Package Protection</h4>
              <p className="text-sm text-gray-600 mt-1">All packages are insured against damage</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                <FaShieldAlt className="text-green-500 text-xl" />
              </div>
              <h4 className="font-medium ">Secure Delivery</h4>
              <p className="text-sm text-gray-600 mt-1">Signature required for all deliveries</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-3">
                <FaClock className="text-purple-500 text-xl" />
              </div>
              <h4 className="font-medium ">24/7 Tracking</h4>
              <p className="text-sm text-gray-600 mt-1">Track your order anytime, anywhere</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderBuyer;
