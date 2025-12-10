
import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';

const AllProductCard = ({ product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {/* <Link to={`/product-details/${product._id}`} className="block"> */}
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200">
          
          {/* Image */}
          <div className="relative overflow-hidden bg-gray-50">
            <img
              src={product.images[0]}
              alt={product.productName}
              className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
            />
            
            {/* Simple Sale Badge */}
            {product.discount > 0 && (
              <div className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                -{product.discount}%
              </div>
            )}
            
            {/* Out of Stock Overlay */}
            {product.availableQuantity === 0 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">Out of Stock</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5 space-y-3">
            <h3 className="font-semibold text-lg text-gray-800 line-clamp-2 leading-snug">
              {product.productName}
            </h3>
            
            <p className="text-sm text-gray-500">{product.category}</p>

            {/* Price & Stock */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-gray-900">
                  ${product.price}
                </span>
                {product.originalPrice > product.price && (
                  <span className="ml-2 text-sm text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              <span className={`text-sm font-medium ${product.availableQuantity < 10 && product.availableQuantity > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                {product.availableQuantity > 0 ? `${product.availableQuantity} in stock` : 'Sold out'}
              </span>
            </div>

            {/* Simple Clean Button */}
          <Link to={`/product-details/${product._id}`}>
          <button className="mt-3 w-full bg-primary text-white font-bold py-2 rounded-lg shadow hover:bg-secondary transition-colors">
            View Details
          </button>
        </Link>
          </div>
        </div>
    
    </motion.div>
  );
};

export default AllProductCard;