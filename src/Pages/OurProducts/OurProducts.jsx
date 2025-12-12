import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Link } from 'react-router'
import { motion } from 'motion/react'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import useAxios from '../../hooks/useAxios'
import AllProductCard from '../AllProductCard/AllProductCard'

const OurProducts = () => {
  const axiosSecure = useAxios()

  const { data: ourProducts = [], isLoading, error } = useQuery({
    queryKey: ['topProducts'],
    queryFn: async () => {
      const res = await axiosSecure.get('/topProducts')
      return res.data
    }
  })

  if (isLoading) return <LoadingSpinner></LoadingSpinner>
  if (error) return <p className='text-2xl text-center text-red-500'>Sorry, something went wrong!</p>

  return (
    <div className="py-15 px-10">
      <motion.h1 initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }} className="text-4xl text-center font-bold mb-10">Our Products</motion.h1>

      
      <div className=" grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center">
        {ourProducts.map((product) => <AllProductCard key={product._id} product={product}></AllProductCard>)}
      </div>
      <div className='text-center mt-15'>
        <Link to="/products"><button className='btn btn-primary'>View More</button></Link>
      </div>
    </div>

  )
}

export default OurProducts
