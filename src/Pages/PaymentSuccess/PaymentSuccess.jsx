import { useEffect } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Link, useLocation } from "react-router";
import useAxios from "../../hooks/useAxios";

const PaymentSuccess = () => {
  const axiosSecure = useAxios();
  const location = useLocation();

  useEffect(() => {
    const verifyPayment = async () => {
      const sessionId = new URLSearchParams(location.search).get("session_id");
      if (!sessionId) return;

      try {
        const res = await axiosSecure.get(`/verify-payment?session_id=${sessionId}`);
        if (res.data.success) sessionStorage.removeItem("pendingOrder");
      } catch (err) {
        console.error(err);
      }
    };
    verifyPayment();
  }, [axiosSecure, location.search]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-green-50 to-green-100 p-6">
      <title>Payment Success</title>
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-lg w-full text-center animate-fadeIn">
        <div className="flex justify-center mb-6">
          <CheckCircleIcon className="w-24 h-24 text-green-500 animate-bounce-slow" />
        </div>
        <h1 className="text-3xl font-bold text-green-600 mb-3">Payment Successful!</h1>
        <p className="text-gray-600 text-lg mb-8">
          Your payment has been processed successfully. Thank you for your purchase!
        </p>
        <div className="flex flex-col gap-4">
          <Link to="/dashboard/my-orders" className="btn btn-primary text-lg font-semibold flex-1 hover:bg-primary/90">
            My Orders
          </Link>
          <Link to="/" className="btn btn-outline btn-secondary text-lg font-semibold flex-1">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
