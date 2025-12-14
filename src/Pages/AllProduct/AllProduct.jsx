import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import useAxios from '../../hooks/useAxios'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import AllProductCard from '../AllProductCard/AllProductCard'


const AllProduct = () => {
  const axiosSecure = useAxios()

  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('all')
  const [filteredProducts, setFilteredProducts] = useState([])

  const limit = 9
  const skip = (page - 1) * limit

  // Fetch all products
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await axiosSecure.get('/products')
      return res.data
    }
  })

  // Filter products
  useEffect(() => {
    if (!products || products.length === 0) return

    let result = [...products]

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(product => {
        // productName 
        return product.productName?.toLowerCase().includes(term) ||
               product.category?.toLowerCase().includes(term)
      })
    }

    // Category filter
    if (category !== 'all') {
      result = result.filter(product => 
        product.category === category
      )
    }

    setFilteredProducts(result)
  }, [products, searchTerm, category])

  // Categories 
  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))]

  // Pagination calculation
  const totalProducts = filteredProducts.length
  const totalPages = Math.ceil(totalProducts / limit)
  const paginatedProducts = filteredProducts.slice(skip, skip + limit)

  useEffect(() => {
    setPage(1)
  }, [searchTerm, category])

  if (isLoading) return <LoadingSpinner />


  return (
    <div className="container mx-auto px-5 py-10">
      <title> All Products</title>
      
      <h1 className="text-3xl font-bold mb-8 text-center">
        All Products
      </h1>

      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 border rounded"
          >
            {categories.map(cat => (
              <option key={cat} value={cat} className='text-gray-900'>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>

        {(searchTerm || category !== 'all') && (
          <button
            onClick={() => {
              setSearchTerm('')
              setCategory('all')
            }}
            className="px-4 py-2 bg-base-200 rounded"
          >
            Clear
          </button>
        )}
      </div>

      <div className="mb-4">
        <p>
          Showing {paginatedProducts.length} of {filteredProducts.length} products
          {searchTerm && ` for "${searchTerm}"`}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginatedProducts.map((product) => (
          <AllProductCard key={product._id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-8">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Previous
          </button>
          
          <span>Page {page} of {totalPages}</span>
          
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default AllProduct