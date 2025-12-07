// src/components/OurPartners/OurPartners.jsx
import React from "react";
import { motion } from "framer-motion";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const partners = [
  { name: "H&M", logo: "https://images.unsplash.com/photo-1544441893-675973e31985?w=200&h=100&fit=crop" },
  { name: "Zara", logo: "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=200&h=100&fit=crop" },
  { name: "Uniqlo", logo: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=200&h=crop" },
  { name: "Levi's", logo: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=200&h=100&fit=crop" },
  { name: "Nike", logo: "https://images.unsplash.com/photo-1542282043-7f4a8c9f8b9f?w=200&h=100&fit=crop" },
  { name: "Adidas", logo: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&h=100&fit=crop" },
  { name: "Puma", logo: "https://images.unsplash.com/photo-1608233965292-3436d28d2d0c?w=200&h=100&fit=crop" },
  { name: "Gucci", logo: "https://images.unsplash.com/photo-1574180045827-681f8a1a9622?w=200&h=100&fit=crop" },
];

const OurPartners = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Trusted by Global Brands
          </h2>
          <p className="text-xl text-teal-200 max-w-2xl mx-auto">
            Leading garment manufacturers and fashion houses rely on our platform for seamless production
          </p>
        </motion.div>

        {/* Premium Swiper */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={40}
          slidesPerView={2}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          grabCursor={true}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 6 },
          }}
          className="partners-swiper !pb-16"
        >
          {partners.map((partner, index) => (
            <SwiperSlide key={index}>
              <motion.div
                whileHover={{ scale: 1.15, y: -20 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group relative"
              >
                {/* Glass Card */}
                <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 overflow-hidden">
                  {/* Glow Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />
                  
                  {/* Logo Container */}
                  <div className="relative z-10 flex items-center justify-center h-32">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-w-full max-h-20 object-contain filter brightness-0 invert grayscale group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/200x80/1a1a1a/ffffff?text=${partner.name}`;
                      }}
                    />
                  </div>

                  {/* Brand Name */}
                  <p className="text-center text-white font-semibold text-lg mt-4 opacity-80 group-hover:opacity-100 transition-opacity">
                    {partner.name}
                  </p>
                </div>

                {/* Floating Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-3xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-700 -z-10" />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Trust Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-5xl font-bold text-teal-400">150+</p>
          <p className="text-2xl text-white mt-2">Global Partners & Factories</p>
        </motion.div>
      </div>
    </section>
  );
};

export default OurPartners;