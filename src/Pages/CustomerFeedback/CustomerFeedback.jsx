import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Rahim Ahmed",
    role: "CEO, StyleX Fashion Ltd.",
    company: "Dhaka, Bangladesh",
    rating: 5,
    comment: "This platform has completely transformed our production tracking. Now we can monitor everything from order to delivery with just one click. Truly outstanding!",
    avatar: "https://i.pravatar.cc/150?img=1",
    verified: true
  },
  {
    id: 2,
    name: "Fatema Akter",
    role: "Production Manager",
    company: "Moonlight Garments",
    rating: 5,
    comment: "As a manager, my workload has reduced by 70%. Pending orders, tracking updates — everything is in one place. The UI is also incredibly beautiful and intuitive!",
    avatar: "https://i.pravatar.cc/150?img=2",
    verified: true
  },
  {
    id: 3,
    name: "Karim Hossain",
    role: "International Buyer",
    company: "Sweden",
    rating: 5,
    comment: "As an international buyer, I can track my orders in real-time with production stages and live location updates. Never seen such a professional system from Bangladesh before!",
    avatar: "https://i.pravatar.cc/150?img=3",
    verified: true
  },
  {
    id: 4,
    name: "Sumaiya Islam",
    role: "Owner, TrendyWear BD",
    company: "Chattogram, Bangladesh",
    rating: 5,
    comment: "No more paperwork in my factory. Everything is now digital. Customers are also very happy seeing real-time tracking. Thank you so much to the team!",
    avatar: "https://i.pravatar.cc/150?img=4",
    verified: true
  }
];

const CustomerFeedback = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-indigo-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trusted by over 500+ garment factories and international buyers worldwide
          </p>
        </motion.div>

        {/* Main Carousel */}
        <div className="relative">
          <div className="flex items-center justify-center">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="relative max-w-5xl w-full"
            >
              {/* Background Quote Icon */}
              <div className="absolute -top-10 -left-10 text-9xl text-indigo-100 opacity-30">
                <Quote className="w-48 h-48" />
              </div>

              {/* Testimonial Card */}
              <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-14 border border-gray-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5" />
                
                <div className="relative z-10">
                  {/* Rating & Verified Badge */}
                  <div className="flex items-center mb-6">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                      </motion.div>
                    ))}
                    <span className="ml-4 text-sm font-medium text-green-600 bg-green-50 px-4 py-1.5 rounded-full flex items-center gap-1">
                      Verified Client
                    </span>
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-2xl md:text-3xl font-medium text-gray-800 leading-relaxed mb-10 italic">
                    "{testimonials[currentIndex].comment}"
                  </p>

                  {/* User Info */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <img
                        src={testimonials[currentIndex].avatar}
                        alt={testimonials[currentIndex].name}
                        className="w-20 h-20 rounded-full ring-4 ring-indigo-100 object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-indigo-600 font-medium">
                        {testimonials[currentIndex].role}
                      </p>
                      <p className="text-sm text-gray-500">
                        {testimonials[currentIndex].company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 md:left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-2xl rounded-full p-4 backdrop-blur-sm transition-all hover:scale-110 z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-8 h-8 text-indigo-600" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 md:right-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-2xl rounded-full p-4 backdrop-blur-sm transition-all hover:scale-110 z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-8 h-8 text-indigo-600" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 ${
                  index === currentIndex
                    ? "w-12 h-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
                    : "w-3 h-3 bg-gray-300 rounded-full hover:bg-gray-500"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 text-center"
        >
          {[
            { number: "500+", label: "Happy Factories" },
            { number: "50K+", label: "Orders Processed" },
            { number: "98%", label: "Satisfaction Rate" },
            { number: "24/7", label: "Support Active" }
          ].map((stat, i) => (
            <div key={i} className="bg-white/70 backdrop-blur-sm rounded-2xl py-8 px-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {stat.number}
              </h3>
              <p className="text-gray-600 mt-2 font-medium">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerFeedback;