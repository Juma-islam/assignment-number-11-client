// import React, { useState, useEffect } from 'react'
// import { useQuery } from '@tanstack/react-query'
// import useAxios from '../../hooks/useAxios'
// import LoadingSpinner from '../../components/Shared/LoadingSpinner'
// import AllProductCard from '../AllProductCard/AllProductCard'


// const AllProduct = () => {
//   const axiosSecure = useAxios()

//   const [page, setPage] = useState(1)
//   const [searchTerm, setSearchTerm] = useState('')
//   const [category, setCategory] = useState('all')
//   const [filteredProducts, setFilteredProducts] = useState([])

//   const limit = 8
//   const skip = (page - 1) * limit

//   const { data: products = [], isLoading } = useQuery({
//     queryKey: ['products'],
//     queryFn: async () => {
//       const res = await axiosSecure.get('/products')
//       return res.data
//     }
//   })

//   useEffect(() => {
//     if (!products || products.length === 0) return

//     let result = [...products]

//     if (searchTerm) {
//       const term = searchTerm.toLowerCase()
//       result = result.filter(product => {
       
//         return product.title?.toLowerCase().includes(term) ||
//                product.category?.toLowerCase().includes(term)
//       })
//     }

//     if (category !== 'all') {
//       result = result.filter(product => 
//         product.category === category
//       )
//     }

//     setFilteredProducts(result)
//   }, [products, searchTerm, category])

//   const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))]


//   const totalProducts = filteredProducts.length
//   const totalPages = Math.ceil(totalProducts / limit)
//   const paginatedProducts = filteredProducts.slice(skip, skip + limit)

//   useEffect(() => {
//     setPage(1)
//   }, [searchTerm, category])

//   if (isLoading) return <LoadingSpinner />


//   return (
//     <div className="container mx-auto px-5 py-10">
//       <title> All Products</title>
      
//       <h1 className="text-3xl font-bold mb-8 text-center">
//         All Products
//       </h1>
//       <div className="mb-8 flex flex-col md:flex-row gap-4">
//         <div className="flex-1">
//           <input
//             type="text"
//             placeholder="Search products..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full px-4 py-2 border rounded"
//           />
//         </div>

//         <div>
//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="px-4 py-2 border rounded"
//           >
//             {categories.map(cat => (
//               <option key={cat} value={cat} className='text-gray-900'>
//                 {cat === 'all' ? 'All Categories' : cat}
//               </option>
//             ))}
//           </select>
//         </div>

//         {(searchTerm || category !== 'all') && (
//           <button
//             onClick={() => {
//               setSearchTerm('')
//               setCategory('all')
//             }}
//             className="px-4 py-2 bg-base-200 rounded"
//           >
//             Clear
//           </button>
//         )}
//       </div>

//       <div className="mb-4">
//         <p>
//           Showing {paginatedProducts.length} of {filteredProducts.length} products
//           {searchTerm && ` for "${searchTerm}"`}
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//         {paginatedProducts.map((product) => (
//           <AllProductCard key={product._id} product={product} />
//         ))}
//       </div>

//       {totalPages > 1 && (
//         <div className="flex justify-center gap-4 mt-8">
//           <button
//             disabled={page === 1}
//             onClick={() => setPage(page - 1)}
//             className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
//           >
//             Previous
//           </button>
          
//           <span>Page {page} of {totalPages}</span>
          
//           <button
//             disabled={page === totalPages}
//             onClick={() => setPage(page + 1)}
//             className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   )
// }

// export default AllProduct

// import React, { useState, useEffect } from 'react'
// import { useQuery } from '@tanstack/react-query'
// import { motion } from 'framer-motion'
// import { Search, Filter, X, ChevronLeft, ChevronRight } from 'lucide-react'
// import useAxios from '../../hooks/useAxios'
// import LoadingSpinner from '../../components/Shared/LoadingSpinner'
// import AllProductCard from '../AllProductCard/AllProductCard'

// const AllProduct = () => {
//   const axiosSecure = useAxios()

//   const [page, setPage] = useState(1)
//   const [searchTerm, setSearchTerm] = useState('')
//   const [category, setCategory] = useState('all')
//   const [filteredProducts, setFilteredProducts] = useState([])

//   const limit = 8
//   const skip = (page - 1) * limit

//   const { data: products = [], isLoading } = useQuery({
//     queryKey: ['products'],
//     queryFn: async () => {
//       const res = await axiosSecure.get('/products')
//       return res.data
//     }
//   })

