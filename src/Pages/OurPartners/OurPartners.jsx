// // // src/components/OurPartners/OurPartners.jsx
// // import React from "react";
// // import { motion } from "framer-motion";
// // import { Autoplay, Pagination } from "swiper/modules";
// // import { Swiper, SwiperSlide } from "swiper/react";
// // import "swiper/css";
// // import "swiper/css/pagination";

// // const partners = [
// //   { name: "H&M", logo: "https://images.unsplash.com/photo-1544441893-675973e31985?w=200&h=100&fit=crop" },
// //   { name: "Zara", logo: "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=200&h=100&fit=crop" },
// //   { name: "Uniqlo", logo: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=200&h=crop" },
// //   { name: "Levi's", logo: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=200&h=100&fit=crop" },
// //   { name: "Nike", logo: "https://images.unsplash.com/photo-1542282043-7f4a8c9f8b9f?w=200&h=100&fit=crop" },
// //   { name: "Adidas", logo: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&h=100&fit=crop" },
// //   { name: "Puma", logo: "https://images.unsplash.com/photo-1608233965292-3436d28d2d0c?w=200&h=100&fit=crop" },
// //   { name: "Gucci", logo: "https://images.unsplash.com/photo-1574180045827-681f8a1a9622?w=200&h=100&fit=crop" },
// // ];

// // const OurPartners = () => {
// //   return (
// //     <section className="py-20 bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 overflow-hidden">
// //       <div className="container mx-auto px-4">
// //         {/* Heading */}
// //         <motion.div
// //           initial={{ opacity: 0, y: 40 }}
// //           whileInView={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.9 }}
// //           className="text-center mb-16"
// //         >
// //           <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">Trusted by Global Brands</h2>
// //           <p className="text-xl text-teal-200 max-w-2xl mx-auto">
// //             Leading garment manufacturers and fashion houses rely on our platform for seamless production
// //           </p>
// //         </motion.div>

// //         {/* Premium Swiper */}
// //         <Swiper
// //           modules={[Autoplay, Pagination]}
// //           spaceBetween={40}
// //           slidesPerView={2}
// //           centeredSlides={true}
// //           // loop={true}
// //           autoplay={{
// //             delay: 3000,
// //             disableOnInteraction: false,
// //           }}
// //           pagination={{
// //             clickable: true,
// //             dynamicBullets: true,
// //           }}
// //           grabCursor={true}
// //           breakpoints={{
// //             640: { slidesPerView: 3 },
// //             768: { slidesPerView: 4 },
// //             1024: { slidesPerView: 5 },
// //             1280: { slidesPerView: 6 },
// //           }}
// //           className="partners-swiper !pb-16"
// //         >
// //           {partners.map((partner, index) => (
// //             <SwiperSlide key={index}>
// //               <motion.div
// //                 whileHover={{ scale: 1.15, y: -20 }}
// //                 transition={{ type: "spring", stiffness: 300 }}
// //                 className="group relative"
// //               >
// //                 {/* Glass Card */}
// //                 <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 overflow-hidden">
// //                   {/* Glow Effect on Hover */}
// //                   <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />

// //                   {/* Logo Container */}
// //                   <div className="relative z-10 flex items-center justify-center h-32">
// //                     <img
// //                       src={partner.logo}
// //                       alt={partner.name}
// //                       className="max-w-full max-h-20 object-contain filter brightness-0 invert grayscale group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
// //                       // onError={(e) => {
// //                       //   e.target.onerror = e.target; // prevents infinite loop
// //                       //   e.target.src = `https://placehold.co/200x80/1a1a1a/ffffff/png?text=${encodeURIComponent(
// //                       //     partner.name
// //                       //   )}`;
// //                       // }}
// //                     />
// //                   </div>

// //                   {/* Brand Name */}
// //                   <p className="text-center text-white font-semibold text-lg mt-4 opacity-80 group-hover:opacity-100 transition-opacity">
// //                     {partner.name}
// //                   </p>
// //                 </div>

// //                 {/* Floating Glow */}
// //                 <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-3xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-700 -z-10" />
// //               </motion.div>
// //             </SwiperSlide>
// //           ))}
// //         </Swiper>

// //         {/* Trust Counter */}
// //         <motion.div
// //           initial={{ opacity: 0 }}
// //           whileInView={{ opacity: 1 }}
// //           transition={{ delay: 0.5 }}
// //           className="text-center mt-16"
// //         >
// //           <p className="text-5xl font-bold text-teal-400">150+</p>
// //           <p className="text-2xl text-white mt-2">Global Partners & Factories</p>
// //         </motion.div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default OurPartners;



