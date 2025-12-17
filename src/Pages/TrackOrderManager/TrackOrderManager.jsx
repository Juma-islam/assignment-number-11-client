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
  FaBox,
  FaUser,
  FaDollarSign,
  FaPhone,
  FaEnvelope,
  FaInfoCircle,
} from "react-icons/fa";
import useAxios from "../../hooks/useAxios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const TrackOrderManager = () => {
  const { id } = useParams();
  const axiosSecure = useAxios();

  const { data: order, isLoading } = useQuery({
    queryKey: ["orders", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${id}`);
      return res.data;
    },
  });

  // Helper function to format date safely
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
    if (!history || history.length === 0) return "Unknown";
    return history[history.length - 1]?.orderStatus || "Unknown";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <FaExclamationTriangle className="text-4xl text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Order Not Found</h2>
          <p className="text-gray-300">Unable to load order details for ID: {id}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6">
      <title> Track Order</title>

      <div className="max-w-7xl mx-auto">
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Order Tracking</h1>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="text-sm text-gray-300">Order ID:</span>
                <span className="font-mono text-sm bg-base-200 px-3 py-1 rounded-md">{id}</span>
                <span className="text-sm text-gray-300">• Manager View</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div
                className={`px-4 py-2 rounded-lg ${
                  getCurrentStatus() === "Delivered"
                    ? "bg-green-100 text-green-800"
                    : getCurrentStatus() === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-purple-100 text-purple-800"
                }`}
              >
                <span className="font-semibold">{getCurrentStatus()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className="rounded-xl border border-gray-200 p-5">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FaInfoCircle className="text-blue-500" />
                Order Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">Product</label>
                  <p className="font-medium mt-1">{order?.productTitle || "N/A"}</p>
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
                    <label className="text-sm text-gray-500">Price</label>
                    <p className="font-medium mt-1 flex items-center gap-2">
                      <FaDollarSign className="text-gray-400 text-sm" />
                      {order?.orderPrice ? `$${order.orderPrice}` : "N/A"}
                    </p>
                  </div>
                </div>

                {order?.quantity && (
                  <div>
                    <label className="text-sm text-gray-500">Quantity</label>
                    <p className="font-medium mt-1">{order.quantity} units</p>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 p-5">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FaUser className="text-green-500" />
                Customer Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">Customer Name</label>
                  <p className="font-medium mt-1">
                    {order?.firstName} {order?.lastName}
                  </p>
                </div>

                {order?.customerEmail && (
                  <div>
                    <label className="text-sm text-gray-500">Email</label>
                    <p className="font-medium mt-1 flex items-center gap-2">
                      <FaEnvelope className="text-gray-400 text-sm" />
                      {order.customerEmail}
                    </p>
                  </div>
                )}

                {order?.customerPhone && (
                  <div>
                    <label className="text-sm text-gray-500">Phone</label>
                    <p className="font-medium mt-1 flex items-center gap-2">
                      <FaPhone className="text-gray-400 text-sm" />
                      {order.customerPhone}
                    </p>
                  </div>
                )}

                {order?.shippingAddress && (
                  <div>
                    <label className="text-sm text-gray-500">Shipping Address</label>
                    <p className="font-medium mt-1">{order.shippingAddress}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 p-5">
              <h2 className="text-lg font-semibold mb-4">Tracking Summary</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-base-200 rounded-lg">
                  <div className="text-2xl font-bold">{order?.trackingHistory?.length || 0}</div>
                  <div className="text-sm text-gray-300 mt-1">Total Updates</div>
                </div>
                <div className="text-center p-3 bg-base-200 rounded-lg">
                  <div className="text-2xl font-bold ">
                    {order?.trackingHistory?.[0] ? formatDate(order.trackingHistory[0].entryDate).split(" ")[0] : "N/A"}
                  </div>
                  <div className="text-sm text-gray-300 mt-1">First Update</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-xl border border-gray-200 p-5 h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semiboldflex items-center gap-2">
                  <FaTruck className="text-blue-500" />
                  Tracking History
                </h2>
                <span className="text-sm text-gray-500">{order?.trackingHistory?.length || 0} updates</span>
              </div>

              <div className="relative pl-4 md:pl-8">
                <div className="absolute left-0 md:left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                <div className="space-y-6">
                  {order?.trackingHistory?.map((entry, index) => (
                    <div key={index} className="relative">
                      {/* Timeline Dot */}
                      <div
                        className={`absolute left-0 md:left-4 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-white ${
                          entry?.orderStatus === "Delivered"
                            ? "bg-green-500"
                            : entry?.orderStatus === "Shipped"
                            ? "bg-blue-500"
                            : entry?.orderStatus === "Approved" || entry?.orderStatus === "Order Placed"
                            ? "bg-yellow-500"
                            : "bg-purple-500"
                        }`}
                      ></div>

                      <div className="ml-6 md:ml-12">
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:border-gray-300 transition-colors">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                {entry?.orderStatus === "Delivered" && <FaCheckCircle className="text-green-500" />}
                                {entry?.orderStatus === "Shipped" && <FaTruck className="text-blue-500" />}
                                {entry?.orderStatus === "Processing" && <FaBoxOpen className="text-purple-500" />}
                                {entry?.orderStatus === "Pending" && <FaClock className="text-yellow-500" />}
                                <h3 className="font-semibold text-gray-800">
                                  {entry?.orderStatus || "Unknown Status"}
                                </h3>
                              </div>

                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                                {entry?.location && (
                                  <div className="flex items-center gap-1 text-gray-600">
                                    <FaMapMarkerAlt className="text-gray-400" />
                                    <span>{entry.location}</span>
                                  </div>
                                )}
                                <div className="text-gray-500">{formatDate(entry?.entryDate)}</div>
                              </div>

                              {entry?.note && (
                                <div className="mt-3 pt-3 border-t border-gray-100">
                                  <p className="text-gray-600 text-sm leading-relaxed">{entry.note}</p>
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
                              Update #{order.trackingHistory.length - index}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {(!order?.trackingHistory || order.trackingHistory.length === 0) && (
                    <div className="text-center py-8 text-gray-500">
                      <FaBox className="text-3xl mx-auto mb-3 opacity-50" />
                      <p>No tracking history available</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Timeline Legend */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Status Legend</h4>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm text-gray-600">Delivered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm text-gray-600">Shipped</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span className="text-sm text-gray-600">Processing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-sm text-gray-600">Pending</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderManager;
