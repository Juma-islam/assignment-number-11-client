import React from 'react'
import { useQuery } from '@tanstack/react-query'
import useAxios from '../../hooks/useAxios'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import AllProductCard from '../AllProductCard/AllProductCard'


const AllProduct = () => {
  const fetchAxios = useAxios()

  const { data: Products = [], isLoading,} = useQuery({
    queryKey: ['all-products'],
    queryFn: async () => {
      const res = await fetchAxios.get('/all-products')
      return res.data
    }
  })

  if (isLoading) return <LoadingSpinner></LoadingSpinner>
  
  return (
    <div className="container mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        All Product
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Products.map((product) => (
          <AllProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default AllProduct
