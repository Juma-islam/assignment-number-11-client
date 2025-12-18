import { motion } from "framer-motion";
import { FaShoppingCart, FaCut, FaClipboardCheck, FaTruck } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaShoppingCart className="w-12 h-12" />,
      title: "Place Order",
      desc: "Select styles & place bulk orders in minutes",
    },
    {
      icon: <FaCut className="w-12 h-12" />,
      title: "Production Begins",
      desc: "Cutting, sewing & printing with live updates",
    },
    {
      icon: <FaClipboardCheck className="w-12 h-12" />,
      title: "Quality Assurance",
      desc: "Multiple QC checks before packing",
    },
    { icon: <FaTruck className="w-12 h-12" />, title: "Ship & Track", desc: "Real-time delivery tracking worldwide" },
  ];

  return (
    <section className="py-5 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl text-center font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-15"
        >
          How It Works
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
              {i < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-indigo-200 to-transparent -z-10"
                  style={{ width: "100%", left: "50%" }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
