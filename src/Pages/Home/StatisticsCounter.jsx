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
                <CountUp end={stat.number} suffix={stat.suffix} duration={2.5} enableScrollSpy scrollSpyDelay={200} />
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
