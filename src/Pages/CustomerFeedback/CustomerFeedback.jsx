// import { motion } from "framer-motion";
// import { useState, useEffect } from "react";
// import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

// const testimonials = [
//   {
//     id: 1,
//     name: "Rahim Ahmed",
//     role: "CEO, StyleX Fashion Ltd.",
//     company: "Dhaka, Bangladesh",
//     rating: 5,
//     comment:
//       "This platform has completely transformed our production tracking. Now we can monitor everything from order to delivery with just one click. Truly outstanding!",
//     avatar: "https://i.pravatar.cc/150?img=1",
//     verified: true,
//   },
//   {
//     id: 2,
//     name: "Fatema Akter",
//     role: "Production Manager",
//     company: "Moonlight Garments",
//     rating: 5,
//     comment:
//       "As a manager, my workload has reduced by 70%. Pending orders, tracking updates — everything is in one place. The UI is also incredibly beautiful and intuitive!",
//     avatar: "https://i.pravatar.cc/150?img=2",
//     verified: true,
//   },
//   {
//     id: 3,
//     name: "Karim Hossain",
//     role: "International Buyer",
//     company: "Sweden",
//     rating: 5,
//     comment:
//       "As an international buyer, I can track my orders in real-time with production stages and live location updates. Never seen such a professional system from Bangladesh before!",
//     avatar: "https://i.pravatar.cc/150?img=3",
//     verified: true,
//   },
//   {
//     id: 4,
//     name: "Sumaiya Islam",
//     role: "Owner, TrendyWear BD",
//     company: "Chattogram, Bangladesh",
//     rating: 5,
//     comment:
//       "No more paperwork in my factory. Everything is now digital. Customers are also very happy seeing real-time tracking. Thank you so much to the team!",
//     avatar: "https://i.pravatar.cc/150?img=4",
//     verified: true,
//   },
// ];

// const CustomerFeedback = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextTestimonial = () => {
//     setCurrentIndex((prev) => (prev + 1) % testimonials.length);
//   };

//   const prevTestimonial = () => {
//     setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
//   };

//   useEffect(() => {
//     const interval = setInterval(nextTestimonial, 6000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="py-10 px-4 bg-gradient-to-br from-slate-50 via-white to-indigo-50 overflow-hidden">
//       <div className="max-w-7xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
//             What Our Clients Say
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Trusted by over 500+ garment factories and international buyers worldwide
//           </p>
//         </motion.div>

//         <div className="relative">
//           <div className="flex items-center justify-center">
//             <motion.div
//               key={currentIndex}
//               initial={{ opacity: 0, x: 300 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -300 }}
//               transition={{ duration: 0.7, ease: "easeInOut" }}
//               className="relative max-w-5xl w-full"
//             >
//               <div className="absolute -top-10 -left-10 text-9xl text-indigo-100 opacity-30">
//                 <Quote className="w-48 h-48" />
//               </div>

//               <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-14 border border-gray-100 relative overflow-hidden">
//                 <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5" />

//                 <div className="relative z-10">
//                   <div className="flex items-center mb-6">
//                     {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
//                       <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1 }}>
//                         <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
//                       </motion.div>
//                     ))}
//                     <span className="ml-4 text-sm font-medium text-green-600 bg-green-50 px-4 py-1.5 rounded-full flex items-center gap-1">
//                       Verified Client
//                     </span>
//                   </div>

//                   <p className="text-2xl md:text-3xl font-medium text-gray-800 leading-relaxed mb-10 italic">
//                     "{testimonials[currentIndex].comment}"
//                   </p>

//                   <div className="flex items-center gap-6">
//                     <div className="relative">
//                       <img
//                         src={testimonials[currentIndex].avatar}
//                         alt={testimonials[currentIndex].name}
//                         className="w-20 h-20 rounded-full ring-4 ring-indigo-100 object-cover"
//                       />
//                       <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-2">
//                         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                           <path
//                             fillRule="evenodd"
//                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                             clipRule="evenodd"
//                           />
//                         </svg>
//                       </div>
//                     </div>
//                     <div>
//                       <h4 className="text-xl font-bold text-gray-900">{testimonials[currentIndex].name}</h4>
//                       <p className="text-indigo-600 font-medium">{testimonials[currentIndex].role}</p>
//                       <p className="text-sm text-gray-500">{testimonials[currentIndex].company}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>