//   useEffect(() => {
//     if (!products || products.length === 0) return

//     let result = [...products]

//     if (searchTerm) {
//       const term = searchTerm.toLowerCase()
//       result = result.filter(product => {
//         return product.title?.toLowerCase().includes(term) ||
//                product.category?.toLowerCase().includes(term)
//       })
//     }

//     if (category !== 'all') {
//       result = result.filter(product => 
//         product.category === category
//       )
//     }

//     setFilteredProducts(result)
//   }, [products, searchTerm, category])

//   const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))]

//   const totalProducts = filteredProducts.length
//   const totalPages = Math.ceil(totalProducts / limit)
//   const paginatedProducts = filteredProducts.slice(skip, skip + limit)

//   useEffect(() => {
//     setPage(1)
//   }, [searchTerm, category])

//   if (isLoading) return <LoadingSpinner />

//   return (
//     <div className="bg-white dark:bg-[#050505] min-h-screen transition-colors duration-500 pt-28 pb-20">
//       <div className="max-w-7xl mx-auto px-6">
        
//         {/* Header - Matching Other Pages */}
//         <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
//           <motion.div 
//             initial={{ opacity: 0, x: -30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//             className="max-w-2xl"
//           >
//             <span className="text-xs tracking-[0.4em] font-bold text-indigo-600 dark:text-indigo-400 uppercase mb-4 block">
//               Catalog
//             </span>
//             <h2 className="text-4xl md:text-6xl font-serif font-black text-gray-900 dark:text-white uppercase leading-tight">
//               Curated <br /> Collections
//             </h2>
//           </motion.div>
          
//           <motion.p 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-gray-500 dark:text-zinc-400 text-lg max-w-xs md:text-right border-l-2 md:border-l-0 md:border-r-2 border-indigo-600 px-4"
//           >
//             Discover high-quality garment solutions tailored for global production standards.
//           </motion.p>
//         </div>

//         {/* Search & Filter Bar */}
//         <div className="mb-12 flex flex-col md:flex-row gap-6 items-center justify-between border-b border-gray-100 dark:border-zinc-800 pb-10">
//           <div className="relative w-full md:max-w-md group">
//             <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
//             <input
//               type="text"
//               placeholder="SEARCH PRODUCTS..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full bg-transparent border-none pl-8 py-3 text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white focus:outline-none placeholder:text-gray-300 dark:placeholder:text-zinc-800"
//             />
//           </div>

//           <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
//             <div className="relative">
//               <select
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 className="appearance-none bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 px-6 py-3 pr-12 rounded-none text-[10px] font-black uppercase tracking-widest text-gray-900 dark:text-white focus:outline-none focus:border-indigo-600 transition-all cursor-pointer"
//               >
//                 {categories.map(cat => (
//                   <option key={cat} value={cat}>
//                     {cat === 'all' ? 'ALL CATEGORIES' : cat.toUpperCase()}
//                   </option>
//                 ))}
//               </select>
//               <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
//             </div>

//             {(searchTerm || category !== 'all') && (
//               <button
//                 onClick={() => {
//                   setSearchTerm('')
//                   setCategory('all')
//                 }}
//                 className="flex items-center gap-2 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
//               >
//                 <X size={14} /> Clear
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Products Count */}
//         <div className="mb-10">
//             <p className="text-[10px] tracking-[0.3em] text-gray-400 dark:text-zinc-600 font-bold uppercase">
//                 Showing {paginatedProducts.length} of {filteredProducts.length} Results
//                 {searchTerm && <span className="text-indigo-600"> — "{searchTerm}"</span>}
//             </p>
//         </div>

//         {/* Product Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
//           {paginatedProducts.length > 0 ? (
//             paginatedProducts.map((product) => (
//                 <AllProductCard key={product._id} product={product} />
//             ))
//           ) : (
//             <div className="col-span-full py-20 text-center">
//                 <h3 className="text-xl font-bold text-gray-400 uppercase tracking-widest">No Products Found</h3>
//             </div>
//           )}
//         </div>

//         {/* Pagination - Luxury Style */}
//         {totalPages > 1 && (
//           <div className="flex flex-col items-center gap-6 mt-24 border-t border-gray-100 dark:border-zinc-800 pt-10">
//             <div className="flex items-center gap-8">
//               <button
//                 disabled={page === 1}
//                 onClick={() => setPage(page - 1)}
//                 className="p-4 border border-gray-100 dark:border-zinc-800 disabled:opacity-20 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all group"
//               >
//                 <ChevronLeft size={20} />
//               </button>
              
