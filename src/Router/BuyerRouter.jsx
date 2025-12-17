import React from "react";
import { useNavigate } from "react-router";
import useRoles from "../hooks/useRoles";
import LoadingSpinner from "../components/Shared/LoadingSpinner";

const BuyerRouter = ({ children }) => {
  const user = useRoles();
  const navigate = useNavigate();

  if (!user?.role) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (user?.role === "buyer") {
    return children;
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
        <h2 className="text-3xl font-semibold text-red-500">Access Denied</h2>
        <p className="text-lg text-gray-700">You don't have the necessary permissions to view this page.</p>
        <button className="btn btn-primary hover:bg-primary/90 mt-4" onClick={() => navigate("/dashboard")}>
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default BuyerRouter;
