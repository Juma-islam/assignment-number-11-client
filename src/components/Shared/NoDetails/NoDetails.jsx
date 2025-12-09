import React from "react";
import { Link } from "react-router";

const NoDetails = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
 
      <div className="text-red-500 text-7xl mb-4">
        ⚠️
      </div>

      <h1 className="text-3xl font-bold mb-2">Oops! Something Went Wrong</h1>
      
      <p className="text-gray-600 max-w-md mb-6">
        We couldn't load the product details right now.  
        It might be missing, removed, or the server failed to respond.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => window.location.reload()}
          className="btn btn-primary hover:bg-sky-700 text-white px-5 py-2 rounded-lg shadow transition"
        >
          Retry
        </button>

        <Link
          to="/all-products"
          
        >
          <button className="btn btn-outline btn-secondary px-5 py-2 rounded-lg shadow transition">Go Back</button>
        </Link>
      </div>

    </div>
  );
};

export default NoDetails;
