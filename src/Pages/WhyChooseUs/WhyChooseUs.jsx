import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import { Zap, Truck, Shield, Leaf, HeadphonesIcon, Award } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    { icon: <Zap />, title: "Real-Time Dashboard", desc: "Track every order stage live" },
    { icon: <Truck />, title: "On-Time Delivery", desc: "99% delivery success rate" },
    { icon: <Shield />, title: "Secure Payments", desc: "Multiple safe payment options" },
    { icon: <Leaf />, title: "Sustainable Options", desc: "Eco-friendly fabrics available" },
    { icon: <HeadphonesIcon />, title: "24/7 Support", desc: "Dedicated manager for every client" },
    { icon: <Award />, title: "Premium Quality", desc: "AQL 2.5 standard guaranteed" },
  ];

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-indigo-950/40 dark:to-purple-950/30">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-4">
            Why Global Buyers Trust Us
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
            Join 500+ factories growing faster with our platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`
                bg-white/70 dark:bg-gray-800/40 
                backdrop-blur-lg 
                rounded-2xl p-7 sm:p-8 
                shadow-xl dark:shadow-2xl dark:shadow-indigo-900/20
                border border-white/50 dark:border-gray-700/60
                hover:shadow-2xl hover:dark:shadow-indigo-700/30 
                transition-all duration-300
              `}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 rounded-2xl flex items-center justify-center text-white mb-6">
                {f.icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">{f.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 md:mt-20 overflow-hidden">
          <Marquee gradient={false} speed={70} pauseOnHover>
            <div className="flex gap-16 sm:gap-20 text-lg sm:text-xl font-bold text-indigo-700 dark:text-indigo-300 tracking-wide">
              <span>Live Production Tracking</span> • <span>500+ Active Factories</span> •{" "}
              <span>50K+ Orders Delivered</span> • <span>24/7 Support</span> • <span>GRS Certified Options</span> •{" "}
              <span>100% Transparency</span>
            </div>
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

