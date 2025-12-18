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
    <section className="py-10 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Why Global Buyers Trust Us
          </h2>
          <p className="text-xl text-gray-600">Join 500+ factories growing faster with our platform</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-6">
                {f.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <Marquee gradient={false} speed={70} className="mt-20">
          <div className="flex gap-20 text-xl font-bold text-indigo-700">
            <span>Live Production Tracking</span> • <span>500+ Active Factories</span> •{" "}
            <span>50K+ Orders Delivered</span> • <span>24/7 Support</span> • <span>GRS Certified Options</span> •{" "}
            <span>100% Transparency</span>
          </div>
        </Marquee>
      </div>
    </section>
  );
};

export default WhyChooseUs;
