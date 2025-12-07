

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import bannerImg2 from "../../assets/gtPic.avif"

const HeroBanner = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-800 py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Side - Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Manage Your Garments Factory  
            <span className="text-yellow-300"> Smarter & Faster</span>
          </h1>

          <p className="text-lg text-gray-200 mt-6 leading-relaxed">
            Track orders, monitor production stages, manage inventory, and deliver on time. 
            All in one simple and powerful dashboard.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              to="/all-products"
              className="bg-white text-indigo-700 font-bold text-lg px-8 py-4 rounded-lg hover:bg-gray-100 transition flex items-center justify-center gap-3 shadow-lg"
            >
              View All Products
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to="/register"
              className="border-2 border-white text-white font-bold text-lg px-8 py-4 rounded-lg hover:bg-white hover:text-indigo-700 transition text-center"
            >
              Get Started Free
            </Link>
          </div>

          {/* Small Stats */}
          <div className="mt-12 grid grid-cols-3 gap-6 text-white">
            <div className="text-center">
              <h3 className="text-3xl font-bold">500+</h3>
              <p className="text-sm">Factories</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold">50K+</h3>
              <p className="text-sm">Orders</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold">24/7</h3>
              <p className="text-sm">Support</p>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center"
        >
          <img
            src={bannerImg2}
            alt="Garments Factory Dashboard"
            className="rounded-2xl shadow-2xl w-full max-w-lg border-8 border-white/20"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBanner;