
import { motion } from "framer-motion";
import { FaShoppingCart, FaCut, FaClipboardCheck, FaTruck } from "react-icons/fa";

const steps = [
  {
    icon: <FaShoppingCart />,
    number: "01",
    title: "Place Order",
    desc: "Browse collections, select styles & place bulk orders in minutes with instant confirmation.",
  },
  {
    icon: <FaCut />,
    number: "02",
    title: "Production Starts",
    desc: "Cutting → Sewing → Printing with real-time stage updates and photo documentation.",
  },
  {
    icon: <FaClipboardCheck />,
    number: "03",
    title: "Quality Control",
    desc: "Multi-stage QC checkpoints, AQL 2.5 inspection & final approval before packing.",
  },
  {
    icon: <FaTruck />,
    number: "04",
    title: "Shipping & Tracking",
    desc: "Global delivery with live tracking, ETA updates & proof of delivery.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 md:py-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-indigo-950/60 dark:to-purple-950/40 transition-colors duration-500">
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
            SIMPLE & TRANSPARENT PROCESS
          </span>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-6">
            From Order to Doorstep
          </h2>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A streamlined 4-step journey designed for speed, quality, and complete transparency.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7 }}
              whileHover={{ y: -10, scale: 1.03 }}
              className={`
                relative 
                bg-white/70 dark:bg-gray-800/40 
                backdrop-blur-xl 
                rounded-2xl 
                p-8 
                shadow-xl dark:shadow-2xl dark:shadow-indigo-950/30
                border border-white/50 dark:border-gray-700/50
                hover:shadow-2xl hover:dark:shadow-indigo-700/40
                transition-all duration-400
                overflow-hidden
                group
              `}
            >
              {/* Decorative number background */}
              <div className="absolute -top-6 -right-6 text-[8rem] font-black text-indigo-500/10 dark:text-indigo-400/10 group-hover:text-indigo-500/20 dark:group-hover:text-indigo-400/20 transition-colors pointer-events-none">
                {step.number}
              </div>

              {/* Icon */}
              <div className="w-16 h-16 mb-7 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-400">
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                {step.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {step.desc}
              </p>

              {/* Subtle arrow indicator on hover */}
              <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  →
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Optional small footer text */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-600 tracking-wide">
            Every step is monitored • 100% Transparency • Dedicated Support
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;