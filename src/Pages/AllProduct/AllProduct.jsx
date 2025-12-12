import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import useAxios from '../../hooks/useAxios'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import AllProductCard from '../AllProductCard/AllProductCard'


const AllProduct = () => {
  const fetchAxios = useAxios()
  const limit = 9
  const [page, setPage] = useState(1)
  const skip = (page-1) * limit

  const { data: Products = [], isLoading,} = useQuery({
    queryKey: ['products', page],
    queryFn: async () => {
      const res = await fetchAxios.get(`/products?limit=${limit}&skip=${skip}`)
      return res.data
    }
  })

  const{data: countData = {}} = useQuery({
    queryKey: ["productsCount"],
queryFn: async() => {
  const res = await fetchAxios.get(`/productsCount`)
  return res.data
}
  })
const total = countData.count || 0
  const totalPages = Math.ceil(total / limit)
  
  if (isLoading) return <LoadingSpinner></LoadingSpinner>
  
  return (
    <div className="container mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        All Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Products.map((product) => (
          <AllProductCard key={product._id} product={product} />
        ))}
      </div>

        <div className="flex justify-center items-center gap-4 mt-10">

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="btn rounded disabled:opacity-40"
        >
          Previous
        </button>

        <span className="font-semibold text-lg">Page {page}</span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="btn rounded disabled:opacity-40"
        >
          Next
        </button>

      </div>

    </div>
  )
}

export default AllProduct
