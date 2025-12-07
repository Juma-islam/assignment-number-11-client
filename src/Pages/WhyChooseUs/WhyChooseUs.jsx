import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee'; 

const WhyChooseUs = () => {
  const features = [
    { title: 'Real-Time Tracking', desc: 'Monitor every production stage live.' },
    { title: 'Secure Payments', desc: 'Multiple options including PayFast and COD.' },
    { title: 'Customizable Orders', desc: 'Tailored to your garment needs.' },
    { title: 'Eco-Friendly Materials', desc: 'Sustainable production practices.' },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center text-teal-800 mb-12"
        >
          Why Choose Us
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {features.map((feat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
              transition={{ duration: 0.5 }}
              className="p-6 bg-teal-50 rounded-xl text-center"
            >
              <h3 className="text-2xl font-semibold text-teal-700 mb-2">{feat.title}</h3>
              <p className="text-gray-600">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
        <Marquee className="mt-8 text-teal-500 font-medium" speed={50}>
          Efficient Production · Quality Assurance · Timely Delivery · Customer Satisfaction · 
        </Marquee>
      </div>
    </section>
  );
};

export default WhyChooseUs;