//           <button
//             onClick={prevTestimonial}
//             className="absolute left-4 md:left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-2xl rounded-full p-4 backdrop-blur-sm transition-all hover:scale-110 z-10"
//             aria-label="Previous testimonial"
//           >
//             <ChevronLeft className="w-8 h-8 text-indigo-600" />
//           </button>
//           <button
//             onClick={nextTestimonial}
//             className="absolute right-4 md:right-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-2xl rounded-full p-4 backdrop-blur-sm transition-all hover:scale-110 z-10"
//             aria-label="Next testimonial"
//           >
//             <ChevronRight className="w-8 h-8 text-indigo-600" />
//           </button>

//           <div className="flex justify-center gap-3 mt-12">
//             {testimonials.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentIndex(index)}
//                 className={`transition-all duration-300 ${
//                   index === currentIndex
//                     ? "w-12 h-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
//                     : "w-3 h-3 bg-gray-300 rounded-full hover:bg-gray-500"
//                 }`}
//                 aria-label={`Go to testimonial ${index + 1}`}
//               />
//             ))}
//           </div>
//         </div>

//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8, delay: 0.4 }}
//           className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 text-center"
//         >
//           {[
//             { number: "500+", label: "Happy Factories" },
//             { number: "50K+", label: "Orders Processed" },
//             { number: "98%", label: "Satisfaction Rate" },
//             { number: "24/7", label: "Support Active" },
//           ].map((stat, i) => (
//             <div
//               key={i}
//               className="bg-white/70 backdrop-blur-sm rounded-2xl py-8 px-6 shadow-lg hover:shadow-xl transition-shadow"
//             >
//               <h3 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                 {stat.number}
//               </h3>
//               <p className="text-gray-600 mt-2 font-medium">{stat.label}</p>
//             </div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default CustomerFeedback;


// import { motion, AnimatePresence } from "framer-motion";
// import { useState, useEffect } from "react";
// import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

// const testimonials = [
//   {
//     id: 1,
//     name: "Rahim Ahmed",
//     role: "CEO, StyleX Fashion Ltd.",
//     company: "Dhaka, Bangladesh",
//     rating: 5,
//     comment:
//       "This platform has completely transformed our production tracking. Now we can monitor everything from order to delivery with just one click. Truly outstanding!",
//     avatar: "https://i.pravatar.cc/150?img=1",
//     verified: true,
//   },
//   {
//     id: 2,
//     name: "Fatema Akter",
//     role: "Production Manager",
//     company: "Moonlight Garments",
//     rating: 5,
//     comment:
//       "As a manager, my workload has reduced by 70%. Pending orders, tracking updates — everything is in one place. The UI is also incredibly beautiful and intuitive!",
//     avatar: "https://i.pravatar.cc/150?img=2",
//     verified: true,
//   },
//   {
//     id: 3,
//     name: "Karim Hossain",
//     role: "International Buyer",
//     company: "Sweden",
//     rating: 5,
//     comment:
//       "As an international buyer, I can track my orders in real-time with production stages and live location updates. Never seen such a professional system from Bangladesh before!",
//     avatar: "https://i.pravatar.cc/150?img=3",
//     verified: true,
//   },
//   {
//     id: 4,
//     name: "Sumaiya Islam",
//     role: "Owner, TrendyWear BD",
//     company: "Chattogram, Bangladesh",
//     rating: 5,
//     comment:
//       "No more paperwork in my factory. Everything is now digital. Customers are also very happy seeing real-time tracking. Thank you so much to the team!",
//     avatar: "https://i.pravatar.cc/150?img=4",
//     verified: true,
//   },
// ];

// const CustomerFeedback = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
//   const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

//   useEffect(() => {
//     const timer = setInterval(next, 7000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <section className="py-24 bg-[#fafafa] dark:bg-[#0a0a0a] transition-colors duration-500 overflow-hidden">
//       <div className="max-w-7xl mx-auto px-6">
        
