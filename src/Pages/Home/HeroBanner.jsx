import { motion } from "framer-motion";
import bannerImage from '../../assets/bannerImage.jpg'
import { Link } from "react-router";

export default function HeroBanner() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gray-50 px-6 py-20">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-10 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Smart Garments Order & Production Tracking
          </h1>

          <p className="text-lg text-gray-600">
            Manage all your orders, production processes, and deliveries in one
            smart platform. Fast, simple, fully automated.
          </p>

            <Link to='/all-product' variant="outline" className="px-6 py-3 text-white rounded-md bg-gradient-to-tr from-[#14B8A6] to-[#7C3AED] hover:from-[#7C3AED] hover:to-[#14B8A6] transition-all duration-300 text-lg">
              All Product
            </Link>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full flex justify-center"
        >
          <img
            src={bannerImage}
            alt="Garments Factory"
            className="w-full max-w-md lg:max-w-lg drop-shadow-xl rounded-xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
