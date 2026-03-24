// import { motion } from "framer-motion";
// import Marquee from "react-fast-marquee";
// import { Zap, Truck, Shield, Leaf, HeadphonesIcon, Award } from "lucide-react";

// const WhyChooseUs = () => {
//   const features = [
//     { icon: <Zap />, title: "Real-Time Dashboard", desc: "Track every order stage live" },
//     { icon: <Truck />, title: "On-Time Delivery", desc: "99% delivery success rate" },
//     { icon: <Shield />, title: "Secure Payments", desc: "Multiple safe payment options" },
//     { icon: <Leaf />, title: "Sustainable Options", desc: "Eco-friendly fabrics available" },
//     { icon: <HeadphonesIcon />, title: "24/7 Support", desc: "Dedicated manager for every client" },
//     { icon: <Award />, title: "Premium Quality", desc: "AQL 2.5 standard guaranteed" },
//   ];

//   return (
//     <section className="py-12 md:py-16 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-indigo-950/40 dark:to-purple-950/30">
//       <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           className="text-center mb-16 md:mb-20"
//         >
//           <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-4">
//             Why Global Buyers Trust Us
//           </h2>
//           <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
//             Join 500+ factories growing faster with our platform
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
//           {features.map((f, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.08, duration: 0.5 }}
//               whileHover={{ y: -8, scale: 1.02 }}
//               className={`
//                 bg-white/70 dark:bg-gray-800/40 
//                 backdrop-blur-lg 
//                 rounded-2xl p-7 sm:p-8 
//                 shadow-xl dark:shadow-2xl dark:shadow-indigo-900/20
//                 border border-white/50 dark:border-gray-700/60
//                 hover:shadow-2xl hover:dark:shadow-indigo-700/30 
//                 transition-all duration-300
//               `}
//             >
//               <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 rounded-2xl flex items-center justify-center text-white mb-6">
//                 {f.icon}
//               </div>
//               <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">{f.title}</h3>
//               <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{f.desc}</p>
//             </motion.div>
//           ))}
//         </div>

//         <div className="mt-16 md:mt-20 overflow-hidden">
//           <Marquee gradient={false} speed={70} pauseOnHover>
//             <div className="flex gap-16 sm:gap-20 text-lg sm:text-xl font-bold text-indigo-700 dark:text-indigo-300 tracking-wide">
//               <span>Live Production Tracking</span> • <span>500+ Active Factories</span> •{" "}
//               <span>50K+ Orders Delivered</span> • <span>24/7 Support</span> • <span>GRS Certified Options</span> •{" "}
//               <span>100% Transparency</span>
//             </div>
//           </Marquee>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhyChooseUs;

import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import { Zap, Truck, Shield, Leaf, HeadphonesIcon, Award, ArrowUpRight } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    { 
      icon: <Zap className="w-8 h-8" />, 
      title: "Real-Time Dashboard", 
      desc: "Track every order stage live with AI-driven precision.",
      className: "md:col-span-2 md:row-span-1",
      gradient: "from-indigo-500 to-blue-500" 
    },
    { 
      icon: <Truck className="w-8 h-8" />, 
      title: "On-Time Delivery", 
      desc: "99% success rate.",
      className: "md:col-span-1 md:row-span-1",
      gradient: "from-emerald-500 to-teal-500" 
    },
    { 
      icon: <Shield className="w-8 h-8" />, 
      title: "Secure Payments", 
      desc: "Enterprise-grade encryption for every transaction.",
      className: "md:col-span-1 md:row-span-2",
      gradient: "from-purple-600 to-pink-600" 
    },
    { 
      icon: <Leaf className="w-8 h-8" />, 
      title: "Sustainable Options", 
      desc: "Eco-friendly fabrics and GRS certified materials.",
      className: "md:col-span-1 md:row-span-1",
      gradient: "from-green-500 to-emerald-600" 
    },
    { 
      icon: <HeadphonesIcon className="w-8 h-8" />, 
      title: "24/7 Support", 
      desc: "Dedicated manager for every client worldwide.",
      className: "md:col-span-1 md:row-span-1",
      gradient: "from-orange-500 to-red-500" 
    },
    { 
      icon: <Award className="w-8 h-8" />, 
      title: "Premium Quality", 
      desc: "AQL 2.5 standard guaranteed in every shipment.",
      className: "md:col-span-2 md:row-span-1",
      gradient: "from-blue-600 to-indigo-700" 
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#030712] transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Modern Minimalist Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="text-indigo-600 dark:text-indigo-400 font-bold tracking-[0.3em] uppercase text-sm mb-4 block">
              Why Choose Our Platform
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
              Trusted by <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                Industry Leaders
              </span>
            </h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-slate-500 dark:text-slate-400 text-lg md:text-xl max-w-xs font-medium"
          >
            Join 500+ global factories growing faster with our enterprise-grade infrastructure.
          </motion.p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className={`group relative overflow-hidden rounded-[2.5rem] p-8 md:p-10 border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-xl transition-all duration-500 ${f.className}`}
            >
              {/* Animated Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-white shadow-lg mb-8 group-hover:scale-110 transition-transform duration-500`}>
                    {f.icon}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                    {f.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    {f.desc}
                  </p>
                </div>

                <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400">
                  LEARN MORE <ArrowUpRight size={16} />
                </div>
              </div>

              {/* Decorative Accent */}
              <div className="absolute top-[-20%] right-[-20%] w-40 h-40 bg-white/10 dark:bg-white/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-colors" />
            </motion.div>
          ))}
        </div>

        {/* Premium Marquee */}
        <div className="mt-24 py-12 border-y border-slate-100 dark:border-slate-800">
          <Marquee gradient={false} speed={80} pauseOnHover>
            <div className="flex gap-20 text-sm font-black text-slate-400 dark:text-slate-600 tracking-[0.4em] uppercase">
              <span>Live Production Tracking</span>
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <span>500+ Active Factories</span>
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              <span>50K+ Orders Delivered</span>
              <span className="w-2 h-2 rounded-full bg-pink-500" />
              <span>GRS Certified Options</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>100% Transparency</span>
            </div>
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;