//         <div className="text-center mb-20">
//           <span className="text-xs tracking-[0.4em] font-bold text-indigo-600 dark:text-indigo-400 uppercase mb-4 block">
//             Testimonials
//           </span>
//           <h2 className="text-4xl md:text-6xl font-serif font-black text-gray-900 dark:text-white uppercase">
//             Voices of Trust
//           </h2>
//         </div>

//         <div className="relative max-w-5xl mx-auto bg-white dark:bg-[#050505] border border-gray-100 dark:border-zinc-800 shadow-2xl overflow-hidden rounded-sm">
//           <div className="flex flex-col md:flex-row">
            
//             {/* Image Side */}
//             <div className="w-full md:w-2/5 h-[300px] md:h-auto relative">
//                 <AnimatePresence mode="wait">
//                   <motion.img
//                     key={currentIndex}
//                     src={testimonials[currentIndex].avatar}
//                     initial={{ opacity: 0, scale: 1.1 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
//                   />
//                 </AnimatePresence>
//                 <div className="absolute inset-0 bg-indigo-600/10 mix-blend-multiply" />
//             </div>

//             {/* Content Side */}
//             <div className="w-full md:w-3/5 p-10 md:p-16 flex flex-col justify-center relative">
//               <Quote className="absolute top-10 right-10 w-20 h-20 text-gray-50 dark:text-zinc-900 -z-0" />
              
//               <div className="relative z-10">
//                 <div className="flex gap-1 mb-8">
//                   {[...Array(5)].map((_, i) => (
//                     <Star key={i} size={16} className="fill-indigo-600 text-indigo-600" />
//                   ))}
//                 </div>

//                 <AnimatePresence mode="wait">
//                   <motion.p
//                     key={currentIndex}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -20 }}
//                     className="text-xl md:text-2xl text-gray-700 dark:text-zinc-300 font-medium leading-relaxed italic mb-10"
//                   >
//                     "{testimonials[currentIndex].comment}"
//                   </motion.p>
//                 </AnimatePresence>

//                 <div>
//                   <h4 className="text-xl font-bold text-gray-900 dark:text-white uppercase flex items-center gap-2">
//                     {testimonials[currentIndex].name}
//                     <CheckCircle2 size={16} className="text-green-500" />
//                   </h4>
//                   <p className="text-indigo-600 dark:text-indigo-400 font-bold text-xs tracking-widest uppercase mt-1">
//                     {testimonials[currentIndex].role} — {testimonials[currentIndex].company}
//                   </p>
//                 </div>
//               </div>

//               {/* Navigation */}
//               <div className="flex gap-4 mt-12">
//                 <button onClick={prev} className="p-3 border border-gray-200 dark:border-zinc-800 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
//                   <ChevronLeft size={20} />
//                 </button>
//                 <button onClick={next} className="p-3 border border-gray-200 dark:border-zinc-800 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
//                   <ChevronRight size={20} />
//                 </button>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CustomerFeedback;

// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
// import { motion } from "framer-motion";
// import { Star, Quote } from "lucide-react";

// Swiper Styles
// import "swiper/css";
// import "swiper/css/effect-coverflow";
// import "swiper/css/pagination";

