// src/pages/ContactUs.jsx
import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

const Contact = () => {
  return (
    <>
   
      <section className="relative py-28 bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-900 text-white overflow-hidden">
        <title>Contact Us</title>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl md:text-2xl">
              We're here to help you streamline your garment production. Reach out anytime.
            </p>
          </motion.div>
        </div>
      </section>

     
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-10">Contact Information</h2>
              <div className="space-y-8">
                {[
                  { icon: <Mail className="w-8 h-8" />, title: "Email", info: "support@garmentstracker.com" },
                  { icon: <Phone className="w-8 h-8" />, title: "Phone", info: "+880 1234 567890" },
                  { icon: <MapPin className="w-8 h-8" />, title: "Address", info: "Dhaka, Bangladesh" },
                  { icon: <Clock className="w-8 h-8" />, title: "Support Hours", info: "24/7 Available" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-6">
                    <div className="text-indigo-600">{item.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-gray-700 mt-1">{item.info}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-10 shadow-xl"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h2>
              <form className="space-y-6">
                <input type="text" placeholder="Your Name" className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-indigo-600 focus:outline-none transition" required />
                <input type="email" placeholder="Your Email" className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-indigo-600 focus:outline-none transition" required />
                <input type="text" placeholder="Subject" className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-indigo-600 focus:outline-none transition" required />
                <textarea rows="6" placeholder="Your Message" className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-indigo-600 focus:outline-none transition resize-none" required></textarea>
                <button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-xl hover:shadow-lg transition flex items-center justify-center gap-3">
                  Send Message
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;