// import React from "react";
// import HeroBanner from "./HeroBanner";
// import Container from "../../components/Shared/Container";
// import HowItWorks from "../HowItWorks/HowItWorks";
// import WhyChooseUs from "../WhyChooseUs/WhyChooseUs";
// import OurPartners from "../OurPartners/OurPartners";
// import CustomerFeedback from "../CustomerFeedback/CustomerFeedback";
// import OurProducts from "../OurProducts/OurProducts";
// import FeaturesGrid from "./FeaturesGrid";
// import PricingPlans from "./PricingPlans";
// import FAQSection from "./FAQSection";
// import Newsletter from "./Newsletter";
// import FinalCTA from "./FinalCTA";
// import StatisticsCounter from "./StatisticsCounter";


// const Home = () => {
//   return (
//     <Container>
//       <HeroBanner></HeroBanner>
//       <OurProducts></OurProducts>
//       <HowItWorks></HowItWorks>
//       <CustomerFeedback></CustomerFeedback>
//      <WhyChooseUs></WhyChooseUs>
//      <OurPartners></OurPartners>
//      <StatisticsCounter></StatisticsCounter>
//      <FeaturesGrid></FeaturesGrid>
//      <PricingPlans></PricingPlans>
//      <FAQSection></FAQSection>
//      <Newsletter></Newsletter>
//      <FinalCTA></FinalCTA>
//     </Container>
//   );
// };

// export default Home;
import React from "react";
import HeroBanner from "./HeroBanner";
// import Container from "../../components/Shared/Container";
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