// const testimonials = [
//   {
//     id: 1,
//     name: "Rahim Ahmed",
//     role: "CEO, StyleX Fashion",
//     comment: "This platform has completely transformed our production tracking. Truly outstanding!",
//     image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500",
//     color: "from-blue-500/20 to-indigo-500/20"
//   },
//   {
//     id: 2,
//     name: "Fatema Akter",
//     role: "Production Manager",
//     comment: "As a manager, my workload has reduced by 70%. Everything is in one place.",
//     image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500",
//     color: "from-purple-500/20 to-pink-500/20"
//   },
//   {
//     id: 3,
//     name: "Karim Hossain",
//     role: "International Buyer",
//     comment: "I can track my orders in real-time with production stages. Very professional!",
//     image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=500",
//     color: "from-emerald-500/20 to-teal-500/20"
//   },
//   {
//     id: 4,
//     name: "Sumaiya Islam",
//     role: "Owner, TrendyWear BD",
//     comment: "No more paperwork. Everything is digital. Customers are very happy.",
//     image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=500",
//     color: "from-orange-500/20 to-yellow-500/20"
//   },
//   {
//    id: 5,
//     name: "Rahim Ahmed",
//     role: "CEO, StyleX Fashion Ltd.",
//     company: "Dhaka, Bangladesh",
//     rating: 5,
//     comment:
//       "This platform has completely transformed our production tracking. Now we can monitor everything from order to delivery with just one click. Truly outstanding!",
//     avatar: "https://i.pravatar.cc/150?img=1",
//     verified: true,
//   },
//   {
//     id: 6,
//     name: "Fatema Akter",
//     role: "Production Manager",
//     company: "Moonlight Garments",
//     rating: 5,
//     comment:
//       "As a manager, my workload has reduced by 70%. Pending orders, tracking updates — everything is in one place. The UI is also incredibly beautiful and intuitive!",
//     avatar: "https://i.pravatar.cc/150?img=2",
//     verified: true,
//   },
//   {
//     id: 7,
//     name: "Karim Hossain",
//     role: "International Buyer",
//     company: "Sweden",
//     rating: 5,
//     comment:
//       "As an international buyer, I can track my orders in real-time with production stages and live location updates. Never seen such a professional system from Bangladesh before!",
//     avatar: "https://i.pravatar.cc/150?img=3",
//     verified: true,
//   },
//   {
//     id: 8,
//     name: "Sumaiya Islam",
//     role: "Owner, TrendyWear BD",
//     company: "Chattogram, Bangladesh",
//     rating: 5,
//     comment:
//       "No more paperwork in my factory. Everything is now digital. Customers are also very happy seeing real-time tracking. Thank you so much to the team!",
//     avatar: "https://i.pravatar.cc/150?img=4",
//     verified: true,
//   },
// ];

// const CustomerFeedback = () => {
//   return (
//     <section className="py-24 bg-white dark:bg-[#050505] transition-colors duration-500 overflow-hidden">
//       <div className="max-w-7xl mx-auto px-6">
        
//         {/* Header - Matching your theme */}
//         <div className="text-center mb-16">
//           <span className="text-xs tracking-[0.4em] font-bold text-indigo-600 dark:text-indigo-400 uppercase mb-4 block">
//             Client Stories
//           </span>
//           <h2 className="text-4xl md:text-6xl font-serif font-black text-gray-900 dark:text-white uppercase leading-tight">
//             Trusted by the <br /> best in industry
//           </h2>
//         </div>

//         {/* Swiper Carousel - Dribbble Style */}
//         <div className="py-10">
//           <Swiper
//             effect={"coverflow"}
//             grabCursor={true}
//             centeredSlides={true}
//             slidesPerView={"auto"}
//             loop={true}
//             coverflowEffect={{
//               rotate: 0,
//               stretch: 0,
//               depth: 100,
//               modifier: 2.5,
//               slideShadows: false,
//             }}
//             autoplay={{
//               delay: 3000,
//               disableOnInteraction: false,
//             }}
//             pagination={{ clickable: true }}
//             modules={[EffectCoverflow, Pagination, Autoplay]}
//             className="feedback-swiper !pb-14"
//           >
//             {testimonials.map((item) => (
//               <SwiperSlide key={item.id} className="max-w-[350px] md:max-w-[450px]">
//                 {({ isActive }) => (
//                   <div className={`
//                     relative transition-all duration-500 rounded-[2.5rem] overflow-hidden p-8 md:p-12 h-[500px] flex flex-col justify-end
//                     ${isActive ? 'scale-100 opacity-100 shadow-2xl' : 'scale-90 opacity-40 blur-[1px]'}
//                     bg-gradient-to-br ${item.color} border border-white/20 dark:border-white/10 backdrop-blur-md
//                   `}>
                    
