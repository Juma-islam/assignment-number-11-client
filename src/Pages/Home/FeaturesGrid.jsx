import { motion } from "framer-motion";
import { Database, BarChart3, Clock, ShieldCheck, Users, Globe, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Database,
    title: "Centralized Inventory",
    desc: "All stock in one place with real-time updates and low-stock alerts.",
    color: "#6366f1", // Indigo
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    desc: "Detailed reports & production insights to optimize your factory floor.",
    color: "#a855f7", // Purple
  },
  {
    icon: Clock,
    title: "Live Tracking",
    desc: "Minute-by-minute production stage monitoring from cutting to finishing.",
    color: "#ec4899", // Pink
  },
  {
    icon: ShieldCheck,
    title: "Secure & Compliant",
    desc: "Enterprise-grade data encryption & GDPR compliant infrastructure.",
    color: "#10b981", // Emerald
  },
  {
    icon: Users,
    title: "Multi-role Access",
    desc: "Dedicated dashboards for Admin, Managers, and International Buyers.",
    color: "#3b82f6", // Blue
  },
  {
    icon: Globe,
    title: "Global Reach",
    desc: "Seamless support for international shipments and multi-currency tracking.",
    color: "#f59e0b", // Amber
  },
];

const FeatureItem = ({ feature, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.7, ease: "circOut" }}
    className="group relative"
  >
    {/* Animated Border Beam - Pro Look */}
    <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-700 rounded-[2rem] group-hover:via-indigo-500 transition-all duration-1000" />
    
    <div className="relative h-full bg-white/40 dark:bg-gray-900/40 backdrop-blur-2xl rounded-[2rem] p-10 border border-white/20 dark:border-white/5 overflow-hidden transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:group-hover:shadow-[0_20px_50px_rgba(99,102,241,0.1)]">
      
      {/* Background Decorative Glow */}
      <div 
        className="absolute -right-10 -top-10 w-32 h-32 blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full"
        style={{ backgroundColor: feature.color }}
      />

      <div className="relative z-10">
        {/* Modern Icon Presentation */}
        <div className="relative inline-block mb-10">
          <div 
            className="absolute inset-0 blur-xl opacity-20 scale-150 rounded-full"
            style={{ backgroundColor: feature.color }}
          />
          <div 
            className="relative w-16 h-16 flex items-center justify-center rounded-2xl text-white shadow-2xl shadow-inner"
            style={{ background: `linear-gradient(135deg, ${feature.color}, #000000)` }}
          >
            <feature.icon size={30} strokeWidth={1.5} />
          </div>
        </div>

        <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
          {feature.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg mb-8 font-medium opacity-80 group-hover:opacity-100 transition-opacity">
          {feature.desc}
        </p>

        {/* Dynamic Link */}
        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-gray-400 group-hover:text-indigo-500 transition-colors cursor-pointer">
          Learn More <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
        </div>
      </div>
    </div>
  </motion.div>
);

const UltraGorgeousFeatures = () => {
  return (
    <section className="relative py-32 bg-[#fafafa] dark:bg-[#050505] overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/5 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 blur-[150px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* High-End Typography Header */}
        <div className="flex flex-col items-center text-center mb-28">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="px-6 py-2 rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm text-xs font-black tracking-[0.3em] uppercase mb-8 text-indigo-600 dark:text-indigo-400"
          >
            Next Generation Tech
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white tracking-tighter leading-none mb-10">
            Smart. Seamless.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              Future-Proof.
            </span>
          </h2>
          
          <p className="max-w-2xl text-xl text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
            Reimagining garments manufacturing with high-fidelity tracking and enterprise-grade intelligence.
          </p>
        </div>

        {/* The Grid - Extra Spacing for Luxury Look */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {features.map((f, i) => (
            <FeatureItem key={i} feature={f} index={i} />
          ))}
        </div>

        {/* Bottom Professional Badge */}
        <div className="mt-32 flex flex-col items-center border-t border-gray-200 dark:border-white/5 pt-16">
            <div className="flex gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
                <span className="text-2xl font-black tracking-tighter dark:text-white italic">GARMENTS_PRO</span>
                <span className="text-2xl font-black tracking-tighter dark:text-white italic">AI_DRIVEN</span>
                <span className="text-2xl font-black tracking-tighter dark:text-white italic">GLOBAL_TRUST</span>
            </div>
            <p className="mt-8 text-gray-400 text-xs font-bold tracking-[0.5em] uppercase">Enterprise Edition v3.0</p>
        </div>
      </div>
    </section>
  );
};

export default UltraGorgeousFeatures;