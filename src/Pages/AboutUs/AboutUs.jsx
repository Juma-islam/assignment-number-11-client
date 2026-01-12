
import { motion } from "framer-motion";
import { Factory, Globe, Target, HeartHandshake, Award, Sparkles } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-indigo-950/60 dark:to-purple-950/40 transition-colors duration-500">
      <title>About Us | Garments Tracker</title>

      {/* Hero Section - Premium Gradient & Glass Feel */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-block px-5 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-medium tracking-wider mb-6">
              OUR LEGACY
            </span>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent leading-tight mb-8">
              Redefining <br /> Production Intelligence
            </h1>

            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
              Empowering garment factories worldwide with smart, real-time management solutions that drive efficiency, transparency, and global success.
            </p>
          </motion.div>
        </div>

        {/* Subtle decorative overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.08)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.12)_0%,transparent_50%)] pointer-events-none" />
      </section>

      {/* Mission & Vision - Glassmorphic Cards */}
      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`
                bg-white/70 dark:bg-gray-800/40 
                backdrop-blur-xl 
                rounded-2xl 
                p-10 md:p-12 
                shadow-xl dark:shadow-2xl dark:shadow-indigo-950/30
                border border-white/50 dark:border-gray-700/50
                hover:shadow-2xl hover:dark:shadow-indigo-700/40
                transition-all duration-400
              `}
            >
              <div className="w-16 h-16 mb-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 flex items-center justify-center text-white shadow-lg">
                <Target size={32} />
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                To revolutionize garment production management by providing an intuitive, powerful platform that eliminates paperwork, boosts efficiency, and enables factories to deliver excellence on time.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`
                bg-white/70 dark:bg-gray-800/40 
                backdrop-blur-xl 
                rounded-2xl 
                p-10 md:p-12 
                shadow-xl dark:shadow-2xl dark:shadow-indigo-950/30
                border border-white/50 dark:border-gray-700/50
                hover:shadow-2xl hover:dark:shadow-indigo-700/40
                transition-all duration-400
              `}
            >
              <div className="w-16 h-16 mb-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 flex items-center justify-center text-white shadow-lg">
                <Globe size={32} />
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-6">
                Our Vision
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                A world where every garment factory operates with complete transparency, real-time insights, sustainable practices, and seamless global collaboration.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values - Grid with Hover Effects */}
      <section className="py-20 md:py-24 bg-gradient-to-br from-indigo-50/50 via-purple-50/50 to-pink-50/50 dark:from-gray-950/50 dark:via-indigo-950/50 dark:to-purple-950/50">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 md:mb-20"
          >
            <span className="inline-block px-5 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-medium tracking-wider mb-5">
              CORE VALUES
            </span>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-6">
              Our Guiding Principles
            </h2>

            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Born from real factory challenges, built to empower the future of global garment production.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { icon: <Sparkles size={32} />, title: "Innovation", desc: "Constantly evolving with cutting-edge tools to keep factories ahead in production technology." },
              { icon: <HeartHandshake size={32} />, title: "Reliability", desc: "Trusted worldwide for accurate, real-time tracking and unwavering on-time delivery assurance." },
              { icon: <Award size={32} />, title: "Excellence", desc: "Committed to unmatched quality, full transparency, and sustainable practices in every feature." },
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                whileHover={{ y: -10, scale: 1.03 }}
                className={`
                  bg-white/70 dark:bg-gray-800/40 
                  backdrop-blur-xl 
                  rounded-2xl 
                  p-10 
                  shadow-xl dark:shadow-2xl dark:shadow-indigo-950/30
                  border border-white/50 dark:border-gray-700/50
                  hover:shadow-2xl hover:dark:shadow-indigo-700/40
                  transition-all duration-400
                  flex flex-col items-center text-center
                `}
              >
                <div className="w-16 h-16 mb-6 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Reach - Premium Stat Highlight */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="inline-block px-10 py-12 md:px-16 md:py-16 rounded-3xl bg-white/50 dark:bg-gray-800/30 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 shadow-2xl"
          >
            <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-extrabold bg-gradient-to-r from-indigo-600 to-purple-700 dark:from-indigo-400 dark:to-purple-500 bg-clip-text text-transparent leading-none mb-4">
              500+
            </h2>
            <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
              Factories Globally Empowered
            </p>
          </motion.div>

          <p className="mt-12 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto italic leading-relaxed">
            "From the heart of Bangladesh to international retailers across Europe, USA, and beyond — we are proud to power the global garment supply chain with transparency and innovation."
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;