//                     {/* Background Image with Overlay */}
//                     <div className="absolute inset-0 -z-10">
//                       <img 
//                         src={item.image} 
//                         alt={item.name} 
//                         className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 transition-all duration-700"
//                       />
//                       <div className="absolute inset-0 bg-black/40 dark:bg-black/60 transition-colors" />
//                     </div>

//                     {/* Content */}
//                     <div className="relative z-10 text-white">
//                       <Quote className="w-12 h-12 text-white/20 mb-6" />
                      
//                       <div className="flex gap-1 mb-4">
//                         {[...Array(5)].map((_, i) => (
//                           <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
//                         ))}
//                       </div>

//                       <p className="text-lg md:text-xl font-medium leading-relaxed mb-8">
//                         "{item.comment}"
//                       </p>

//                       <div className="pt-6 border-t border-white/20">
//                         <h4 className="text-xl font-bold tracking-tight">{item.name}</h4>
//                         <p className="text-white/60 text-sm font-bold uppercase tracking-widest mt-1">
//                           {item.role}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </div>

//       {/* Global CSS for Swiper Bullets */}
//       <style jsx global>{`
//         .feedback-swiper .swiper-pagination-bullet {
//           width: 12px;
//           height: 12px;
//           background: #6366f1;
//           opacity: 0.2;
//           transition: all 0.3s;
//         }
//         .feedback-swiper .swiper-pagination-bullet-active {
//           width: 35px;
//           border-radius: 6px;
//           opacity: 1;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default CustomerFeedback;

// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
// import { motion } from "framer-motion";
// import { Star, Quote, CheckCircle2 } from "lucide-react";

// // Swiper Styles
// import "swiper/css";
// import "swiper/css/effect-coverflow";
// import "swiper/css/pagination";

// const testimonials = [
//   {
//     id: 1,
//     name: "Rahim Ahmed",
//     role: "CEO, StyleX Fashion",
//     comment: "This platform has completely transformed our production tracking. Truly outstanding!",
//     image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500",
//     color: "from-blue-500/20 to-indigo-500/20"
//   },
//   {
//     id: 2,
//     name: "Fatema Akter",
//     role: "Production Manager",
//     comment: "As a manager, my workload has reduced by 70%. Everything is in one place.",
//     image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500",
//     color: "from-purple-500/20 to-pink-500/20"
//   },
//   {
//     id: 3,
//     name: "Karim Hossain",
//     role: "International Buyer",
//     comment: "I can track my orders in real-time with production stages. Very professional!",
//     image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=500",
//     color: "from-emerald-500/20 to-teal-500/20"
//   },
//   {
//     id: 4,
//     name: "Sumaiya Islam",
//     role: "Owner, TrendyWear BD",
//     comment: "No more paperwork. Everything is digital. Customers are very happy.",
//     image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=500",
//     color: "from-orange-500/20 to-yellow-500/20"
//   },
//   {
//    id: 5,
//     name: "Rahim Ahmed",
//     role: "CEO, StyleX Fashion Ltd.",
//     company: "Dhaka, Bangladesh",
//     rating: 5,
//     comment:
//       "This platform has completely transformed our production tracking. Now we can monitor everything from order to delivery with just one click. Truly outstanding!",
//     avatar: "https://i.pravatar.cc/150?img=1",
//     verified: true,
//   },
//   {
//     id: 6,
//     name: "Fatema Akter",
//     role: "Production Manager",
//     company: "Moonlight Garments",
//     rating: 5,
//     comment:
//       "As a manager, my workload has reduced by 70%. Pending orders, tracking updates — everything is in one place. The UI is also incredibly beautiful and intuitive!",
//     avatar: "https://i.pravatar.cc/150?img=2",
//     verified: true,
//   },
//   {
//     id: 7,
//     name: "Karim Hossain",
//     role: "International Buyer",
//     company: "Sweden",
//     rating: 5,
//     comment:
//       "As an international buyer, I can track my orders in real-time with production stages and live location updates. Never seen such a professional system from Bangladesh before!",
//     avatar: "https://i.pravatar.cc/150?img=3",
//     verified: true,
//   },
//   {
//     id: 8,
//     name: "Sumaiya Islam",
//     role: "Owner, TrendyWear BD",
//     company: "Chattogram, Bangladesh",
//     rating: 5,
//     comment:
//       "No more paperwork in my factory. Everything is now digital. Customers are also very happy seeing real-time tracking. Thank you so much to the team!",
//     avatar: "https://i.pravatar.cc/150?img=4",
//     verified: true,
//   },
// ];

