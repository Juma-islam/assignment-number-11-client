import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router";

const plans = [
  {
    name: "Starter",
    price: "Free",
    desc: "Perfect for small units just starting their digital journey.",
    features: ["Up to 50 orders/month", "Basic live tracking", "Email support", "Standard Analytics"],
    popular: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/mo",
    desc: "Everything growing factories need to scale efficiently.",
    features: [
      "Unlimited orders",
      "Advanced AI analytics",
      "Priority 24/7 support",
      "Full API access",
      "Bulk Import/Export",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "Tailored solution for large-scale global operations.",
    features: [
      "Dedicated Account Manager",
      "Custom integrations",
      "On-premise deployment option",
      "SLA Guarantee",
      "White-labeling",
    ],
    popular: false,
  },
];

const PricingPlans = () => {
  return (
    <section className="py-20 md:py-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-indigo-950/60 dark:to-purple-950/40 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Modern Header - Consistent with other sections */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-medium tracking-wider mb-5">
            FLEXIBLE PLANS
          </span>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-6">
            Simple, Transparent Pricing
          </h2>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Choose the plan that matches your production scale — start free, grow without limits.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              whileHover={{ y: -10, scale: 1.03 }}
              className={`
                relative 
                bg-white/70 dark:bg-gray-800/40 
                backdrop-blur-xl 
                rounded-2xl 
                p-8 
                shadow-xl dark:shadow-2xl dark:shadow-indigo-950/30
                border border-white/50 dark:border-gray-700/50
                hover:shadow-2xl hover:dark:shadow-indigo-700/40
                transition-all duration-400
                overflow-hidden
                group
                ${plan.popular ? "ring-2 ring-indigo-500/50 scale-[1.03] md:scale-105" : ""}
              `}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold uppercase tracking-wider px-6 py-1.5 rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              {/* Plan Name & Price */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                  {plan.name}
                </h3>

                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-700 dark:from-indigo-400 dark:to-purple-500 bg-clip-text text-transparent">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-xl text-gray-500 dark:text-gray-400 font-medium">{plan.period}</span>
                  )}
                </div>

                <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm">{plan.desc}</p>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center shrink-0">
                      <Check size={14} className="text-indigo-600 dark:text-indigo-400" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Get Started Button - More premium & animated */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className={`
                  relative overflow-hidden w-full py-5 px-8 rounded-xl font-bold uppercase text-sm tracking-wider
                  transition-all duration-500 shadow-lg
                  ${
                    plan.popular
                      ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white hover:from-indigo-700 hover:via-purple-700 hover:to-indigo-700"
                      : "bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-200 dark:to-gray-100 text-white dark:text-gray-900 hover:from-gray-900 hover:to-black dark:hover:from-gray-100 dark:hover:to-white"
                  }
                `}
              >
              <Link to='/register'>
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Get Started
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </span></Link>

                {/* Shine effect on hover */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-600 tracking-wide">
            All plans include 14-day free trial • No credit card required • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
