import { motion } from "framer-motion";
import { Send, ArrowRight } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="py-20 md:py-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-indigo-950/60 dark:to-purple-950/40 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center lg:items-start">
          {/* Left - Header & Description */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:w-1/2 text-center lg:text-left"
          >
            <span className="inline-block px-5 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-medium tracking-wider mb-6">
              NEWSLETTER
            </span>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-6 leading-tight">
              Stay Ahead of the Garment Industry
            </h2>

            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Receive exclusive production insights, new feature announcements, market trends, and industry reports — delivered straight to your inbox.
            </p>
          </motion.div>

          {/* Right - Form & Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:w-1/2 w-full"
          >
            <div
              className={`
                relative 
                bg-white/70 dark:bg-gray-800/40 
                backdrop-blur-xl 
                rounded-2xl 
                p-8 md:p-10 
                shadow-2xl dark:shadow-indigo-950/30
                border border-white/50 dark:border-gray-700/50
              `}
            >
              <form className="relative">
                <input
                  type="email"
                  placeholder="your.work@email.com"
                  className={`
                    w-full bg-transparent 
                    border-b-2 border-gray-300/70 dark:border-gray-600/70 
                    py-6 pr-16 
                    text-xl md:text-2xl font-bold 
                    tracking-tight text-gray-900 dark:text-white 
                    placeholder:text-gray-400 dark:placeholder:text-gray-600
                    focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400
                    transition-all duration-300
                  `}
                  required
                />

                <button
                  type="submit"
                  className={`
                    absolute right-0 bottom-5 
                    p-4 rounded-full 
                    bg-gradient-to-br from-indigo-600 to-purple-700 
                    text-white shadow-lg
                    hover:from-indigo-700 hover:to-purple-800
                    hover:scale-110 active:scale-95
                    transition-all duration-300
                  `}
                >
                  <ArrowRight size={24} strokeWidth={2.5} />
                </button>
              </form>

              {/* Subscribers count + avatars */}
              <div className="mt-10 flex items-center gap-5">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-900 overflow-hidden shadow-md"
                    >
                      <img
                        src={`https://i.pravatar.cc/100?img=${i + 20}`}
                        alt="subscriber"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
                    5,000+
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 tracking-wide">
                    Industry professionals already joined
                  </p>
                </div>
              </div>

              {/* Privacy note */}
              <p className="mt-8 text-xs text-gray-500 dark:text-gray-600 text-center lg:text-left leading-relaxed">
                We respect your privacy • No spam • Unsubscribe anytime
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;