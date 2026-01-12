import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import AllProductCard from "../AllProductCard/AllProductCard";

const SkeletonCard = () => (
  <div className="bg-white/60 dark:bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 animate-pulse border border-white/50 dark:border-gray-700/50 shadow-xl">
    <div className="bg-gray-200/70 dark:bg-gray-700/70 rounded-xl h-64 mb-6" />
    <div className="h-6 bg-gray-200/70 dark:bg-gray-700/70 rounded mb-3" />
    <div className="h-4 bg-gray-200/70 dark:bg-gray-700/70 rounded w-3/4 mb-4" />
    <div className="h-8 bg-gray-200/70 dark:bg-gray-700/70 rounded" />
  </div>
);

const AllProduct = () => {
  const axiosSecure = useAxios();

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const limit = 8;
  const skip = (page - 1) * limit;

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products");
      return res.data;
    },
  });

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (!products?.length) return;

    let result = [...products];

    // Search
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(term) ||
          p.category?.toLowerCase().includes(term) ||
          p.description?.toLowerCase().includes(term)
      );
    }

    // Category
    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    // Sorting
    if (sortBy === "price-low") {
      result.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === "price-high") {
      result.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === "name") {
      result.sort((a, b) => a.title?.localeCompare(b.title || ""));
    }

    setFilteredProducts(result);
  }, [products, searchTerm, category, sortBy]);

  const categories = ["all", ...new Set(products.map((p) => p.category).filter(Boolean))];

  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / limit);
  const paginatedProducts = filteredProducts.slice(skip, skip + limit);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [searchTerm, category, sortBy]);

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
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors"
              size={22}
            />
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
              onChange={(e) => setCategory(e.target.value)}
              className={`
                px-6 py-5 bg-white/60 dark:bg-gray-800/40 backdrop-blur-xl 
                border border-white/50 dark:border-gray-700/50 
                rounded-2xl text-sm font-medium text-gray-900 dark:text-white 
                focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400
                cursor-pointer shadow-lg
              `}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
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

            {(searchTerm || category !== "all" || sortBy !== "default") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setCategory("all");
                  setSortBy("default");
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
            Showing <span className="font-bold text-indigo-600 dark:text-indigo-400">{paginatedProducts.length}</span>{" "}
            of <span className="font-bold">{totalProducts}</span> products
            {searchTerm && <span className="text-indigo-600"> — "{searchTerm}"</span>}
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {isLoading ? (
            Array(8)
              .fill(0)
              .map((_, i) => <SkeletonCard key={i} />)
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
              <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">Try adjusting your search or filters</p>
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
                onClick={() => setPage((p) => Math.max(1, p - 1))}
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
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
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
  );
};

export default AllProduct;