//               <div className="flex items-center gap-4">
//                 <span className="text-sm font-black tracking-[0.3em] text-gray-900 dark:text-white uppercase">Page {page}</span>
//                 <div className="w-10 h-[1px] bg-indigo-600"></div>
//                 <span className="text-sm font-black tracking-[0.3em] text-gray-300 dark:text-zinc-700 uppercase">{totalPages}</span>
//               </div>
              
//               <button
//                 disabled={page === totalPages}
//                 onClick={() => setPage(page + 1)}
//                 className="p-4 border border-gray-100 dark:border-zinc-800 disabled:opacity-20 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all group"
//               >
//                 <ChevronRight size={20} />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default AllProduct
// import React, { useState, useEffect } from 'react'
// import { useQuery } from '@tanstack/react-query'
// import { motion } from 'framer-motion'
// import { Search, Filter, X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
// import useAxios from '../../hooks/useAxios'
// import AllProductCard from '../AllProductCard/AllProductCard'

// const SkeletonCard = () => (
//   <div className="bg-gray-100 dark:bg-zinc-900 rounded-2xl p-6 animate-pulse">
//     <div className="bg-gray-200 dark:bg-zinc-800 rounded-xl h-64 mb-4" />
//     <div className="h-6 bg-gray-200 dark:bg-zinc-800 rounded mb-2" />
//     <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-3/4 mb-4" />
//     <div className="h-8 bg-gray-200 dark:bg-zinc-800 rounded" />
//   </div>
// )

// const AllProduct = () => {
//   const axiosSecure = useAxios()

//   const [page, setPage] = useState(1)
//   const [searchTerm, setSearchTerm] = useState('')
//   const [category, setCategory] = useState('all')
//   const [sortBy, setSortBy] = useState('default') // নতুন: sorting
//   const [filteredProducts, setFilteredProducts] = useState([])

//   const limit = 8
//   const skip = (page - 1) * limit

//   const { data: products = [], isLoading } = useQuery({
//     queryKey: ['products'],
//     queryFn: async () => {
//       const res = await axiosSecure.get('/products')
//       return res.data
//     }
//   })

//   useEffect(() => {
//     if (!products || products.length === 0) return

//     let result = [...products]

//     // Search
//     if (searchTerm) {
//       const term = searchTerm.toLowerCase()
//       result = result.filter(product => 
//         product.title?.toLowerCase().includes(term) ||
//         product.category?.toLowerCase().includes(term)
//       )
//     }

//     // Category filter
//     if (category !== 'all') {
//       result = result.filter(product => product.category === category)
//     }

//     // Sorting
//     if (sortBy === 'price-low') {
//       result.sort((a, b) => a.price - b.price)
//     } else if (sortBy === 'price-high') {
//       result.sort((a, b) => b.price - a.price)
//     } else if (sortBy === 'name') {
//       result.sort((a, b) => a.title.localeCompare(b.title))
//     }

//     setFilteredProducts(result)
//   }, [products, searchTerm, category, sortBy])

//   const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))]

//   const totalProducts = filteredProducts.length
//   const totalPages = Math.ceil(totalProducts / limit)
//   const paginatedProducts = filteredProducts.slice(skip, skip + limit)

//   useEffect(() => {
//     setPage(1)
//   }, [searchTerm, category, sortBy])

//   return (
//     <div className="bg-white dark:bg-[#050505] min-h-screen transition-colors duration-500 pt-28 pb-20">
//       <div className="max-w-7xl mx-auto px-6">
        
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
//           <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl">
//             <span className="text-xs tracking-[0.4em] font-bold text-indigo-600 dark:text-indigo-400 uppercase mb-4 block">
//               Catalog
//             </span>
//             <h2 className="text-4xl md:text-6xl font-serif font-black text-gray-900 dark:text-white uppercase leading-tight">
//               Curated <br /> Collections
//             </h2>
//           </motion.div>
          
//           <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-500 dark:text-zinc-400 text-lg max-w-xs md:text-right">
//             Discover high-quality garment solutions tailored for global production standards.
//           </motion.p>
//         </div>

