// import React from "react";
// import { motion } from "motion/react";
// import { Link } from "react-router";

// const AllProductCard = ({ product }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8 }}
//       className="w-full h-full flex flex-col bg-base-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
//     >
//       <figure className="overflow-hidden rounded-t-2xl">
//         <img
//           src={product.images[0]}
//           alt={product.title}
//           className="w-full h-60 object-cover transition-transform duration-300 hover:scale-105"
//         />
//       </figure>

//       <div className="p-5 flex-grow flex flex-col space-y-2">
//         <h2 className="text-lg font-bold">{product.title}</h2>
//         <p className="text-sm ">{product.category}</p>

//         <div className="flex items-center justify-between mt-2">
//           <span className="text-md font-semibold text-green-700">${product.price}</span>
//           <span className="text-sm ">Stock: {product.availableQuantity}</span>
//         </div>

//         <Link to={`/product-details/${product._id}`} className="mt-auto">
//           <button className="w-full bg-primary text-white font-bold py-2 rounded-lg shadow hover:bg-primary/90 transition-colors cursor-pointer">
//             View Details
//           </button>
//         </Link>
//       </div>
//     </motion.div>
//   );
// };

// export default AllProductCard;
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const AllProductCard = ({ product }) => {
  const getShortDescription = (desc) => {
    if (!desc) return "No description available";

    const short = desc.trim().substring(0, 90);
    return short.length === desc.length ? short : short + "...";
  };

  const shortDesc = getShortDescription(product.productDescription);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`
        group relative flex flex-col overflow-hidden
        rounded-2xl bg-base-100 border border-base-300
        shadow-md hover:shadow-2xl transition-all duration-300
        dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-900/30
      `}
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={product.images?.[0] || "https://via.placeholder.com/400x300?text=No+Image"}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow space-y-3">
        <h3 className="text-lg font-bold line-clamp-2 text-base-content dark:text-gray-100 group-hover:text-primary">
          {product.title}
        </h3>

        <div className="flex items-center justify-between text-sm">
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-base-200 dark:bg-gray-700">
            {product.category}
          </span>
          <span className="text-xl font-bold text-primary">${product.price}</span>
        </div>

        <p className="text-sm text-base-content/70 dark:text-gray-400 line-clamp-3 min-h-[3.75rem]">
          {shortDesc}
        </p>

        <div className="flex items-center gap-2 text-sm mt-auto">
          <span className="font-medium">Stock:</span>
          <span
            className={`font-semibold ${
              product.availableQuantity > 20
                ? "text-success"
                : product.availableQuantity > 5
                ? "text-warning"
                : "text-error"
            }`}
          >
            {product.availableQuantity}
          </span>
        </div>

        <Link to={`/product-details/${product._id}`} className="mt-2">
          <button className="w-full py-3 px-6 rounded-xl font-semibold bg-primary text-primary-content hover:bg-primary-focus transition-all shadow-sm hover:shadow-md">
            View Details
          </button>
        </Link>
      </div>

      {/* MOQ Badge */}
      {product.minimumOrderQuantity && (
        <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm font-medium">
          MOQ: {product.minimumOrderQuantity}
        </div>
      )}
    </motion.div>
  );
};

export default AllProductCard;