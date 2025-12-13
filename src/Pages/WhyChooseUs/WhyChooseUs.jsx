// import { motion } from "framer-motion";
// import Marquee from "react-fast-marquee";
// import { CheckCircle, Truck, Shield, Zap, Leaf, Users } from "lucide-react";

// const WhyChooseUs = () => {
//   const features = [
//     {
//       icon: <Zap className="w-10 h-10 text-indigo-600" />,
//       title: "Real-Time Tracking",
//       desc: "Watch every stage from cutting to delivery instantly on your dashboard."
//     },
//     {
//       icon: <Truck className="w-10 h-10 text-green-600" />,
//       title: "Fast & Reliable Delivery",
//       desc: "On-time delivery with live tracking updates for you and your buyers."
//     },
//     {
//       icon: <Shield className="w-10 h-10 text-blue-600" />,
//       title: "Secure & Flexible Payment",
//       desc: "Cash on Delivery, PayFast – choose what works best for you."
//     },
//     {
//       icon: <Leaf className="w-10 h-10 text-emerald-600" />,
//       title: "Eco-Friendly Production",
//       desc: "We support sustainable materials and ethical manufacturing."
//     },
//     {
//       icon: <Users className="w-10 h-10 text-purple-600" />,
//       title: "24/7 Dedicated Support",
//       desc: "Our team is always here to help you grow your business."
//     },
//     {
//       icon: <CheckCircle className="w-10 h-10 text-teal-600" />,
//       title: "Quality You Can Trust",
//       desc: "Every garment goes through strict quality checks before shipping."
//     }
//   ];

//   return (
//     <section className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
//       <div className="max-w-7xl mx-auto px-6">
//         {/* Heading */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
//             Why Thousands of Factories{" "}
//             <span className="text-indigo-600">Choose Us</span>
//           </h2>
//           <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//             We help garment businesses work smarter, deliver faster, and grow bigger with a simple and powerful system.
//           </p>
//         </motion.div>

//         {/* Features Grid - 3 columns on medium+, 1-2 on mobile */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: index * 0.1 }}
//               whileHover={{ y: -8, transition: { duration: 0.3 } }}
//               className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100"
//             >
//               <div className="mb-6 inline-block p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl group-hover:scale-110 transition-transform">
//                 {feature.icon}
//               </div>
//               <h3 className="text-xl font-bold text-gray-800 mb-3">
//                 {feature.title}
//               </h3>
//               <p className="text-gray-600 leading-relaxed">
//                 {feature.desc}
//               </p>
//             </motion.div>
//           ))}
//         </div>

//         {/* Marquee with better style */}
//         <div className="mt-20">
//           <Marquee speed={60} gradient={false}>
//             <div className="flex items-center gap-16 text-lg font-semibold text-indigo-700">
//               <span className="flex items-center gap-3"><CheckCircle className="w-6 h-6" /> Real-Time Updates</span>
//               <span className="flex items-center gap-3"><CheckCircle className="w-6 h-6" /> Trusted by 500+ Factories</span>
//               <span className="flex items-center gap-3"><CheckCircle className="w-6 h-6" /> Easy to Use Dashboard</span>
//               <span className="flex items-center gap-3"><CheckCircle className="w-6 h-6" /> On-Time Delivery Guarantee</span>
//               <span className="flex items-center gap-3"><CheckCircle className="w-6 h-6" /> 24/7 Customer Support</span>
//               <span className="flex items-center gap-3"><CheckCircle className="w-6 h-6" /> Affordable Pricing</span>
//             </div>
//           </Marquee>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhyChooseUs;

import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import { Zap, Truck, Shield, Leaf, HeadphonesIcon, Award } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    { icon: <Zap />, title: "Real-Time Dashboard", desc: "Track every order stage live" },
    { icon: <Truck />, title: "On-Time Delivery", desc: "99% delivery success rate" },
    { icon: <Shield />, title: "Secure Payments", desc: "Multiple safe payment options" },
    { icon: <Leaf />, title: "Sustainable Options", desc: "Eco-friendly fabrics available" },
    { icon: <HeadphonesIcon />, title: "24/7 Support", desc: "Dedicated manager for every client" },
    { icon: <Award />, title: "Premium Quality", desc: "AQL 2.5 standard guaranteed" },
  ];

  return (
    <section className="py-28 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Global Buyers <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Trust Us</span>
          </h2>
          <p className="text-xl text-gray-600">Join 500+ factories growing faster with our platform</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-6">
                {f.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <Marquee gradient={false} speed={70} className="mt-20">
          <div className="flex gap-20 text-xl font-bold text-indigo-700">
            <span>Live Production Tracking</span> • <span>500+ Active Factories</span> • <span>50K+ Orders Delivered</span> •{" "}
            <span>24/7 Support</span> • <span>GRS Certified Options</span> • <span>100% Transparency</span>
          </div>
        </Marquee>
      </div>
    </section>
  );
};

export default WhyChooseUs;