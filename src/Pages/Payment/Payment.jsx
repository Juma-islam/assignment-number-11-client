// import React from "react";
// import { useParams, useNavigate } from "react-router";
// import { useQuery } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import useAxios from "../../hooks/useAxios";
// import LoadingSpinner from "../../components/Shared/LoadingSpinner";

// const Payment = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const axiosSecure = useAxios();
//   const pendingOrder = JSON.parse(sessionStorage.getItem("pendingOrder"));

//   const { data: product, isLoading } = useQuery({
//     queryKey: ["products", id],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/products/${id}`);
//       return res.data;
//     },
//   });

//   const { productPrice, productId, buyerEmail, quantity, productTitle } = pendingOrder || {};

//   const handlePayment = async () => {
//     const orderId = new URLSearchParams(location.search).get("orderId");
//     const paymentInfo = {
//       productPrice,
//       productId,
//       buyerEmail,
//       quantity,
//       productTitle,
//       orderId,
//     };

//     Swal.fire({
//       title: "Make Payment?",
//       text: "Are you sure you want make this payment?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes!",
//       cancelButtonText: "No, go back",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
//         window.location.assign(res.data.url);
//       }
//     });
//   };

//   const handleCancel = () => {
//     const orderId = new URLSearchParams(location.search).get("orderId");

//     Swal.fire({
//       title: "Cancel Payment?",
//       text: "Are you sure you want to cancel this payment?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, cancel it",
//       cancelButtonText: "No, go back",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         if (orderId) {
//           await axiosSecure.delete(`/orders/${orderId}`);
//         }

//         Swal.fire({
//           icon: "success",
//           title: "Payment Cancelled",
//           showConfirmButton: false,
//           timer: 1200,
//         });

//         navigate(-1);
//       }
//     });
//   };

//   if (isLoading) return <LoadingSpinner />;

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
//       <title> Payment</title>

//       <div className="bg-white shadow-xl rounded-2xl w-full max-w-xl p-8 border border-gray-200">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Complete Your Payment</h2>

//         <div className="space-y-3 border-b pb-4 mb-6">
//           <h3 className="text-xl font-semibold text-gray-700">{product?.productName}</h3>

//           <p className="text-gray-500">{productTitle}</p>

//           <div className="flex justify-between mt-4 text-gray-700">
//             <span className="font-medium">Quantity:</span>
//             <span>{quantity}</span>
//           </div>

//           <div className="flex justify-between text-gray-700">
//             <span className="font-medium">Price:</span>
//             <span className="font-semibold text-green-600 text-lg">${productPrice}</span>
//           </div>
//         </div>

//         <div className="text-sm text-gray-600 mb-6">
//           <p>
//             <span className="font-medium">Buyer Email:</span> {buyerEmail}
//           </p>
//         </div>

//         <div className="flex gap-4">
//           <button
//             onClick={handleCancel}
//             className="w-1/2 btn bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={handlePayment}
//             className="w-1/2 btn btn-primary hover:bg-primary/90 text-white rounded-lg text-lg font-semibold transition"
//           >
//             Pay Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Payment;



import React from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { toast } from "react-toastify";

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxios();
  const pendingOrder = JSON.parse(sessionStorage.getItem("pendingOrder"));

  const { data: product, isLoading } = useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
  });

  const { productPrice, productId, buyerEmail, quantity, productTitle } = pendingOrder || {};

  if (!productId || !productPrice || !buyerEmail || !quantity) {
    return (
      <div className="text-center text-red-500 mt-20">
        Invalid payment data. Please go back and select a product.
      </div>
    );
  }

  const handlePayment = async () => {
    const orderId = new URLSearchParams(location.search).get("orderId");
    const paymentInfo = {
      productPrice,
      productId,
      buyerEmail,
      quantity,
      productTitle,
      orderId,
    };

    try {
      const result = await Swal.fire({
        title: "Make Payment?",
        text: "Are you sure you want to make this payment?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
        cancelButtonText: "No, go back",
      });

      if (result.isConfirmed) {
        const res = await axiosSecure.post("/create-checkout-session", paymentInfo);

        if (res.data.url) {
          window.location.assign(res.data.url);
        } else {
          toast.error("Stripe session creation failed!");
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Payment request failed. Check console.");
    }
  };

  const handleCancel = async () => {
    const orderId = new URLSearchParams(location.search).get("orderId");

    const result = await Swal.fire({
      title: "Cancel Payment?",
      text: "Are you sure you want to cancel this payment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it",
      cancelButtonText: "No, go back",
    });

    if (result.isConfirmed) {
      if (orderId) {
        try {
          await axiosSecure.delete(`/orders/${orderId}`);
        } catch (err) {
          console.log(err);
        }
      }

      Swal.fire({
        icon: "success",
        title: "Payment Cancelled",
        showConfirmButton: false,
        timer: 1200,
      });

      navigate(-1);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <title>Payment</title>

      <div className="bg-white shadow-xl rounded-2xl w-full max-w-xl p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Complete Your Payment</h2>

        <div className="space-y-3 border-b pb-4 mb-6">
          <h3 className="text-xl font-semibold text-gray-700">{product?.title || productTitle}</h3>
          <p className="text-gray-500">{productTitle}</p>

          <div className="flex justify-between mt-4 text-gray-700">
            <span className="font-medium">Quantity:</span>
            <span>{quantity}</span>
          </div>

          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Price:</span>
            <span className="font-semibold text-green-600 text-lg">${productPrice}</span>
          </div>
        </div>

        <div className="text-sm text-gray-600 mb-6">
          <p>
            <span className="font-medium">Buyer Email:</span> {buyerEmail}
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleCancel}
            className="w-1/2 btn bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition"
          >
            Cancel
          </button>

          <button
            onClick={handlePayment}
            className="w-1/2 btn btn-primary hover:bg-primary/90 text-white rounded-lg text-lg font-semibold transition"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