// const CustomerFeedback = () => {
//   return (
//     <section className="py-24 bg-white dark:bg-[#050505] transition-colors duration-500 overflow-hidden border-t dark:border-zinc-800">
//       <div className="max-w-7xl mx-auto px-6">
        
//         {/* Updated Header - Matching Left-Aligned Theme */}
//         <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
//           <motion.div 
//             initial={{ opacity: 0, x: -30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//             className="max-w-2xl"
//           >
//             <span className="text-xs tracking-[0.4em] font-bold text-indigo-600 dark:text-indigo-400 uppercase mb-4 block">
//               Testimonials
//             </span>
//             <h2 className="text-4xl md:text-6xl font-serif font-black text-gray-900 dark:text-white uppercase leading-tight">
//               Voices of <br /> Global Trust
//             </h2>
//           </motion.div>
          
//           <motion.p 
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             className="text-gray-500 dark:text-zinc-400 text-lg max-w-xs md:text-right border-l-2 md:border-l-0 md:border-r-2 border-indigo-600 px-4"
//           >
//             Trusted by over 500+ garment factories and international buyers worldwide.
//           </motion.p>
//         </div>

//         {/* Carousel Content */}
//         <div className="mt-10">
//           <Swiper
//             effect={"coverflow"}
//             grabCursor={true}
//             centeredSlides={true}
//             slidesPerView={"auto"}
//             loop={true}
//             coverflowEffect={{
//               rotate: 0,
//               stretch: -20,
//               depth: 150,
//               modifier: 2,
//               slideShadows: false,
//             }}
//             autoplay={{
//               delay: 4000,
//               disableOnInteraction: false,
//             }}
//             pagination={{ clickable: true }}
//             modules={[EffectCoverflow, Pagination, Autoplay]}
//             className="feedback-swiper !pb-20"
//           >
//             {testimonials.map((item) => (
//               <SwiperSlide key={item.id} className="max-w-[320px] md:max-w-[480px]">
//                 {({ isActive }) => (
//                   <div className={`
//                     relative transition-all duration-700 rounded-[2rem] overflow-hidden p-8 md:p-14 h-[550px] flex flex-col justify-end
//                     ${isActive ? 'scale-100 opacity-100 shadow-[0_20px_50px_rgba(0,0,0,0.3)]' : 'scale-90 opacity-30 blur-[2px]'}
//                     bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800
//                   `}>
                    
//                     {/* Image Background Layer */}
//                     <div className="absolute inset-0 -z-10 overflow-hidden">
//                       <img 
//                         src={item.image} 
//                         alt={item.name} 
//                         className={`w-full h-full object-cover transition-all duration-1000 ${isActive ? 'scale-110 grayscale-0' : 'grayscale'}`}
//                       />
//                       <div className={`absolute inset-0 transition-colors duration-700 ${isActive ? 'bg-black/40' : 'bg-black/80'}`} />
//                     </div>

//                     {/* Content Layer */}
//                     <div className="relative z-10 text-white">
//                       <Quote className="w-12 h-12 text-indigo-400/50 mb-6" />
                      
//                       <div className="flex gap-1 mb-6">
//                         {[...Array(5)].map((_, i) => (
//                           <Star key={i} size={16} className="fill-yellow-500 text-yellow-500" />
//                         ))}
//                       </div>

//                       <p className="text-xl md:text-2xl font-medium leading-relaxed mb-10 italic">
//                         "{item.comment}"
//                       </p>

//                       <div className="pt-8 border-t border-white/20 flex items-center justify-between">
//                         <div>
//                            <h4 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2">
//                              {item.name} <CheckCircle2 size={16} className="text-indigo-400" />
//                            </h4>
//                            <p className="text-indigo-300 text-[10px] font-black uppercase tracking-[0.2em] mt-1">
//                              {item.role} • {item.id === 3 ? 'Sweden' : 'Bangladesh'}
//                            </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </div>