//         {/* Search, Filter & Sort Bar */}
//         <div className="mb-12 flex flex-col lg:flex-row gap-6 items-center justify-between border-b border-gray-100 dark:border-zinc-800 pb-10">
//           <div className="relative w-full lg:max-w-md group">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
//             <input
//               type="text"
//               placeholder="SEARCH PRODUCTS..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-12 pr-4 py-4 bg-transparent border border-gray-200 dark:border-zinc-800 rounded-xl text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white focus:outline-none focus:border-indigo-600 transition-all placeholder:text-gray-400 dark:placeholder:text-zinc-700"
//             />
//           </div>

//           <div className="flex flex-wrap items-center gap-4">
//             <select
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="px-6 py-4 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-indigo-600 cursor-pointer"
//             >
//               {categories.map(cat => (
//                 <option key={cat} value={cat}>
//                   {cat === 'all' ? 'ALL CATEGORIES' : cat.toUpperCase()}
//                 </option>
//               ))}
//             </select>

//             {/* Sorting - নতুন যোগ করা */}
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="px-6 py-4 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-indigo-600 cursor-pointer"
//             >
//               <option value="default">SORT BY</option>
//               <option value="price-low">PRICE: LOW → HIGH</option>
//               <option value="price-high">PRICE: HIGH → LOW</option>
//               <option value="name">NAME A → Z</option>
//             </select>

//             {(searchTerm || category !== 'all' || sortBy !== 'default') && (
//               <button
//                 onClick={() => {
//                   setSearchTerm('')
//                   setCategory('all')
//                   setSortBy('default')
//                 }}
//                 className="flex items-center gap-2 px-6 py-4 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
//               >
//                 <X size={16} /> CLEAR ALL
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Results Count */}
//         <div className="mb-10">
//           <p className="text-[10px] tracking-[0.3em] text-gray-400 dark:text-zinc-600 font-bold uppercase">
//             Showing {paginatedProducts.length} of {totalProducts} Results
//             {searchTerm && <span className="text-indigo-600"> — "{searchTerm}"</span>}
//           </p>
//         </div>

//         {/* Product Grid with Skeleton */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
//           {isLoading ? (
//             Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)
//           ) : paginatedProducts.length > 0 ? (
//             paginatedProducts.map((product, index) => (
//               <motion.div
//                 key={product._id}
//                 initial={{ opacity: 0, y: 40 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.05 }}
//               >
//                 <AllProductCard product={product} />
//               </motion.div>
//             ))
//           ) : (
//             <div className="col-span-full py-32 text-center">
//               <h3 className="text-2xl font-bold text-gray-400 dark:text-zinc-600 uppercase tracking-widest">
//                 No Products Found
//               </h3>
//               <p className="mt-4 text-gray-500 dark:text-zinc-500">
//                 Try adjusting your search or filters
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex flex-col items-center gap-8 mt-24 border-t border-gray-100 dark:border-zinc-800 pt-12">
//             <div className="flex items-center gap-10">
//               <button
//                 disabled={page === 1}
//                 onClick={() => setPage(page - 1)}
//                 className="p-4 border border-gray-200 dark:border-zinc-800 disabled:opacity-30 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 transition-all group"
//               >
//                 <ChevronLeft size={24} />
//               </button>
              
//               <span className="text-sm font-black tracking-[0.4em] text-gray-900 dark:text-white uppercase">
//                 Page {page} / {totalPages}
//               </span>
              
//               <button
//                 disabled={page === totalPages}
//                 onClick={() => setPage(page + 1)}
//                 className="p-4 border border-gray-200 dark:border-zinc-800 disabled:opacity-30 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 transition-all group"
//               >
//                 <ChevronRight size={24} />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default AllProduct
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import useAxios from '../../hooks/useAxios'
import AllProductCard from '../AllProductCard/AllProductCard'

const SkeletonCard = () => (
  <div className="bg-white/60 dark:bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 animate-pulse border border-white/50 dark:border-gray-700/50 shadow-xl">
    <div className="bg-gray-200/70 dark:bg-gray-700/70 rounded-xl h-64 mb-6" />
    <div className="h-6 bg-gray-200/70 dark:bg-gray-700/70 rounded mb-3" />
    <div className="h-4 bg-gray-200/70 dark:bg-gray-700/70 rounded w-3/4 mb-4" />
    <div className="h-8 bg-gray-200/70 dark:bg-gray-700/70 rounded" />
  </div>
)

