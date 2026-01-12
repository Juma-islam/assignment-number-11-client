import { motion } from "framer-motion";

const TermsAndConditions = () => {
  return (
    <section className="py-20 md:py-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-indigo-950/60 dark:to-purple-950/40 min-h-screen transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-medium tracking-wider mb-5">
            LEGAL
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-6">
            Terms & Conditions
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">Last updated: January 12, 2026</p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="prose prose-lg md:prose-xl dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300"
        >
          <p>
            Welcome to <strong>Garments Tracker</strong>. These Terms and Conditions govern your use of our website and
            services. By accessing or using our platform, you agree to be bound by these terms.
          </p>

          <h2>1. Use of Services</h2>
          <p>You agree to:</p>
          <ul>
            <li>Use the platform only for lawful purposes</li>
            <li>Provide accurate information during registration</li>
            <li>Not misuse, interfere with, or disrupt the services</li>
            <li>Respect intellectual property rights</li>
          </ul>

          <h2>2. Account Responsibility</h2>
          <p>You are responsible for:</p>
          <ul>
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>All activities that occur under your account</li>
            <li>Keeping your contact information up to date</li>
          </ul>

          <h2>3. Intellectual Property</h2>
          <p>
            All content, features, and functionality on the platform are owned by Garments Tracker or its licensors and
            are protected by copyright, trademark, and other laws.
          </p>

          <h2>4. Payment Terms</h2>
          <p>
            Subscription fees are non-refundable except as expressly stated in our refund policy. You authorize us to
            charge your selected payment method for recurring subscriptions.
          </p>

          <h2>5. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Garments Tracker shall not be liable for any indirect, incidental,
            special, consequential, or punitive damages arising from your use of the services.
          </p>

          <h2>6. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your account at any time for violation of these terms or for
            any other reason.
          </p>

          <h2>7. Changes to Terms</h2>
          <p>
            We may update these Terms from time to time. Continued use of the platform after changes constitutes
            acceptance of the new terms.
          </p>

          <h2>8. Governing Law</h2>
          <p>These Terms shall be governed by the laws of Bangladesh without regard to conflict of law principles.</p>

          <h2>9. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at:</p>
          <p className="font-medium">
            Email:{" "}
            <a href="mailto:legal@garmentstracker.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">
              legal@garmentstracker.com
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TermsAndConditions;
