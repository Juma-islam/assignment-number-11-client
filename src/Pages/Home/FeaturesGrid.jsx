// import { motion } from "framer-motion";
// import { Database, BarChart3, Clock, ShieldCheck, Users, Globe, ArrowUpRight } from "lucide-react";

// const features = [
//   { icon: Database, title: "Centralized Inventory", desc: "All stock in one place with real-time updates and low-stock alerts." },
//   { icon: BarChart3, title: "Advanced Analytics", desc: "Detailed reports & production insights to optimize your factory floor." },
//   { icon: Clock, title: "Live Tracking", desc: "Minute-by-minute production stage monitoring from cutting to finishing." },
//   { icon: ShieldCheck, title: "Secure & Compliant", desc: "Enterprise-grade data encryption & GDPR compliant infrastructure." },
//   { icon: Users, title: "Multi-role Access", desc: "Dedicated dashboards for Admin, Managers, and International Buyers." },
//   { icon: Globe, title: "Global Reach", desc: "Seamless support for international shipments and multi-currency tracking." },
// ];

// const FeaturesGrid = () => {
//   return (
//     <section className="py-24 bg-white dark:bg-[#0a0a0a] transition-colors duration-500 overflow-hidden">
//       <div className="max-w-7xl mx-auto px-6">
        
//         {/* Header - Matching Hero Typography */}
//         <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
//           <motion.div 
//             initial={{ opacity: 0, x: -30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//             className="max-w-2xl"
//           >
//             <span className="text-xs tracking-[0.4em] font-bold text-indigo-600 dark:text-indigo-400 uppercase mb-4 block">
//               System Capabilities
//             </span>
//             <h2 className="text-4xl md:text-6xl font-serif font-black text-gray-900 dark:text-white uppercase leading-tight">
//               Powerful Features <br /> For Modern Factories
//             </h2>
//           </motion.div>
          
//           <motion.p 
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             className="text-gray-500 dark:text-zinc-400 text-lg max-w-xs md:text-right border-l-2 md:border-l-0 md:border-r-2 border-indigo-600 px-4"
//           >
//             A complete ecosystem designed to end production delays and scale operations.
//           </motion.p>
//         </div>

//         {/* Features Grid - Bordered & Minimalist */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-gray-100 dark:border-zinc-800">
//           {features.map((feature, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.1 }}
//               className="group relative p-10 border-r border-b border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-900/40 transition-all duration-500"
//             >
//               {/* Icon & Hover Effect */}
//               <div className="mb-8 relative">
//                 <div className="w-12 h-12 flex items-center justify-center text-gray-400 dark:text-zinc-600 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-all duration-300">
//                   <feature.icon size={32} strokeWidth={1.5} />
//                 </div>
//               </div>

//               {/* Text Content */}
//               <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight uppercase flex items-center justify-between">
//                 {feature.title}
//                 <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-600 dark:text-indigo-400" size={20} />
//               </h3>
              
//               <p className="text-gray-500 dark:text-zinc-500 leading-relaxed text-sm">
//                 {feature.desc}
//               </p>

//               {/* Decorative Corner Background (Subtle) */}
//               <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
//             </motion.div>
//           ))}
//         </div>

//         {/* Bottom Call to Action or Detail */}
//         <div className="mt-16 flex justify-center">
//             <p className="text-xs tracking-[0.2em] text-gray-400 dark:text-zinc-600 uppercase">
//                 Garments Production Tracker v2.0 • Enterprise Edition
//             </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturesGrid;
import { motion } from "framer-motion";
import { Database, BarChart3, Clock, ShieldCheck, Users, Globe, ArrowUpRight } from "lucide-react";

const features = [
  { icon: Database, title: "Centralized Inventory", desc: "All stock in one place with real-time updates and low-stock alerts." },
  { icon: BarChart3, title: "Advanced Analytics", desc: "Detailed reports & production insights to optimize your factory floor." },
  { icon: Clock, title: "Live Tracking", desc: "Minute-by-minute production stage monitoring from cutting to finishing." },
  { icon: ShieldCheck, title: "Secure & Compliant", desc: "Enterprise-grade data encryption & GDPR compliant infrastructure." },
  { icon: Users, title: "Multi-role Access", desc: "Dedicated dashboards for Admin, Managers, and International Buyers." },
  { icon: Globe, title: "Global Reach", desc: "Seamless support for international shipments and multi-currency tracking." },
];

const FeaturesGrid = () => {
  return (
    <section className="py-20 md:py-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-indigo-950/60 dark:to-purple-950/40 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-medium tracking-wide mb-4">
            POWERFUL FEATURES
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-5">
            Everything Modern Factories Need
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A complete production ecosystem designed to eliminate delays, increase transparency, and scale globally.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`
                group relative
                bg-white/70 dark:bg-gray-800/40 
                backdrop-blur-xl 
                rounded-2xl 
                p-8 
                shadow-xl dark:shadow-2xl dark:shadow-indigo-950/30
                border border-white/50 dark:border-gray-700/50
                hover:shadow-2xl hover:dark:shadow-indigo-700/40
                transition-all duration-400
              `}
            >
              {/* Icon */}
              <div className="w-14 h-14 mb-6 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 flex items-center justify-center text-white shadow-lg">
                <feature.icon size={28} strokeWidth={1.8} />
              </div>

              {/* Content */}
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                {feature.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.desc}
              </p>

              {/* Subtle hover indicator */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight size={20} className="text-indigo-500 dark:text-indigo-400" />
              </div>

              {/* Decorative gradient corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-transparent dark:from-indigo-400/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-600 tracking-wide">
            Garments Production Tracker • Enterprise Edition • 2025–2026
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;