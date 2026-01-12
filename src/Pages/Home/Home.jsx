import React from "react";
import HeroBanner from "./HeroBanner";
import HowItWorks from "../HowItWorks/HowItWorks";
import WhyChooseUs from "../WhyChooseUs/WhyChooseUs";
import OurPartners from "../OurPartners/OurPartners";
import CustomerFeedback from "../CustomerFeedback/CustomerFeedback";
import OurProducts from "../OurProducts/OurProducts";
import StatisticsCounter from "./StatisticsCounter";
import FeaturesGrid from "./FeaturesGrid";
import PricingPlans from "./PricingPlans";
import FAQSection from "./FAQSection";
import Newsletter from "./Newsletter";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <HeroBanner />
      <WhyChooseUs />
      <StatisticsCounter />
      <FeaturesGrid />
      <OurProducts />
      <HowItWorks />
      <CustomerFeedback />
      <PricingPlans />
      <OurPartners />
      <FAQSection />
      <Newsletter />
    </div>
  );
};

export default Home;
