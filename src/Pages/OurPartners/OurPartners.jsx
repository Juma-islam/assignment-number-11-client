
import { motion } from "framer-motion";

const partners = [
  { name: "H&M", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/1024px-H%26M-Logo.svg.png" },
  { name: "Zara", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Zara_Logo.svg/1024px-Zara_Logo.svg.png" },
  { name: "Uniqlo", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/UNIQLO_logo.svg/1024px-UNIQLO_logo.svg.png" },
  { name: "Levi's", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Levi%27s_logo.svg/1024px-Levi%27s_logo.svg.png" },
  { name: "Nike", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/1024px-Logo_NIKE.svg.png" },
  { name: "Adidas", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/1024px-Adidas_Logo.svg.png" },
  { name: "Puma", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Puma_complete_logo.svg/1024px-Puma_complete_logo.svg.png" },
  { name: "Gap", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Gap_logo.svg/1024px-Gap_logo.svg.png" },
];

const OurPartners = () => {
  return (
    <section className="py-20 md:py-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-indigo-950/60 dark:to-purple-950/40 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header - Consistent modern style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-medium tracking-wider mb-5">
            GLOBAL NETWORK
          </span>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-6">
            Trusted by World-Class Brands
          </h2>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Proudly partnering with leading international fashion houses and retailers
          </p>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {partners.map((partner, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.04 }}
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
                flex flex-col items-center justify-center
              `}
            >
              <div className="h-20 w-full flex items-center justify-center mb-6">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className={`
                    max-h-14 max-w-[140px] object-contain 
                    transition-all duration-500
                    grayscale opacity-60 
                    group-hover:grayscale-0 group-hover:opacity-100
                    dark:invert dark:group-hover:invert-0
                  `}
                />
              </div>

              <span className="text-xs font-bold text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors tracking-wide">
                {partner.name}
              </span>

              {/* Subtle decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent dark:from-indigo-400/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl" />
            </motion.div>
          ))}
        </div>

        {/* Global Stat Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 md:mt-20 text-center"
        >
          <div className="inline-block px-8 py-6 rounded-2xl bg-white/50 dark:bg-gray-800/30 backdrop-blur-lg border border-white/30 dark:border-gray-700/30 shadow-xl">
            <p className="text-5xl sm:text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-700 dark:from-indigo-400 dark:to-purple-500 bg-clip-text text-transparent">
              150+
            </p>
            <p className="mt-3 text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300 tracking-wide">
              Partner Brands Worldwide
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurPartners;