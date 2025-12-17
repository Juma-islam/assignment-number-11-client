import React from "react";
import { RingLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center text-center min-h-screen text-green-600">
      <span className="">
        <RingLoader color="#a855f7" size={90} />
      </span>
    </div>
  );
};

export default LoadingSpinner;
