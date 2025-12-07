import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const ReviewsCard = ({ review }) => {
    const {userName, review: testimonial, user_photoURL}= review
  return (
    <div className="max-w-sm p-6 rounded-2xl shadow-lg bg-white border border-gray-200">
      <FaQuoteLeft className="w-8 h-8 text-teal-600 mb-3" />

      <p className=" mb-4">
      {testimonial}
      </p>

      <div className="border-t border-dashed border-teal-400 my-4"></div>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full">
        <img src={user_photoURL} alt="" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">{userName}</h3>
          <p className="text-sm text-gray-500">Senior Product Designer</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewsCard;
