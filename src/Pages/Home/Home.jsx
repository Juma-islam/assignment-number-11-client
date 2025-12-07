import React from "react";
import HeroBanner from "./HeroBanner";
import Container from "../../components/Shared/Container";
import HowItWorks from "../HowItWorks/HowItWorks";
import WhyChooseUs from "../WhyChooseUs/WhyChooseUs";
import OurPartners from "../OurPartners/OurPartners";
import CustomerFeedback from "../CustomerFeedback/CustomerFeedback";


const Home = () => {
  return (
    <Container>
      <HeroBanner></HeroBanner>
      <HowItWorks></HowItWorks>
      <CustomerFeedback></CustomerFeedback>
     <WhyChooseUs></WhyChooseUs>
     <OurPartners></OurPartners>
    </Container>
  );
};

export default Home;
