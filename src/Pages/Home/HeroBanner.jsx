
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
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
    <section className="relative min-h-[90vh] bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-indigo-950/70 dark:to-purple-950/50 flex items-center justify-center p-4 md:p-10 transition-colors duration-500">
      <div className="relative w-full max-w-7xl bg-white dark:bg-[#0a0a0a] shadow-2xl rounded-md overflow-hidden min-h-[600px] border dark:border-zinc-800">
        
        <Swiper
          spaceBetween={0}
          effect={"fade"}
          centeredSlides={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true, el: '.custom-pagination' }}
          navigation={{ nextEl: '.next-btn', prevEl: '.prev-btn' }}
          modules={[Autoplay, EffectFade, Pagination, Navigation]}
          className="h-full dark:border-gray-800/50 bg-white/40 dark:bg-gray-900/30 backdrop-blur-xl"
        >
          {sliderData.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="flex flex-col md:flex-row h-full min-h-[600px]">
                
                {/* Content Side */}
                <div className="w-full md:w-1/2 p-10 md:p-20 flex flex-col justify-center bg-white bg-gradient-to-br from-white/90 to-indigo-50/40 dark:from-gray-900/90 dark:to-indigo-950/60 backdrop-blur-md relative z-10 transition-colors duration-500">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <span className="text-xs tracking-[0.4em] font-bold text-indigo-600 dark:text-indigo-400 uppercase mb-4 block">
                      {slide.tag} CONTROL
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent leading-[1.1] mb-6 whitespace-pre-line">
                      {slide.title}
                    </h1>
                    <p className="text-gray-500 dark:text-zinc-400 text-lg mb-10 max-w-sm leading-relaxed">
                      {slide.description}
                    </p>
                    <div className="">
                      <Link 
                        to="/allProducts" 
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-500 dark:via-purple-500 dark:to-pink-500 text-white font-bold text-lg px-8 py-4 rounded-lg hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
                      >
                        Explore More 
                        <ArrowRight size={18} />
                      </Link>
                    </div>
                  </motion.div>
                </div>

                {/* Image Side */}
                <div className="w-full md:w-1/2 relative overflow-hidden h-[400px] md:h-auto">
                  {/* The Curve Shape - Colors change based on dark mode */}
                  <div className="absolute top-0 left-0 h-full w-24 z-20 hidden md:block">
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full fill-white dark:fill-[#0a0a0a] transition-colors duration-500">
                      <path d="M100 0 C 30 50, 30 50, 100 100 L 0 100 L 0 0 Z" />
                    </svg>
                  </div>
                  <img src={slide.image} alt={slide.tag} className="absolute inset-0 w-full h-full object-cover grayscale-[20%] dark:grayscale-[40%]" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Controls */}
        <div className="absolute bottom-10 left-10 md:left-20 z-30 flex items-center gap-8">
           <div className="flex items-center gap-4">
              <button className="prev-btn p-2 border border-gray-200 dark:border-zinc-800 rounded-full hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition text-gray-600 dark:text-gray-400">
                <ChevronLeft size={20} />
              </button>
              <button className="next-btn p-2 border border-gray-200 dark:border-zinc-800 rounded-full hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition text-gray-600 dark:text-gray-400">
                <ChevronRight size={20} />
              </button>
           </div>
           <div className="custom-pagination !static !w-auto dark:[&_.swiper-pagination-bullet]:bg-white"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;