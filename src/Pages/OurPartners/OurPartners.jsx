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

