import React from 'react';
import { RingLoader } from 'react-spinners';

const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center text-center min-h-screen text-green-600">
      <span className=""><RingLoader color="#4fa94d" /></span>
    </div>
    );
};

export default LoadingSpinner;