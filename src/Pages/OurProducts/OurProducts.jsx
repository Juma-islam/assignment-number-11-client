// import { useQuery } from '@tanstack/react-query'
// import React from 'react'
// import { Link } from 'react-router'
// import { motion } from 'motion/react'
// import LoadingSpinner from '../../components/Shared/LoadingSpinner'
// import useAxios from '../../hooks/useAxios'
// import AllProductCard from '../AllProductCard/AllProductCard'

// const OurProducts = () => {
//   const axiosSecure = useAxios()

//   const { data: ourProducts = [], isLoading, error } = useQuery({
//     queryKey: ['topProducts'],
//     queryFn: async () => {
//       const res = await axiosSecure.get('/topProducts')
//       return res.data
//     }
//   })

//   if (isLoading) return <LoadingSpinner></LoadingSpinner>
//   if (error) return <p className='text-2xl text-center text-red-500'>Sorry, something went wrong!</p>

//   return (
//     <div className="py-15 px-10">
//       <motion.h1 initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }} className="text-4xl text-center font-bold mb-10">Our Products</motion.h1>

      
//       <div className=" grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center">
//         {ourProducts.map((product) => <AllProductCard key={product._id} product={product}></AllProductCard>)}
//       </div>
//       <div className='text-center mt-15'>
//         <Link to="/products"><button className='btn btn-primary'>View More</button></Link>
//       </div>
//     </div>

//   )
// }

// export default OurProducts


import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import useAxios from '../../hooks/useAxios';
import AllProductCard from '../AllProductCard/AllProductCard';

const OurProducts = () => {
  const axiosSecure = useAxios();

  const { data: ourProducts = [], isLoading } = useQuery({
    queryKey: ['topProducts'],
    queryFn: async () => {
      const res = await axiosSecure.get('/topProducts');
      return res.data;
    }
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Garment Collections
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready-to-ship high-quality apparel trusted by global buyers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {ourProducts.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <AllProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link to="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-bold text-lg px-10 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all"
            >
              Explore All Products →
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurProducts;