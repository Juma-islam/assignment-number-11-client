import React from 'react';
import HeroBanner from './HeroBanner';
import Container from '../../components/Shared/Container';
import Hero from '../AboutUs/AboutUs';
import HowItWorks from '../HowItWorks/HowItWorks';

const Home = () => {
    return (
        <Container>
             <HeroBanner></HeroBanner>
             <HowItWorks></HowItWorks>
             
        </Container>
    );
};

export default Home;