import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAxios from "../../hooks/useAxios";

const OrderDetails = () => {
  const { orderId } = useParams();
  const axiosSecure = useAxios();

  const {
    data: orderDetails,
    isLoading,
    isError,
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

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Error loading order details</div>;

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
    trackingHistory,
  } = orderDetails;

  const buyer = users.find((user) => user.email === buyerEmail);

  const product = products.find((prod) => prod.productName === productTitle);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-4">Order Details</h1>

      {/* Customer Information */}
      <div className="bg-white p-6 shadow rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Customer Information</h2>
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-4">
          <div className="flex justify-center mb-4 md:mb-0">
            {buyer && buyer.photoURL ? (
              <img
                src={buyer?.photoURL}
                alt={`${firstName} ${lastName}`}
                className="w-48 h-48 object-cover rounded-lg md:w-64 md:h-64 lg:w-72 lg:h-72"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-300 rounded-full"></div> // Placeholder if no image
            )}
          </div>
          <div className="space-y-4 md:ml-6 md:w-2/3">
            <p>
              <strong>Customer:</strong> {firstName} {lastName}
            </p>
            <p>
              <strong>Email:</strong> {buyerEmail}
            </p>
            <p>
              <strong>Contact:</strong> {contact}
            </p>
            <p>
              <strong>Shipping Address:</strong> {address}
            </p>
            <p>
              <strong>Notes:</strong> {notes || "No notes provided"}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 shadow rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Order Information</h2>
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-4">
          {product && product.images && product.images.length > 0 ? (
            <img
              src={product.images[0]}
              alt={productTitle}
              className="w-48 h-48 object-cover rounded-lg md:w-64 md:h-64 lg:w-72 lg:h-72"
            />
          ) : (
            <div className="w-48 h-48 bg-gray-300 mb-4 md:w-64 md:h-64 lg:w-72 lg:h-72"></div>
          )}
          <div className="space-y-4 mt-3 md:mt-0 md:ml-6 md:w-2/3">
            <p>
              <strong>Product:</strong> {productTitle}
            </p>
            <p>
              <strong>Quantity:</strong> {quantity}
            </p>
            <p>
              <strong>Product Price:</strong> ${productPrice}
            </p>
            <p>
              <strong>Total Order Price:</strong> ${orderPrice}
            </p>
            <p>
              <strong>Status:</strong>
              <span
                className={`px-2 py-1 text-sm font-semibold rounded ${
                  status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : status === "Approved"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {status}
              </span>
            </p>
            <p>
              <strong>Payment Method:</strong> {paymentMethod}
            </p>
            <p>
              <strong>Payment Status:</strong>
              <span
                className={`px-2 py-1 text-sm font-semibold rounded ${
                  paymentStatus === "Pending" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"
                }`}
              >
                {paymentStatus}
              </span>
            </p>
            <p>
              <strong>Order Date:</strong> {new Date(orderDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 shadow rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Tracking History</h2>

        {trackingHistory.length === 0 ? (
          <p>No tracking history available</p>
        ) : (
          <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
            {trackingHistory.map((entry, index) => (
              <li key={index}>
                <hr />
                <div className="timeline-middle">
                  <div
                    className={`w-4 h-4 rounded-full border-2 ${
                      index === trackingHistory.length - 1
                        ? "bg-green-500 border-green-700"
                        : "bg-yellow-500 border-yellow-700"
                    }`}
                  ></div>
                </div>

                <div className="timeline-end mb-4">
                  <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-gray-700">{entry.orderStatus}</p>
                    <p className="text-xs text-gray-500">{new Date(entry.entryDate).toLocaleString()}</p>
                  </div>
                </div>
                <hr />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
