
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Activity, Zap } from "lucide-react";
import { Link } from "react-router";

// Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

const sliderData = [
  {
    id: 1,
    title: "SMART TRACKING\nFOR GARMENTS",
    description: "Monitor every production stage from cutting to final packaging in real-time.",
    image: "https://images.unsplash.com/photo-1555529771-835f59fc5efe?q=80&w=2000",
    tag: "PRODUCTION"
  },
  {
    id: 2,
    title: "EFFICIENT ORDER\nMANAGEMENT",
    description: "Keep track of bulk orders, shipment dates, and buyer requirements seamlessly.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070",
    tag: "ORDERS"
  },
  {
    id: 3,
    title: "INVENTORY &\nSTOCK CONTROL",
    description: "Never face material shortages. Manage your fabrics and accessories stock smartly.",
    image: "https://i.ibb.co.com/jkQrGzh2/image.png",
    tag: "INVENTORY"
  },
  {
    id: 4,
    title: "QUALITY ASSURANCE\nSYSTEM",
    description: "Ensure international standards with digital QC checkpoints and reporting.",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2000",
    tag: "QUALITY"
  }
];

const HeroBanner = () => {
  return (
    <section className="relative min-h-[90vh] bg-[#f8fafc] dark:bg-[#020617] flex items-center justify-center p-4 md:p-8 transition-colors duration-500 overflow-hidden">
      
      {/* Background Ambient Glows - Professional touch */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative w-full max-w-7xl h-[650px] md:h-[700px] bg-white dark:bg-slate-900 shadow-2xl rounded-3xl overflow-hidden border border-gray-100 dark:border-slate-800">
        
        <Swiper
          effect={"fade"}
          speed={800}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true, el: '.custom-pagination' }}
          navigation={{ nextEl: '.next-btn', prevEl: '.prev-btn' }}
          modules={[Autoplay, EffectFade, Pagination, Navigation]}
          className="h-full w-full"
        >
          {sliderData.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="flex flex-col md:flex-row h-full">
                
                {/* Content Side */}
                <div className="w-full md:w-[55%] p-10 md:p-16 lg:p-20 flex flex-col justify-center relative z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold tracking-[0.3em] uppercase mb-6">
                      <Zap size={14} /> {slide.tag} SYSTEM
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-6 whitespace-pre-line">
                      <span className="text-slate-900 dark:text-white">
                        {slide.title.split('\n')[0]}
                      </span>
                      <br />
                      <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                        {slide.title.split('\n')[1]}
                      </span>
                    </h1>

                    <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg mb-10 max-w-md leading-relaxed">
                      {slide.description}
                    </p>

                    <div className="flex flex-wrap gap-4">
                      <Link 
                        to="/allProducts" 
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold px-8 py-4 rounded-xl hover:shadow-[0_10px_20px_rgba(79,70,229,0.3)] transition-all active:scale-95"
                      >
                        Get Started <ArrowRight size={18} />
                      </Link>
                      
                      <button className="px-8 py-4 rounded-xl font-bold border border-gray-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all">
                        Watch Demo
                      </button>
                    </div>
                  </motion.div>
                </div>

                {/* Image Side with Premium Masking */}
                <div className="w-full md:w-[45%] relative overflow-hidden h-[300px] md:h-auto group">
                  <div className="absolute inset-0 z-10 hidden md:block">
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-24 fill-white dark:fill-slate-900 transition-colors duration-500">
                      <path d="M0 0 C 40 50, 40 50, 0 100 L 0 100 L 0 0 Z" transform="translate(100, 0) scale(-1, 1)" />
                    </svg>
                  </div>
                  
                  {/* Subtle Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                  
                  <motion.img 
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                    src={slide.image} 
                    alt={slide.tag} 
                    className="absolute inset-0 w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-700" 
                  />
                  
                  {/* Floating Mini Card - Gorgeous Detail */}
                  <div className="absolute bottom-6 right-6 z-20 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl hidden lg:block shadow-2xl">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                           <Activity size={20} />
                        </div>
                        <div>
                           <p className="text-[10px] font-bold text-white/60 uppercase">Real-time status</p>
                           <p className="text-sm font-bold text-white tracking-wide">Active Monitoring</p>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Professional Controls Overlay */}
        <div className="absolute bottom-8 left-10 md:left-20 z-30 flex items-center gap-10">
           <div className="flex items-center gap-3">
              <button className="prev-btn w-10 h-10 flex items-center justify-center border border-gray-200 dark:border-slate-700 rounded-full hover:bg-indigo-600 hover:border-indigo-600 hover:text-white transition-all text-slate-500 dark:text-slate-400">
                <ChevronLeft size={20} />
              </button>
              <button className="next-btn w-10 h-10 flex items-center justify-center border border-gray-200 dark:border-slate-700 rounded-full hover:bg-indigo-600 hover:border-indigo-600 hover:text-white transition-all text-slate-500 dark:text-slate-400">
                <ChevronRight size={20} />
              </button>
           </div>
           
           {/* Modern Pagination Bar */}
           <div className="custom-pagination !static !w-auto"></div>
        </div>

        {/* Enterprise Badge */}
        <div className="absolute top-8 right-8 z-30 hidden lg:block">
           <span className="text-[10px] font-black text-slate-400 tracking-[0.5em] uppercase border-r border-slate-300 dark:border-slate-700 pr-4 mr-4">Enterprise Edition</span>
           <span className="text-[10px] font-black text-slate-400 tracking-[0.5em] uppercase">v.4.0</span>
        </div>

      </div>

      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 6px;
          height: 6px;
          background: #94a3b8 !important;
          opacity: 0.5;
          transition: all 0.3s;
          margin: 0 4px !important;
        }
        .swiper-pagination-bullet-active {
          width: 24px;
          border-radius: 4px;
          background: #6366f1 !important;
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default HeroBanner;