// // src/components/OurPartners/OurPartners.jsx
// import React from "react";
// import { Autoplay } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";

// const partners = [
//   { name: "H&M", logo: "https://images.unsplash.com/photo-1544441893-675973e31985?w=200&h=100&fit=crop" },
//   { name: "Zara", logo: "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=200&h=100&fit=crop" },
//   { name: "Uniqlo", logo: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=200&h=100&fit=crop" },
//   { name: "Levi's", logo: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=200&h=100&fit=crop" },
//   { name: "Nike", logo: "https://images.unsplash.com/photo-1542282043-7f4a8c9f8b9f?w=200&h=100&fit=crop" },
//   { name: "Adidas", logo: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&h=100&fit=crop" },
// ];

// const OurPartners = () => {
//   return (
//     <section className="py-20 bg-white">
//       <div className="container mx-auto px-6">
//         {/* Heading */}
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//             Trusted by the World's Leading Brands
//           </h2>
//           <p className="text-xl text-gray-600">We power production for global fashion giants</p>
//         </div>

//         {/* Swiper Carousel */}
//         <Swiper
//           modules={[Autoplay]}
//           spaceBetween={40}
//           slidesPerView={2}
//           autoplay={{ delay: 3000, disableOnInteraction: false }}
//           loop={true}
//           speed={800}
//           breakpoints={{
//             640: { slidesPerView: 3, spaceBetween: 30 },
//             768: { slidesPerView: 4, spaceBetween: 40 },
//             1024: { slidesPerView: 5, spaceBetween: 50 },
//             1280: { slidesPerView: 6, spaceBetween: 60 },
//           }}
//         >
//           {partners.map((partner, index) => (
//             <SwiperSlide key={index}>
//               <div className="bg-white border border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300">
//                 <div className="h-20 w-full flex items-center justify-center mb-6">
//                   <img
//                     src={partner.logo}
//                     alt={`${partner.name} logo`}
//                     className="max-h-16 max-w-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
//                   />
//                 </div>
//                 <p className="text-gray-800 font-semibold text-lg">
//                   {partner.name}
//                 </p>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>

//         {/* Counter */}
//         <div className="text-center mt-20">
//           <p className="text-5xl font-bold text-gray-900">150+</p>
//           <p className="text-gray-600 mt-3 text-lg">Partner Brands Worldwide</p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default OurPartners;
// src/components/OurPartners/OurPartners.jsx
import React from "react";
import { motion } from "framer-motion";

const partners = [
  {
    name: "H&M",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/1024px-H%26M-Logo.svg.png",
  },
  {
    name: "Zara",
    logo: "https://logomakerr.ai/blog/wp-content/uploads/2022/08/2019-to-Present-Zara-logo-design.jpg",
  },
  {
    name: "Uniqlo",
    logo: "https://www.shutterstock.com/image-vector/uniqlo-logo-rt-design-template-260nw-2269890225.jpg",
  },
  {
    name: "Levi's",
    logo: "https://fabrikbrands.com/wp-content/uploads/Levis-Logo-History-1b.png",
  },
  {
    name: "Nike",
    logo: "https://pngimg.com/d/nike_PNG6.png",
  },
  {
    name: "Adidas",
    logo: "https://1000logos.net/wp-content/uploads/2019/06/Adidas-Logo-1991.jpg",
  },
  {
    name: "Puma",
    logo: "https://download.logo.wine/logo/Puma_(brand)/Puma_(brand)-Logo.wine.png",
  },
  {
    name: "Gap",
    logo: "https://i.logos-download.com/1336/30360-s1280-e4cebc00594cc4dd8e1b5cd0abb0fcd8.png/Gap_Logo_1988_wordmark-s1280.png",
  },
];

const OurPartners = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Trusted Partners
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Proudly collaborating with world-renowned fashion brands and retailers
          </p>
        </motion.div>

        {/* Static Responsive Grid - No Slider */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-12 items-center justify-items-center">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.15, y: -10 }}
              className="group flex flex-col items-center"
            >
              <div className="bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100">
                <div className="h-28 flex items-center justify-center">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="max-h-20 max-w-full object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                  />
                </div>
              </div>
              <p className="text-center text-gray-700 font-semibold text-lg mt-6 opacity-70 group-hover:opacity-100 transition-opacity">
                {partner.name}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-24"
        >
          <p className="text-6xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            150+
          </p>
          <p className="text-2xl text-gray-700 mt-4 font-medium">
            Partner Brands Worldwide
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default OurPartners;

