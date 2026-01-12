import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-50/80 via-purple-50/80 to-pink-50/80 dark:from-gray-950/90 dark:via-indigo-950/90 dark:to-purple-950/90 flex items-center justify-center z-50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative flex flex-col items-center gap-6"
      >
        {/* Outer glowing ring */}
        <div className="relative w-28 h-28 md:w-36 md:h-36">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-4 border-t-transparent border-l-indigo-500 border-r-purple-500 border-b-pink-500 shadow-[0_0_40px_rgba(99,102,241,0.5)] dark:shadow-[0_0_60px_rgba(99,102,241,0.4)]"
          />

          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-4 rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 shadow-lg shadow-indigo-500/40 dark:shadow-purple-500/40"
          />

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <div className="absolute top-0 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg shadow-indigo-500/60" />
          </motion.div>
        </div>

        {/* Brand Name + Loading Text */}
        <div className="text-center space-y-2">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-wide"
          >
            Garments Tracker
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="text-lg font-medium text-gray-700 dark:text-gray-300"
          >
            Loading your experience...
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;
