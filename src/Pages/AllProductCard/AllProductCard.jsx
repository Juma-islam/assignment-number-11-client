import React from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router'

const AllProductCard = ({ product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full h-full flex flex-col bg-base-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
    >
      <figure className="overflow-hidden rounded-t-2xl">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-60 object-cover transition-transform duration-300 hover:scale-105"
        />
      </figure>

      <div className="p-5 flex-grow flex flex-col space-y-2">
        <h2 className="text-lg font-bold">{product.title}</h2>
        <p className="text-sm ">{product.category}</p>

        <div className="flex items-center justify-between mt-2">
          <span className="text-md font-semibold text-green-700">${product.price}</span>
          <span className="text-sm ">Stock: {product.availableQuantity}</span>
        </div>

        <Link to={`/product-details/${product._id}`} className="mt-auto">
          <button className="w-full bg-primary text-white font-bold py-2 rounded-lg shadow hover:bg-primary/90 transition-colors cursor-pointer">
            View Details
          </button>
        </Link>
      </div>
    </motion.div>
  )
}

export default AllProductCard
