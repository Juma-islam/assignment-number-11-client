// import { motion, useInView } from "framer-motion";
// import { useRef } from "react";
// import CountUp from "react-countup";

// const stats = [
//   { number: 500, label: "Active Factories", suffix: "+" },
//   { number: 50000, label: "Orders Delivered", suffix: "+" },
//   { number: 98, label: "Satisfaction Rate", suffix: "%" },
//   { number: 24, label: "Support Hours", suffix: "/7" },
// ];

// const StatisticsCounter = () => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true });

//   return (
//     <section ref={ref} className="py-20 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
//           {stats.map((stat, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 30 }}
//               animate={isInView ? { opacity: 1, y: 0 } : {}}
//               transition={{ delay: i * 0.2 }}
//               className="p-8"
//             >
//               <h3 className="text-5xl md:text-6xl font-extrabold">
//                 <CountUp end={stat.number} suffix={stat.suffix} duration={2.5} enableScrollSpy />
//               </h3>
//               <p className="text-xl mt-4 opacity-90">{stat.label}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default StatisticsCounter;

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CountUp from "react-countup";

const stats = [
  { number: 500, label: "Active Factories", suffix: "+" },
  { number: 50000, label: "Orders Delivered", suffix: "+" },
  { number: 98, label: "Satisfaction Rate", suffix: "%" },
  { number: 24, label: "Support Hours", suffix: "/7" },
];

const StatisticsCounter = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className={`
        py-16 md:py-20 
        bg-gradient-to-r 
        from-indigo-600 to-purple-700 
        dark:from-indigo-950 dark:to-purple-950
        text-white dark:text-gray-100
      `}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              className={`
                p-6 sm:p-8 md:p-10 
                rounded-2xl 
                bg-white/10 dark:bg-white/5 
                backdrop-blur-sm 
                border border-white/20 dark:border-white/10
                shadow-lg dark:shadow-indigo-950/30
              `}
            >
              <h3
                className={`
                  text-4xl sm:text-5xl md:text-6xl 
                  font-extrabold 
                  bg-gradient-to-r 
                  from-white via-indigo-200 to-white 
                  dark:from-indigo-300 dark:via-purple-300 dark:to-indigo-300
                  bg-clip-text text-transparent
                `}
              >
                <CountUp
                  end={stat.number}
                  suffix={stat.suffix}
                  duration={2.5}
                  enableScrollSpy
                  scrollSpyDelay={200}
                />
              </h3>

              <p
                className={`
                  text-lg sm:text-xl 
                  mt-4 
                  font-medium 
                  text-indigo-100 dark:text-indigo-200 
                  opacity-90 dark:opacity-85
                `}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsCounter;

// import { motion, useInView } from "framer-motion";
// import { useRef } from "react";
// import CountUp from "react-countup";

// const stats = [
//   { number: 500, label: "Active Factories", suffix: "+", desc: "Trusted manufacturing partners" },
//   { number: 50000, label: "Orders Delivered", suffix: "+", desc: "Successful bulk shipments" },
//   { number: 98, label: "Satisfaction Rate", suffix: "%", desc: "Positive buyer feedback" },
//   { number: 24, label: "Support Hours", suffix: "/7", desc: "Dedicated account managers" },
// ];

// const StatisticsCounter = () => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, amount: 0.3 });

//   return (
//     <section 
//       ref={ref} 
//       className="py-24 bg-white dark:bg-[#0a0a0a] transition-colors duration-500 border-y border-gray-100 dark:border-zinc-800 overflow-hidden"
//     >
//       <div className="max-w-7xl mx-auto px-6">
        
//         {/* Section Title - Minimalist Style */}
//         <div className="mb-16 text-center md:text-left">
//            <span className="text-xs tracking-[0.4em] font-bold text-indigo-600 dark:text-indigo-400 uppercase mb-4 block">
//               Growth Statistics
//            </span>
//            <h2 className="text-3xl md:text-5xl font-serif font-black text-gray-900 dark:text-white uppercase leading-tight">
//              Impact by the <br className="hidden md:block"/> numbers
//            </h2>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-l border-gray-100 dark:border-zinc-800">
//           {stats.map((stat, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0 }}
//               animate={isInView ? { opacity: 1 } : {}}
//               transition={{ delay: i * 0.1, duration: 0.8 }}
//               className="p-10 border-r border-b border-gray-100 dark:border-zinc-800 group hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-all"
//             >
//               {/* Counter */}
//               <div className="flex flex-col gap-2">
//                 <h3 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 dark:text-white tracking-tighter">
//                   {isInView && (
//                     <CountUp 
//                       end={stat.number} 
//                       suffix={stat.suffix} 
//                       duration={3} 
//                       useEasing={true}
//                     />
//                   )}
//                 </h3>
                
//                 <div className="h-1 w-12 bg-indigo-600 dark:bg-indigo-500 transition-all group-hover:w-24 mb-2" />
                
//                 <p className="text-lg font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wide">
//                   {stat.label}
//                 </p>
                
//                 <p className="text-sm text-gray-500 dark:text-zinc-500 font-medium">
//                   {stat.desc}
//                 </p>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Bottom Decorative Line */}
//         <motion.div 
//           initial={{ scaleX: 0 }}
//           animate={isInView ? { scaleX: 1 } : {}}
//           transition={{ duration: 1.5, ease: "circOut" }}
//           className="h-px w-full bg-gradient-to-r from-transparent via-indigo-600 to-transparent mt-20 opacity-30"
//         />
//       </div>
//     </section>
//   );
// };

// export default StatisticsCounter;