//       <style jsx global>{`
//         .feedback-swiper .swiper-pagination-bullet {
//           width: 8px;
//           height: 8px;
//           background: #4f46e5;
//           opacity: 0.3;
//           transition: all 0.4s ease;
//         }
//         .feedback-swiper .swiper-pagination-bullet-active {
//           width: 40px;
//           border-radius: 4px;
//           opacity: 1;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default CustomerFeedback;
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import { motion } from "framer-motion";
import { Star, Quote, CheckCircle2 } from "lucide-react";

// Swiper Styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const testimonials = [
  {
    id: 1,
    name: "Rahim Ahmed",
    role: "CEO, StyleX Fashion",
    comment: "This platform has completely transformed our production tracking. Truly outstanding!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500",
  },
  {
    id: 2,
    name: "Fatema Akter",
    role: "Production Manager",
    comment: "As a manager, my workload has reduced by 70%. Everything is in one place.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500",
  },
  {
    id: 3,
    name: "Karim Hossain",
    role: "International Buyer",
    comment: "I can track my orders in real-time with production stages. Very professional!",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=500",
  },
  {
    id: 4,
    name: "Sumaiya Islam",
    role: "Owner, TrendyWear BD",
    comment: "No more paperwork. Everything is digital. Customers are very happy.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=500",
  },
  // ... you can keep or remove the duplicate ones as needed
];

const CustomerFeedback = () => {
  return (
    <section className="py-20 md:py-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-indigo-950/60 dark:to-purple-950/40 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Modern Consistent Header - Matches other sections */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-medium tracking-wider mb-5">
            REAL STORIES FROM OUR PARTNERS
          </span>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-6">
            Voices of Global Trust
          </h2>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Trusted by 500+ garment factories and international buyers worldwide
          </p>
        </motion.div>

        {/* Carousel - unchanged, beautiful as it was */}
        <div className="mt-10">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            loop={true}
            coverflowEffect={{
              rotate: 0,
              stretch: -20,
              depth: 150,
              modifier: 2,
              slideShadows: false,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="feedback-swiper !pb-20"
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.id} className="max-w-[320px] md:max-w-[480px]">
                {({ isActive }) => (
                  <div
                    className={`
                      relative transition-all duration-700 rounded-[2rem] overflow-hidden p-8 md:p-14 h-[550px] flex flex-col justify-end
                      ${isActive ? 'scale-100 opacity-100 shadow-[0_20px_50px_rgba(0,0,0,0.3)]' : 'scale-90 opacity-30 blur-[2px]'}
                      bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800
                    `}
                  >
                    {/* Image Background Layer */}
                    <div className="absolute inset-0 -z-10 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className={`w-full h-full object-cover transition-all duration-1000 ${isActive ? 'scale-110 grayscale-0' : 'grayscale'}`}
                      />
                      <div className={`absolute inset-0 transition-colors duration-700 ${isActive ? 'bg-black/40' : 'bg-black/80'}`} />
                    </div>

                    {/* Content Layer */}
                    <div className="relative z-10 text-white">
                      <Quote className="w-12 h-12 text-indigo-400/50 mb-6" />

                      <div className="flex gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} className="fill-yellow-500 text-yellow-500" />
                        ))}
                      </div>

                      <p className="text-xl md:text-2xl font-medium leading-relaxed mb-10 italic">
                        "{item.comment}"
                      </p>

                      <div className="pt-8 border-t border-white/20 flex items-center justify-between">
                        <div>
                          <h4 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2">
                            {item.name} <CheckCircle2 size={16} className="text-indigo-400" />
                          </h4>
                          <p className="text-indigo-300 text-xs font-semibold uppercase tracking-wider mt-1">
                            {item.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .feedback-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #4f46e5;
          opacity: 0.3;
          transition: all 0.4s ease;
        }
        .feedback-swiper .swiper-pagination-bullet-active {
          width: 40px;
          border-radius: 4px;
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default CustomerFeedback;