const AllProduct = () => {
  const axiosSecure = useAxios()

  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('all')
  const [sortBy, setSortBy] = useState('default')

  const limit = 8
  const skip = (page - 1) * limit

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await axiosSecure.get('/products')
      return res.data
    }
  })

  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    if (!products?.length) return

    let result = [...products]

    // Search
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase()
      result = result.filter(p =>
        p.title?.toLowerCase().includes(term) ||
        p.category?.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term)
      )
    }

    // Category
    if (category !== 'all') {
      result = result.filter(p => p.category === category)
    }

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => (a.price || 0) - (b.price || 0))
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => (b.price || 0) - (a.price || 0))
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.title?.localeCompare(b.title || ''))
    }

    setFilteredProducts(result)
  }, [products, searchTerm, category, sortBy])

  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))]

  const totalProducts = filteredProducts.length
  const totalPages = Math.ceil(totalProducts / limit)
  const paginatedProducts = filteredProducts.slice(skip, skip + limit)

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1)
  }, [searchTerm, category, sortBy])

  return (
    <section className="py-20 md:py-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-indigo-950/60 dark:to-purple-950/40 transition-colors duration-500 min-h-screen">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-medium tracking-wider mb-5">
            PRODUCT CATALOG
          </span>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-6">
            Curated Collections
          </h2>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover premium garment solutions built for global production standards and buyer satisfaction.
          </p>
        </motion.div>

        {/* Controls Bar */}
        <div className="mb-12 flex flex-col lg:flex-row gap-6 lg:gap-8 items-center justify-between">
          {/* Search */}
          <div className="relative w-full lg:max-w-lg group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={22} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`
                w-full pl-14 pr-5 py-5 bg-white/60 dark:bg-gray-800/40 
                backdrop-blur-xl border border-white/50 dark:border-gray-700/50 
                rounded-2xl text-gray-900 dark:text-white 
                focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400
                shadow-lg transition-all duration-300 placeholder:text-gray-500 dark:placeholder:text-gray-400
              `}
            />
          </div>

          {/* Filters & Sort */}
          <div className="flex flex-wrap items-center gap-4">
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className={`
                px-6 py-5 bg-white/60 dark:bg-gray-800/40 backdrop-blur-xl 
                border border-white/50 dark:border-gray-700/50 
                rounded-2xl text-sm font-medium text-gray-900 dark:text-white 
                focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400
                cursor-pointer shadow-lg
              `}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className={`
                px-6 py-5 bg-white/60 dark:bg-gray-800/40 backdrop-blur-xl 
                border border-white/50 dark:border-gray-700/50 
                rounded-2xl text-sm font-medium text-gray-900 dark:text-white 
                focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400
                cursor-pointer shadow-lg
              `}
            >
              <option value="default">Sort By</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="name">Name A → Z</option>
            </select>

            {(searchTerm || category !== 'all' || sortBy !== 'default') && (
              <button
                onClick={() => {
                  setSearchTerm('')
                  setCategory('all')
                  setSortBy('default')
                }}
                className="flex items-center gap-2 px-6 py-5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-2xl border border-red-200 dark:border-red-800/50 transition-all"
              >
                <X size={18} /> Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-10 text-center md:text-left">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Showing <span className="font-bold text-indigo-600 dark:text-indigo-400">{paginatedProducts.length}</span> of{' '}
            <span className="font-bold">{totalProducts}</span> products
            {searchTerm && <span className="text-indigo-600"> — "{searchTerm}"</span>}
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {isLoading ? (
            Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)
          ) : paginatedProducts.length > 0 ? (
            paginatedProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <AllProductCard product={product} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-32 text-center">
              <h3 className="text-3xl font-bold text-gray-400 dark:text-gray-600 uppercase tracking-wider">
                No Products Found
              </h3>
              <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center gap-8 mt-20 md:mt-24">
            <div className="flex items-center gap-6 md:gap-12">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                disabled={page === 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className={`
                  p-4 rounded-full bg-white/70 dark:bg-gray-800/50 
                  backdrop-blur-lg border border-white/50 dark:border-gray-700/50
                  disabled:opacity-40 hover:bg-indigo-600 hover:text-white
                  transition-all shadow-lg
                `}
              >
                <ChevronLeft size={24} />
              </motion.button>

              <span className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                Page {page} of {totalPages}
              </span>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                disabled={page === totalPages}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                className={`
                  p-4 rounded-full bg-white/70 dark:bg-gray-800/50 
                  backdrop-blur-lg border border-white/50 dark:border-gray-700/50
                  disabled:opacity-40 hover:bg-indigo-600 hover:text-white
                  transition-all shadow-lg
                `}
              >
                <ChevronRight size={24} />
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default AllProduct