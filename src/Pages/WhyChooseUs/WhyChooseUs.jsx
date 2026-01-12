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
//     <section className="py-10 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
//       <div className="max-w-7xl mx-auto px-6">
//         <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-20">
//           <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
//             Why Global Buyers Trust Us
//           </h2>
//           <p className="text-xl text-gray-600">Join 500+ factories growing faster with our platform</p>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//           {features.map((f, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.1 }}
//               whileHover={{ y: -10 }}
//               className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all"
//             >
//               <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-6">
//                 {f.icon}
//               </div>
//               <h3 className="text-2xl font-bold text-gray-800 mb-3">{f.title}</h3>
//               <p className="text-gray-600">{f.desc}</p>
//             </motion.div>
//           ))}
//         </div>

//         <Marquee gradient={false} speed={70} className="mt-20">
//           <div className="flex gap-20 text-xl font-bold text-indigo-700">
//             <span>Live Production Tracking</span> • <span>500+ Active Factories</span> •{" "}
//             <span>50K+ Orders Delivered</span> • <span>24/7 Support</span> • <span>GRS Certified Options</span> •{" "}
//             <span>100% Transparency</span>
//           </div>
//         </Marquee>
//       </div>
//     </section>
   
//   );
// };

// export default WhyChooseUs;


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
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                {f.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 md:mt-20 overflow-hidden">
          <Marquee gradient={false} speed={70} pauseOnHover>
            <div className="flex gap-16 sm:gap-20 text-lg sm:text-xl font-bold text-indigo-700 dark:text-indigo-300 tracking-wide">
              <span>Live Production Tracking</span> • <span>500+ Active Factories</span> •{" "}
              <span>50K+ Orders Delivered</span> • <span>24/7 Support</span> •{" "}
              <span>GRS Certified Options</span> • <span>100% Transparency</span>
            </div>
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;



// import { motion } from "framer-motion";
// import Marquee from "react-fast-marquee";
// import { Zap, Truck, Shield, Leaf, HeadphonesIcon, Award } from "lucide-react";

// const WhyChooseUs = () => {
//   const features = [
//     { icon: <Zap size={24} />, title: "Real-Time Dashboard", desc: "Track every order stage live from cutting to delivery." },
//     { icon: <Truck size={24} />, title: "On-Time Delivery", desc: "Our 99% success rate ensures your shipments are never late." },
//     { icon: <Shield size={24} />, title: "Secure Payments", desc: "Multiple safe payment gateways for global transactions." },
//     { icon: <Leaf size={24} />, title: "Sustainable Options", desc: "Access GRS certified and eco-friendly fabric catalogs." },
//     { icon: <HeadphonesIcon size={24} />, title: "24/7 Support", desc: "A dedicated manager assigned to every single client." },
//     { icon: <Award size={24} />, title: "Premium Quality", desc: "Maintaining international AQL 2.5 quality standards." },
//   ];

//   return (
//     <section className="py-24 bg-white dark:bg-[#050505] transition-colors duration-500 overflow-hidden">
//       <div className="max-w-7xl mx-auto px-6">
        
//         <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
//           <motion.div 
//             initial={{ opacity: 0, x: -30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//             className="max-w-2xl"
//           >
//             <span className="text-xs tracking-[0.4em] font-bold text-indigo-600 dark:text-indigo-400 uppercase mb-4 block">
//               Our Excellence
//             </span>
//             <h2 className="text-4xl md:text-6xl font-serif font-black text-gray-900 dark:text-white leading-tight">
//               WHY GLOBAL BUYERS <br /> TRUST OUR SYSTEM
//             </h2>
//           </motion.div>
          
//           <motion.p 
//              className="text-gray-500 dark:text-zinc-400 text-lg max-w-xs md:text-right border-l-2 md:border-l-0 md:border-r-2 border-indigo-600 px-4"
//           >
//             Empowering 500+ factories with precision tracking and transparency.
//           </motion.p>
//         </div>

//         {/* Grid Section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-gray-100 dark:border-zinc-800">
//           {features.map((f, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.1 }}
//               className="group p-10 border-r border-b border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-all duration-500"
//             >
//               <div className="w-12 h-12 flex items-center justify-center text-gray-400 dark:text-zinc-600 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:scale-110 transition-all duration-300 mb-8">
//                 {f.icon}
//               </div>
//               <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 tracking-tight uppercase">
//                 {f.title}
//               </h3>
//               <p className="text-gray-500 dark:text-zinc-500 leading-relaxed text-sm">
//                 {f.desc}
//               </p>
//             </motion.div>
//           ))}
//         </div>

//         {/* Marquee Section */}
//         <div className="mt-24 border-y border-gray-100 dark:border-zinc-800 py-8 bg-gray-50/50 dark:bg-zinc-900/20">
//           <Marquee gradient={false} speed={50}>
//             <div className="flex gap-16 text-xs tracking-[0.3em] font-bold text-gray-400 dark:text-zinc-500 uppercase items-center">
//               {[ "Live Production Tracking", "500+ Active Factories", "50K+ Orders Delivered", "24/7 Support", "GRS Certified Options"].map((text, idx) => (
//                 <span key={idx} className="flex items-center gap-2">
//                   {text} <div className="w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full"/>
//                 </span>
//               ))}
//             </div>
//           </Marquee>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhyChooseUs;