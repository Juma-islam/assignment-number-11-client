import { motion } from "framer-motion";

const PrivacyPolicy = () => {
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
            Privacy Policy
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
            At <strong>Garments Tracker</strong>, we are committed to protecting your privacy and ensuring the security
            of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your
            information when you visit our website or use our services.
          </p>

          <h2>1. Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul>
            <li>
              <strong>Personal Information</strong>: Name, email address, phone number, and profile photo when you
              register or contact us.
            </li>
            <li>
              <strong>Business Information</strong>: Factory name, address, production data, order details, and payment
              information (processed securely via third-party gateways).
            </li>
            <li>
              <strong>Technical Information</strong>: IP address, browser type, device information, and usage data
              collected via cookies and analytics tools.
            </li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Provide, maintain, and improve our garment tracking platform</li>
            <li>Process your orders and manage production tracking</li>
            <li>Communicate with you regarding your account and services</li>
            <li>Ensure security and prevent fraud</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>3. Data Sharing</h2>
          <p>We do not sell your personal information. We may share data with:</p>
          <ul>
            <li>Service providers (payment processors, cloud hosting, analytics)</li>
            <li>Legal authorities when required by law</li>
            <li>Business partners only with your explicit consent</li>
          </ul>

          <h2>4. Data Security</h2>
          <p>
            We implement industry-standard security measures including encryption, access controls, and regular security
            audits to protect your information.
          </p>

          <h2>5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data (subject to legal obligations)</li>
            <li>Withdraw consent where applicable</li>
          </ul>

          <h2>6. Cookies & Tracking</h2>
          <p>
            We use cookies to enhance your experience. You can manage cookie preferences through your browser settings.
          </p>

          <h2>7. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with the updated
            effective date.
          </p>

          <h2>8. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <p className="font-medium">
            Email:{" "}
            <a
              href="mailto:privacy@garmentstracker.com"
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              privacy@garmentstracker.com
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
