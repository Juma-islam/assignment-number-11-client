import { motion } from 'framer-motion';
import { FaShoppingCart, FaCut, FaSitemap, FaTruck } from 'react-icons/fa'; // Use react-icons for icons

const HowItWorks = () => {
  const steps = [
    { icon: <FaShoppingCart />, title: 'Place Order', desc: 'Browse products and book your order seamlessly.' },
    { icon: <FaCut />, title: 'Production Starts', desc: 'Cutting, sewing, and finishing with real-time tracking.' },
    { icon: <FaSitemap />, title: 'Quality Check', desc: 'Rigorous QC to ensure top-notch garments.' },
    { icon: <FaTruck />, title: 'Delivery', desc: 'Shipped on time with live updates.' },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-teal-50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center text-teal-800 mb-12"
        >
          How It Works
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="text-5xl text-teal-500 mb-4"
              >
                {step.icon}
              </motion.div>
              <h3 className="text-2xl font-semibold text-teal-700 mb-2">{step.title}</h3>
              <p className="text-gray-600 text-center">{step.desc}</p>
              {index < steps.length - 1 && (
                <div className="hidden md:block w-full h-1 bg-teal-200 mt-4" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;