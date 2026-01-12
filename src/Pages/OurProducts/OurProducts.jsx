import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { motion } from "framer-motion";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAxios from "../../hooks/useAxios";
import AllProductCard from "../AllProductCard/AllProductCard";
import { ArrowRight } from "lucide-react";

const ProductSkeleton = () => (
  <div className="bg-white/70 dark:bg-gray-800/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/50 dark:border-gray-700/50 shadow-xl animate-pulse">
    <div className="aspect-[3/4] bg-gray-200/70 dark:bg-gray-700/70" />
    <div className="p-6 space-y-4">
      <div className="h-6 bg-gray-200/70 dark:bg-gray-700/70 rounded w-3/4" />
      <div className="h-4 bg-gray-200/70 dark:bg-gray-700/70 rounded w-full" />
      <div className="h-4 bg-gray-200/70 dark:bg-gray-700/70 rounded w-5/6" />
      <div className="h-10 bg-gray-200/70 dark:bg-gray-700/70 rounded mt-4" />
    </div>
  </div>
);

const OurProducts = () => {
  const axiosSecure = useAxios();

  const { data: ourProducts = [], isLoading } = useQuery({
    queryKey: ["topProducts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/topProducts");
      return res.data;
    },
  });

  if (isLoading && !ourProducts.length) {
    return <LoadingSpinner />;
  }

  return (
    <section className="py-20 md:py-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-indigo-950/60 dark:to-purple-950/40 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-medium tracking-wide mb-4">
            FEATURED COLLECTIONS
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-5">
            Our Top Garment Collections
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            High-demand styles ready for immediate bulk production and global shipping
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {isLoading
            ? Array(8)
                .fill(0)
                .map((_, index) => <ProductSkeleton key={index} />)
            : ourProducts.slice(0, 8).map((product, i) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <AllProductCard product={product} />
                </motion.div>
              ))}
        </div>

        {/* View All Button */}
        <div className="mt-16 md:mt-20 text-center">
          <Link to="/allProducts">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className={`
                inline-flex items-center gap-3 
                bg-gradient-to-r from-indigo-600 to-purple-700 
                dark:from-indigo-500 dark:to-purple-600
                text-white px-10 sm:px-12 py-5 
                rounded-full font-bold uppercase 
                text-sm tracking-wider shadow-xl 
                hover:from-indigo-700 hover:to-purple-800 
                dark:hover:from-indigo-600 dark:hover:to-purple-700
                transition-all duration-300
              `}
            >
              View All Collections
              <ArrowRight size={20} />
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurProducts;
