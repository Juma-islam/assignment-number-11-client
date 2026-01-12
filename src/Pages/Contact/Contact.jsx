import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, ArrowRight } from "lucide-react";

const Contact = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-indigo-950/60 dark:to-purple-950/40 transition-colors duration-500">
      <title>Contact Us | Garments Tracker</title>

      {/* Hero Header - Consistent with other pages */}
      <section className="relative pt-32 pb-20 md:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="inline-block px-5 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-medium tracking-wider mb-6">
              GET IN TOUCH
            </span>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent leading-tight mb-8">
              Let's Start <br /> Your Journey
            </h1>

            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              We're here to help you streamline your garment production. Reach out — our team is ready 24/7.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left - Contact Info & Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="space-y-12 lg:sticky lg:top-24"
            >
              {/* Contact Cards */}
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  {
                    icon: <Mail size={28} />,
                    title: "Email Us",
                    info: "support@garmentstracker.com",
                    desc: "Get quick response within 24 hours",
                  },
                  {
                    icon: <Phone size={28} />,
                    title: "Call Us",
                    info: "+880 1234 567890",
                    desc: "Mon–Fri: 9AM–6PM (BDT)",
                  },
                  {
                    icon: <MapPin size={28} />,
                    title: "Visit Us",
                    info: "Dhaka, Bangladesh",
                    desc: "Headquarters & Innovation Lab",
                  },
                  {
                    icon: <Clock size={28} />,
                    title: "Support",
                    info: "24/7 Priority",
                    desc: "For Pro & Enterprise clients",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className={`
                      bg-white/70 dark:bg-gray-800/40 
                      backdrop-blur-xl 
                      rounded-2xl 
                      p-8 
                      shadow-xl dark:shadow-2xl dark:shadow-indigo-950/30
                      border border-white/50 dark:border-gray-700/50
                      hover:shadow-2xl hover:dark:shadow-indigo-700/40
                      transition-all duration-400
                      flex flex-col items-center text-center
                    `}
                  >
                    <div className="w-14 h-14 mb-6 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 flex items-center justify-center text-white shadow-lg">
                      {item.icon}
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-1">
                      {item.info}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Map / Location Placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className={`
                  aspect-video rounded-2xl overflow-hidden relative
                  bg-gradient-to-br from-indigo-900/20 to-purple-900/20
                  border border-white/30 dark:border-gray-700/30
                  shadow-2xl
                `}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center px-8">
                    <MapPin size={48} className="mx-auto mb-4 text-indigo-500 dark:text-indigo-400" />
                    <h3 className="text-2xl font-bold text-white mb-2">Dhaka Headquarters</h3>
                    <p className="text-gray-200 text-sm">
                      Bangladesh Garment Innovation Hub
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className={`
                bg-white/70 dark:bg-gray-800/40 
                backdrop-blur-xl 
                rounded-2xl 
                p-8 md:p-12 
                shadow-2xl dark:shadow-indigo-950/30
                border border-white/50 dark:border-gray-700/50
                lg:sticky lg:top-24
              `}
            >
              <h3 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-700 dark:from-indigo-400 dark:to-purple-500 bg-clip-text text-transparent mb-10">
                Send Us a Message
              </h3>

              <form className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-transparent border-b-2 border-gray-300 dark:border-gray-600 py-4 focus:border-indigo-500 dark:focus:border-indigo-400 outline-none text-gray-900 dark:text-white transition-colors"
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full bg-transparent border-b-2 border-gray-300 dark:border-gray-600 py-4 focus:border-indigo-500 dark:focus:border-indigo-400 outline-none text-gray-900 dark:text-white transition-colors"
                      placeholder="your@company.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b-2 border-gray-300 dark:border-gray-600 py-4 focus:border-indigo-500 dark:focus:border-indigo-400 outline-none text-gray-900 dark:text-white transition-colors"
                    placeholder="How can we help you?"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    Your Message
                  </label>
                  <textarea
                    rows={5}
                    className="w-full bg-transparent border-b-2 border-gray-300 dark:border-gray-600 py-4 focus:border-indigo-500 dark:focus:border-indigo-400 outline-none text-gray-900 dark:text-white transition-colors resize-none"
                    placeholder="Tell us about your needs..."
                    required
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className={`
                    w-full py-6 px-10 rounded-xl
                    bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600
                    dark:from-indigo-500 dark:via-purple-500 dark:to-indigo-500
                    text-white font-bold uppercase text-sm tracking-wider
                    shadow-lg hover:shadow-xl
                    hover:from-indigo-700 hover:via-purple-700 hover:to-indigo-700
                    transition-all duration-500
                    flex items-center justify-between group
                  `}
                >
                  <span>Send Message</span>
                  <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
// import React from "react";
// import { motion } from "framer-motion";
// import { Mail, Phone, MapPin, Clock, Send, ArrowRight } from "lucide-react";

// const Contact = () => {
//   return (
//     <div className="bg-white dark:bg-[#050505] transition-colors duration-500 pt-28 pb-20">
//       <title>Contact Us | Garments Tracker</title>

//       {/* Header Section */}
//       <div className="max-w-7xl mx-auto px-6 mb-20">
//         <div className="flex flex-col md:flex-row justify-between items-end gap-8">
//           <motion.div 
//             initial={{ opacity: 0, x: -30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//             className="max-w-2xl"
//           >
//             <span className="text-xs tracking-[0.4em] font-bold text-indigo-600 dark:text-indigo-400 uppercase mb-4 block">
//               Inquiry
//             </span>
//             <h2 className="text-5xl md:text-8xl font-serif font-black text-gray-900 dark:text-white uppercase leading-[0.9] tracking-tighter">
//               Get in <br /> 
//               <span className="text-transparent border-text dark:text-zinc-800" 
//                     style={{ WebkitTextStroke: '1px currentColor' }}>
//                 Touch
//               </span>
//             </h2>
//           </motion.div>
          
//           <motion.p 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-gray-500 dark:text-zinc-400 text-lg max-w-xs md:text-right border-l-2 md:border-l-0 md:border-r-2 border-indigo-600 px-4"
//           >
//             We're here to help you streamline your garment production. Reach out anytime.
//           </motion.p>
//         </div>
//       </div>

//       <section className="max-w-7xl mx-auto px-6">
//         <div className="grid lg:grid-cols-2 gap-20 items-start">
          
//           {/* Contact Details - Minimalist List */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="space-y-12"
//           >
//             <div>
//               <h3 className="text-[10px] tracking-[0.5em] font-black text-gray-400 dark:text-zinc-600 uppercase mb-10">
//                 Contact Information
//               </h3>
//               <div className="grid sm:grid-cols-2 gap-y-12 gap-x-6">
//                 {[
//                   { icon: <Mail size={20} />, title: "Email", info: "support@garmentstracker.com" },
//                   { icon: <Phone size={20} />, title: "Phone", info: "+880 1234 567890" },
//                   { icon: <MapPin size={20} />, title: "Location", info: "Dhaka, Bangladesh" },
//                   { icon: <Clock size={20} />, title: "Available", info: "24/7 Priority Support" },
//                 ].map((item, i) => (
//                   <div key={i} className="group">
//                     <div className="text-indigo-600 dark:text-indigo-400 mb-4 transition-transform group-hover:scale-110 duration-300">
//                       {item.icon}
//                     </div>
//                     <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white mb-2">
//                       {item.title}
//                     </h4>
//                     <p className="text-gray-500 dark:text-zinc-400 text-sm font-medium">
//                       {item.info}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Decorative Image or Map Area Placeholder */}
//             <div className="aspect-video bg-gray-100 dark:bg-zinc-900 overflow-hidden relative group">
//                 <div className="absolute inset-0 bg-indigo-600/10 group-hover:bg-transparent transition-colors duration-500"></div>
//                 <div className="flex items-center justify-center h-full border border-gray-100 dark:border-zinc-800">
//                     <span className="text-[10px] tracking-[0.5em] font-bold text-gray-400 uppercase">Our Headquarters</span>
//                 </div>
//             </div>
//           </motion.div>

//           {/* Luxury Form */}
//           <motion.div
//             initial={{ opacity: 0, x: 30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             className="bg-gray-50 dark:bg-zinc-900/30 p-8 md:p-12 border border-gray-100 dark:border-zinc-800"
//           >
//             <h3 className="text-2xl font-serif font-black text-gray-900 dark:text-white uppercase mb-8">
//               Send a Message
//             </h3>
//             <form className="space-y-8">
//               <div className="grid md:grid-cols-2 gap-8">
//                 <div className="space-y-2">
//                   <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">Your Name</label>
//                   <input type="text" className="w-full bg-transparent border-b border-gray-300 dark:border-zinc-700 py-2 focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-400 transition-colors text-gray-900 dark:text-white" required />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">Email Address</label>
//                   <input type="email" className="w-full bg-transparent border-b border-gray-300 dark:border-zinc-700 py-2 focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-400 transition-colors text-gray-900 dark:text-white" required />
//                 </div>
//               </div>
              
//               <div className="space-y-2">
//                 <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">Subject</label>
//                 <input type="text" className="w-full bg-transparent border-b border-gray-300 dark:border-zinc-700 py-2 focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-400 transition-colors text-gray-900 dark:text-white" required />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">Message</label>
//                 <textarea rows="4" className="w-full bg-transparent border-b border-gray-300 dark:border-zinc-700 py-2 focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-400 transition-colors text-gray-900 dark:text-white resize-none" required></textarea>
//               </div>

//               <button type="submit" className="group w-full bg-black dark:bg-white text-white dark:text-black py-6 px-10 flex items-center justify-between hover:bg-indigo-600 dark:hover:bg-indigo-500 dark:hover:text-white transition-all duration-500">
//                 <span className="text-xs font-black uppercase tracking-widest">Send Message</span>
//                 <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
//               </button>
//             </form>
//           </motion.div>
          
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Contact;