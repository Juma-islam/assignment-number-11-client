
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "Is this platform suitable for small factories?",
    a: "Yes! Our Starter plan is completely free and perfect for small to medium factories looking to digitize their workflow.",
  },
  {
    q: "Can international buyers track orders?",
    a: "Absolutely! Buyers get real-time tracking with production stages, quality check status, and global delivery updates.",
  },
  {
    q: "Do you support multiple languages?",
    a: "Currently our interface is in English. Bangla, Hindi, and Spanish localized versions are coming in Q3 2026.",
  },
  {
    q: "How secure is the payment system?",
    a: "We use industry-standard SSL encryption and partner with globally recognized secure payment gateways for all transactions.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-20 md:py-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-indigo-950/60 dark:to-purple-950/40 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Modern Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-medium tracking-wider mb-5">
            GOT QUESTIONS?
          </span>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-6">
            Frequently Asked Questions
          </h2>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Quick answers to help you understand our garment production tracking platform better.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`
                relative 
                bg-white/70 dark:bg-gray-800/40 
                backdrop-blur-xl 
                rounded-2xl 
                shadow-xl dark:shadow-2xl dark:shadow-indigo-950/30
                border border-white/50 dark:border-gray-700/50
                overflow-hidden
                group
              `}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-8 text-left flex justify-between items-center group transition-all"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl font-black text-indigo-200 dark:text-indigo-700/30 group-hover:text-indigo-400 dark:group-hover:text-indigo-500 transition-colors">
                    0{i + 1}
                  </span>
                  <h3
                    className={`
                      text-xl md:text-2xl font-bold 
                      ${openIndex === i ? "text-indigo-700 dark:text-indigo-300" : "text-gray-900 dark:text-gray-100"} 
                      transition-colors
                    `}
                  >
                    {faq.q}
                  </h3>
                </div>

                <div
                  className={`
                    p-3 rounded-full transition-all duration-300 
                    ${openIndex === i 
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white rotate-180" 
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/40"}
                  `}
                >
                  {openIndex === i ? <Minus size={24} /> : <Plus size={24} />}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 pt-4">
                      <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent dark:from-indigo-400/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-600 tracking-wide">
            Still have questions? Reach out to our 24/7 support team.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;