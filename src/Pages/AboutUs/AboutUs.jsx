// src/pages/AboutUs.jsx
import React from "react";
import { motion } from "framer-motion";
import { Factory, Users, Globe, Target, HeartHandshake, Award } from "lucide-react";

const AboutUs = () => {
  return (
    <>
      
      <section className="relative py-32 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 overflow-hidden">
        <title>About Us</title>
        <div className="absolute inset-0 bg-black/30" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center max-w-4xl mx-auto text-white"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              About Garments Tracker
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed">
              Empowering garment factories worldwide with smart, real-time production management solutions that drive efficiency, transparency, and growth.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <Target className="w-12 h-12 text-indigo-600" />
                <h2 className="text-4xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                To revolutionize garment production management by providing an intuitive, powerful platform that eliminates paperwork, reduces delays, and enables factories to deliver high-quality orders on time — every time.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <Globe className="w-12 h-12 text-purple-600" />
                <h2 className="text-4xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                A world where every garment factory — big or small — operates with complete transparency, real-time insights, and seamless collaboration between managers, buyers, and production teams.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

   
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Story & Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Born from real challenges in the garment industry, we built a system that solves the pain points we experienced firsthand.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: <Factory className="w-10 h-10" />, title: "Innovation", desc: "Constantly evolving with cutting-edge tools to stay ahead in garment production technology." },
              { icon: <HeartHandshake className="w-10 h-10" />, title: "Reliability", desc: "Trusted by factories worldwide for accurate tracking and on-time delivery assurance." },
              { icon: <Award className="w-10 h-10" />, title: "Excellence", desc: "Committed to quality, transparency, and sustainable practices in every feature we build." },
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-10 text-center hover:shadow-2xl transition-shadow"
              >
                <div className="text-indigo-600 mb-6 flex justify-center">{value.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-700">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

   
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-16"
          >
            Trusted Globally by 500+ Factories
          </motion.h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            From Bangladesh to international buyers in Europe and USA — we're proud to support garment businesses across the globe.
          </p>
        </div>
      </section>
    </>
  );
};

export default AboutUs;