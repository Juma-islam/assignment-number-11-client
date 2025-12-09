import React from 'react';
import { RingLoader } from 'react-spinners';

const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center text-center min-h-screen text-green-600">
      <span className=""><RingLoader 
  color="#a855f7" 
  size={90} 
  // cssOverride={{ 
  //   boxShadow: '0 0 40px rgba(168, 85, 247, 0.6)',
  //   borderRadius: '50%'
  // }} 
/></span>
    </div>
    );
};

export default LoadingSpinner;

